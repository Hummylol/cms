"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Plus, Minus, Trash2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Updated Type
type StudentMarks = {
    regNo: string;
    marks: Record<string, string>; // Subject Name -> Grade
};

const GRADES = ["O", "A+", "A", "B+", "B", "C+", "C", "U"];
// Initial configuration
const INITIAL_SUBJECTS = ["JMA1001", "JCS1201", "JIT1024", "JIT1023"];

// Class Options
const DEPARTMENTS = ["CSE A", "CSE B", "IT", "EEE", "ECE", "CS", "CSBS", "AIDS", "AIML", "BME"];
const YEARS = ["Year 1", "Year 2", "Year 3", "Year 4"];

function generateInitialStudents(subjects: string[]): StudentMarks[] {
    const students: StudentMarks[] = [];
    for (let i = 1; i <= 52; i++) {
        const paddedNum = String(i).padStart(2, '0');
        const marks: Record<string, string> = {};
        subjects.forEach(sub => marks[sub] = ""); // Start with empty grades
        students.push({
            regNo: `1307222050${paddedNum}`,
            marks
        });
    }
    return students;
}

export default function ResultsPage() {
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    // Class selection state
    const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[2]); // Default: IT
    const [selectedYear, setSelectedYear] = useState(YEARS[3]); // Default: Year 4

    // Core data state
    const [subjects, setSubjects] = useState<string[]>([]);
    const [students, setStudents] = useState<StudentMarks[]>([]);

    // UI state
    const [isAddingSubject, setIsAddingSubject] = useState(false);
    const [newSubjectName, setNewSubjectName] = useState("");

    // New Row State
    const [isAddingRow, setIsAddingRow] = useState(false);
    const [newRollNo, setNewRollNo] = useState("");

    // Dialog State
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogAction, setDialogAction] = useState<() => void>(() => { });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const bstr = evt.target?.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                if (data.length === 0) {
                    toast.error("Uploaded Excel file is empty.");
                    return;
                }

                // Identify the register number column
                const firstRow = data[0] as Record<string, any>;
                const columns = Object.keys(firstRow);
                const regNoCol = columns.find(col =>
                    ["register number", "reg no", "reg number", "roll no", "roll number"].includes(col.toLowerCase().trim())
                );

                if (!regNoCol) {
                    toast.error("Could not find a 'Register Number' or 'Reg No' column in the Excel file.");
                    return;
                }

                // Identify subject columns (all other columns)
                const uploadedSubjects = columns.filter(col => col !== regNoCol);

                // Build new students array
                const newStudents: StudentMarks[] = [];

                data.forEach((row: any) => {
                    const regNo = String(row[regNoCol]).trim();
                    if (!regNo) return; // Skip empty rows

                    const marks: Record<string, string> = {};
                    uploadedSubjects.forEach(sub => {
                        // Ensure grades are strings
                        marks[sub] = row[sub] != null ? String(row[sub]).trim() : "";
                    });

                    newStudents.push({ regNo, marks });
                });

                setSubjects(uploadedSubjects);
                setStudents(newStudents);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }

                toast.success(`Successfully loaded ${newStudents.length} records. Don't forget to 'Save Changes'.`);
            } catch (error) {
                console.error("Error parsing Excel file:", error);
                toast.error("An error occurred while parsing the Excel file.");
            }
        };
        reader.readAsBinaryString(file);
    };

    // Re-load data whenever class selection changes
    useEffect(() => {
        const userRole = localStorage.getItem("mockUserRole");
        const userEmail = localStorage.getItem("mockUserEmail");

        if (!userRole) {
            router.push("/login");
            return;
        }

        setRole(userRole);
        setEmail(userEmail);

        // For Students, we force their "class" view to just be whatever their roll number is associated with,
        // but since we aren't linking roll numbers to classes in a real DB, we'll let staff pick the class
        // and if it's a student, they just see their roll number across the static instance.

        loadClassData(selectedDept, selectedYear, userRole, userEmail || "");
    }, [selectedDept, selectedYear, router]);

    const loadClassData = (dept: string, year: string, userRole: string, userEmail: string) => {
        // If user is a student, we need to scan all localStorage keys to find their exact department and year
        if (userRole === "student" && userEmail) {
            let foundDept = dept;
            let foundYear = year;
            let foundData: StudentMarks[] | null = null;
            let foundSubjects: string[] | null = null;

            // Search all classes
            for (const d of DEPARTMENTS) {
                for (const y of YEARS) {
                    const marksKey = `mockDynamicMarks-${d}-${y}`;
                    const subjectsKey = `mockSubjects-${d}-${y}`;
                    const storedMarks = localStorage.getItem(marksKey);

                    if (storedMarks) {
                        const parsedMarks: StudentMarks[] = JSON.parse(storedMarks);
                        if (parsedMarks.some(s => s.regNo === userEmail)) {
                            foundDept = d;
                            foundYear = y;
                            foundData = parsedMarks;
                            foundSubjects = JSON.parse(localStorage.getItem(subjectsKey) || "[]");
                            break;
                        }
                    }
                }
                if (foundData) break;
            }

            if (foundData && foundSubjects) {
                // We found the student's actual class in memory
                setSelectedDept(foundDept);
                setSelectedYear(foundYear);
                setStudents(foundData);
                setSubjects(foundSubjects);
                return;
            }
        }

        // Standard load behavior (Staff or New Student)
        const marksKey = `mockDynamicMarks-${dept}-${year}`;
        const subjectsKey = `mockSubjects-${dept}-${year}`;

        const storedMarks = localStorage.getItem(marksKey);
        const storedSubjects = localStorage.getItem(subjectsKey);

        if (storedMarks && storedSubjects) {
            setStudents(JSON.parse(storedMarks));
            setSubjects(JSON.parse(storedSubjects));
        } else {
            // First time load for this specific class
            setSubjects(INITIAL_SUBJECTS);
            setStudents(generateInitialStudents(INITIAL_SUBJECTS));
        }
    };

    const saveResults = () => {
        const marksKey = `mockDynamicMarks-${selectedDept}-${selectedYear}`;
        const subjectsKey = `mockSubjects-${selectedDept}-${selectedYear}`;

        localStorage.setItem(marksKey, JSON.stringify(students));
        localStorage.setItem(subjectsKey, JSON.stringify(subjects));
        toast.success(`Results for ${selectedDept} - ${selectedYear} saved successfully!`);
    };

    const handleLogout = () => {
        localStorage.removeItem("mockUserRole");
        localStorage.removeItem("mockUserEmail");
        router.push("/login");
    };

    const handleGradeChange = (regNo: string, subject: string, newGrade: string) => {
        setStudents(prev =>
            prev.map(s => {
                if (s.regNo !== regNo) return s;
                return {
                    ...s,
                    marks: {
                        ...s.marks,
                        [subject]: newGrade
                    }
                };
            })
        );
    };

    const handleAddSubject = () => {
        if (!newSubjectName.trim() || subjects.includes(newSubjectName.trim())) {
            setIsAddingSubject(false);
            setNewSubjectName("");
            return;
        }

        const sub = newSubjectName.trim();
        const newSubjects = [...subjects, sub];

        // Add column to subjects array and empty grade for all students
        setSubjects(newSubjects);
        setStudents(prev => prev.map(s => ({
            ...s,
            marks: {
                ...s.marks,
                [sub]: ""
            }
        })));

        setIsAddingSubject(false);
        setNewSubjectName("");
    };

    const handleAddRow = () => {
        if (!newRollNo.trim()) {
            setIsAddingRow(false);
            setNewRollNo("");
            return;
        }

        const rollId = newRollNo.trim();
        // Check if exists
        if (students.find(s => s.regNo === rollId)) {
            toast.error("This Roll No already exists in this class.");
            return;
        }

        const marks: Record<string, string> = {};
        subjects.forEach(sub => marks[sub] = "");

        setStudents(prev => [...prev, { regNo: rollId, marks }]);

        setIsAddingRow(false);
        setNewRollNo("");
    };

    const handleDeleteRow = (regNo: string) => {
        setDialogTitle("Delete Student Record");
        setDialogMessage(`Are you sure you want to delete ${regNo}? This action cannot be undone unless you upload their data again.`);
        setDialogAction(() => () => {
            setStudents(prev => prev.filter(s => s.regNo !== regNo));
            toast.success(`Deleted student ${regNo}`);
        });
        setDialogOpen(true);
    };

    const handleDeleteSubject = (subjectToDelete: string) => {
        setDialogTitle("Delete Subject");
        setDialogMessage(`Are you sure you want to delete the subject ${subjectToDelete}? This will remove grades for this subject across all students.`);
        setDialogAction(() => () => {
            setSubjects(prev => prev.filter(sub => sub !== subjectToDelete));
            setStudents(prev => prev.map(s => {
                const newMarks = { ...s.marks };
                delete newMarks[subjectToDelete];
                return { ...s, marks: newMarks };
            }));
            toast.success(`Deleted subject ${subjectToDelete}`);
        });
        setDialogOpen(true);
    };

    if (!role) return <div className="p-8 text-center">Loading...</div>;

    // Filter logic:
    // If Staff: show all students for the selected class.
    // If Student: Only show the record matching their logged-in email (which is their Roll No).
    const displayStudents = role === "staff"
        ? students
        : students.filter(s => s.regNo === email);

    return (
        <div className="container mx-auto p-4 md:p-8">
            <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {dialogMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={dialogAction} className="bg-red-600 hover:bg-red-700 text-white">
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <h1 className="text-3xl font-bold">Results Portal</h1>
                    <p className="text-muted-foreground mt-1">Logged in as {email} ({role})</p>
                </div>
            </div>

            {role === "staff" && (
                <Card className="mb-6">
                    <CardHeader className="py-4">
                        <CardTitle className="text-lg">Class Selection</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                        <Select value={selectedDept} onValueChange={setSelectedDept}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent>
                                {DEPARTMENTS.map(dept => (
                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedYear} onValueChange={setSelectedYear}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {YEARS.map(year => (
                                    <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <div className="flex-1" />
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                accept=".xlsx, .xls, .csv"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                            />
                            <Button
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Upload Excel
                            </Button>
                            <Button onClick={saveResults} className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes for {selectedDept}-{selectedYear}</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Student Marks (Grades)</CardTitle>
                </CardHeader>
                <CardContent>
                    {(role === "student" && displayStudents.length === 0) ? (
                        <div className="text-center py-8 text-muted-foreground">
                            No records found for your Roll No in this default class database.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {role === "staff" && <TableHead className="w-[50px] sticky left-0 z-20 bg-white shadow-[1px_0_0_0_#e2e8f0] p-0 px-4"></TableHead>}
                                        <TableHead className={`w-[180px] sticky ${role === "staff" ? 'left-[50px]' : 'left-0'} z-20 bg-white shadow-[1px_0_0_0_#e2e8f0] p-0 px-4`}>Reg No.</TableHead>
                                        {subjects.map(sub => (
                                            <TableHead key={sub} className="min-w-[100px]">
                                                <div className="flex items-center gap-1">
                                                    <span>{sub}</span>
                                                    {role === "staff" && (
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-5 w-5 text-red-500 hover:text-red-700 hover:bg-red-100"
                                                            onClick={() => handleDeleteSubject(sub)}
                                                            title={`Delete ${sub}`}
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableHead>
                                        ))}
                                        {role === "staff" && (
                                            <TableHead className="w-[150px]">
                                                {isAddingSubject ? (
                                                    <input
                                                        autoFocus
                                                        value={newSubjectName}
                                                        onChange={(e) => setNewSubjectName(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                                                        onBlur={handleAddSubject}
                                                        className="w-24 text-sm border rounded px-2 py-1"
                                                        placeholder="Subj code"
                                                    />
                                                ) : (
                                                    <Button size="sm" variant="ghost" onClick={() => setIsAddingSubject(true)}>
                                                        <Plus className="h-4 w-4 mr-2" /> Add Subject
                                                    </Button>
                                                )}
                                            </TableHead>
                                        )}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {displayStudents.map((student) => {
                                        // Check if this student failed any subject (has 'U')
                                        const hasFailed = Object.values(student.marks).includes("U");

                                        return (
                                            <TableRow
                                                key={student.regNo}
                                                className={hasFailed ? "bg-[#fcbcbc] hover:bg-[#ff9e9e]" : "bg-white hover:bg-slate-50/80"}
                                            >
                                                {role === "staff" && (
                                                    <TableCell className="sticky left-0 z-10 bg-inherit shadow-[1px_0_0_0_#e2e8f0] p-0 px-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-6 w-6 text-red-500 hover:text-red-700 hover:bg-red-100"
                                                            onClick={() => handleDeleteRow(student.regNo)}
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                )}

                                                <TableCell className={`font-medium sticky ${role === "staff" ? 'left-[50px]' : 'left-0'} z-10 bg-inherit shadow-[1px_0_0_0_#e2e8f0] p-0 px-4 whitespace-nowrap`}>{student.regNo}</TableCell>

                                                {subjects.map(sub => (
                                                    <TableCell key={`${student.regNo}-${sub}`}>
                                                        {role === "staff" ? (
                                                            <select
                                                                value={student.marks[sub] || "none"}
                                                                onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (val !== "none") handleGradeChange(student.regNo, sub, val);
                                                                }}
                                                                className="w-[80px] h-8 text-xs font-medium bg-transparent text-slate-800 hover:bg-slate-100 focus:bg-slate-100 rounded px-2 py-1 outline-none cursor-pointer transition-colors focus:ring-0 border-none"
                                                            >
                                                                <option value="none" disabled>-</option>
                                                                {GRADES.map(g => (
                                                                    <option key={g} value={g}>{g}</option>
                                                                ))}
                                                            </select>
                                                        ) : (
                                                            <span className="font-medium px-2">{student.marks[sub] || "-"}</span>
                                                        )}
                                                    </TableCell>
                                                ))}
                                                {role === "staff" && <TableCell></TableCell>}
                                            </TableRow>
                                        );
                                    })}

                                    {/* Add Custom Row Button for Staff */}
                                    {role === "staff" && (
                                        <TableRow>
                                            <TableCell colSpan={subjects.length + 3} className="text-center pt-4">
                                                {isAddingRow ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <input
                                                            autoFocus
                                                            value={newRollNo}
                                                            onChange={(e) => setNewRollNo(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && handleAddRow()}
                                                            className="w-48 text-sm border rounded px-3 py-1.5"
                                                            placeholder="Enter new Roll No."
                                                        />
                                                        <Button size="sm" onClick={handleAddRow}>Add</Button>
                                                        <Button size="sm" variant="ghost" onClick={() => setIsAddingRow(false)}>Cancel</Button>
                                                    </div>
                                                ) : (
                                                    <Button variant="outline" size="sm" className="w-full max-w-xs mx-auto border-dashed" onClick={() => setIsAddingRow(true)}>
                                                        <Plus className="h-4 w-4 mr-2" /> Add Student Row
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {role !== "staff" && (
                <Card className="mt-6 border-indigo-200 bg-indigo-50/50">
                    <CardHeader>
                        <CardTitle className="text-indigo-800">Note for Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-indigo-700">
                            This is a read-only view of your results. Subjects marked with 'U' indicate a requirement for reassessment.
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
