"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, Download, FileText, CheckCircle2, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";

// Class Options
const DEPARTMENTS = ["CSE A", "CSE B", "IT", "EEE", "ECE", "CS", "CSBS", "AIDS", "AIML", "BME"];
const SUBJECTS: Record<string, string[]> = {
    "IT": ["Web Development", "Database Systems", "Computer Networks", "Cyber Security"],
    "CSE A": ["Data Structures", "Algorithms", "Operating Systems", "AI"],
    "CSE B": ["Data Structures", "Algorithms", "Operating Systems", "AI"],
};

// Fallback for missing depts
const DEFAULT_SUBJECTS = ["Theory Course", "Lab Course", "Project"];

type Submission = {
    id: string;
    studentEmail: string;
    department: string;
    subject: string;
    fileName: string;
    timestamp: string;
    status: "submitted" | "graded";
};

export default function AssignmentsPage() {
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[2]); // Default IT

    // Derived subjects based on dept
    const availableSubjects = SUBJECTS[selectedDept] || DEFAULT_SUBJECTS;
    const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0]);

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const userRole = localStorage.getItem("mockUserRole");
        const userEmail = localStorage.getItem("mockUserEmail");

        if (!userRole) {
            router.push("/login");
            return;
        }

        setRole(userRole);
        setEmail(userEmail);

        // Load existing
        const stored = localStorage.getItem("mockAssignments");
        if (stored) {
            setSubmissions(JSON.parse(stored));
        }

        // Auto select first subject when department changes
        setSelectedSubject(SUBJECTS[selectedDept]?.[0] || DEFAULT_SUBJECTS[0]);
    }, [selectedDept, router]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !email) return;

        toast.promise(
            new Promise(resolve => setTimeout(resolve, 1500)),
            {
                loading: 'Uploading assignment...',
                success: () => {
                    const newSubmission: Submission = {
                        id: Date.now().toString(),
                        studentEmail: email,
                        department: selectedDept,
                        subject: selectedSubject,
                        fileName: file.name,
                        timestamp: new Date().toLocaleString(),
                        status: "submitted"
                    };

                    const updated = [newSubmission, ...submissions];
                    setSubmissions(updated);
                    localStorage.setItem("mockAssignments", JSON.stringify(updated));

                    if (fileInputRef.current) fileInputRef.current.value = '';
                    return `Successfully submitted ${file.name}`;
                },
                error: 'Failed to upload assignment.',
            }
        );
    };

    if (!role) return <div className="p-8 text-center text-blue-900 font-bold italic">Initializing Portal...</div>;

    // Filter logic
    const displayedSubmissions = role === "staff"
        ? submissions.filter(s => s.department === selectedDept && s.subject === selectedSubject)
        : submissions.filter(s => s.studentEmail === email && s.department === selectedDept && s.subject === selectedSubject);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-16">
                <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <ClipboardList className="h-64 w-64" />
                    </div>

                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-4xl mx-auto md:mx-0">
                            <BackButton />

                            <div className="mt-8 flex items-center gap-2 mb-4">
                                <Badge variant="outline" className="border-blue-400 text-blue-100 bg-blue-800/40 uppercase tracking-[0.2em] text-[10px] px-3 py-1">
                                    Academic Portal
                                </Badge>
                                <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">Assignments</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                                Submission <br className="hidden md:block" />
                                <span className="text-blue-400">System</span>
                            </h1>

                            <p className="text-blue-100/70 text-lg max-w-2xl leading-relaxed font-medium">
                                Efficiently manage and submit your coursework. Filter by department and subject to track your progress.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar: Filters */}
                        <div className="lg:col-span-4 space-y-6">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Class Configuration</h3>
                            <Card className="border-gray-100 bg-gray-50/50 p-8 rounded-[2rem] shadow-sm">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Select Department</label>
                                        <Select value={selectedDept} onValueChange={setSelectedDept}>
                                            <SelectTrigger className="bg-white border-transparent focus:border-blue-500 rounded-xl h-12 px-4 shadow-sm">
                                                <SelectValue placeholder="Select Dept" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                {DEPARTMENTS.map(dept => (
                                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Select Subject</label>
                                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                            <SelectTrigger className="bg-white border-transparent focus:border-blue-500 rounded-xl h-12 px-4 shadow-sm">
                                                <SelectValue placeholder="Select Subject" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                {availableSubjects.map(sub => (
                                                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </Card>

                            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <CheckCircle2 className="h-32 w-32" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black tracking-tight leading-none mb-4 uppercase">Submission Status</h4>
                                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                        System Active
                                    </div>
                                    <p className="mt-4 text-slate-400 text-xs font-medium leading-relaxed italic">
                                        All uploads are timestamped and logged securely.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Feed: Submissions */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex justify-between items-end px-1 mb-2">
                                <div>
                                    <h2 className="text-3xl font-black text-blue-900 uppercase tracking-tight">{selectedSubject}</h2>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">Record for {selectedDept}</p>
                                </div>
                                {role === "student" && (
                                    <div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            accept=".pdf,.doc,.docx,.zip"
                                        />
                                        <Button onClick={() => fileInputRef.current?.click()} className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 px-6 shadow-lg shadow-blue-100">
                                            <Upload className="w-4 h-4 mr-2 text-white" /> Upload New
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <Card className="border-gray-100 p-0 rounded-[2.5rem] shadow-sm overflow-hidden bg-white">
                                <div className="p-8">
                                    {displayedSubmissions.length === 0 ? (
                                        <div className="text-center py-24 bg-gray-50/50 rounded-[2rem] border border-dashed border-gray-200">
                                            <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                                                {role === "staff"
                                                    ? "No submissions for this filter"
                                                    : "You haven't submitted anything yet"}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="overflow-x-auto overflow-y-auto max-h-[100%] scrollbar-hide">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="border-gray-100 hover:bg-transparent">
                                                        {role === "staff" && <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6">Student</TableHead>}
                                                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6">File</TableHead>
                                                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-6">Timestamp</TableHead>
                                                        <TableHead className="text-[10px] font-black uppercase tracking-widest text-gray-400 text-right px-6">Action</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {displayedSubmissions.map((sub) => (
                                                        <TableRow key={sub.id} className="border-gray-50 hover:bg-blue-50/30 transition-colors">
                                                            {role === "staff" && <TableCell className="font-bold text-slate-900 px-6 py-5 truncate max-w-[150px]">{sub.studentEmail}</TableCell>}
                                                            <TableCell className="px-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                                                                        <FileText className="h-5 w-5 text-blue-600" />
                                                                    </div>
                                                                    <span className="font-bold text-blue-900 truncate max-w-[200px]">{sub.fileName}</span>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="px-6 text-slate-500 font-medium text-xs">{sub.timestamp}</TableCell>
                                                            <TableCell className="text-right px-6">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-10 w-10 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                                                                    onClick={() => toast.info(`Downloading ${sub.fileName}...`)}
                                                                >
                                                                    <Download className="h-5 w-5" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="container py-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Jerusalem College Management System © 2025</p>
                <div className="flex items-center gap-1 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-100 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                    Systems Operational
                </div>
            </footer>
        </div>
    );
}
