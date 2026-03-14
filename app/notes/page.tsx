"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Download, LibraryBig, BookOpen } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";

const DEPARTMENTS = ["CSE A", "CSE B", "IT", "EEE", "ECE", "CS", "CSBS", "AIDS", "AIML", "BME"];

const SUBJECT_LIBRARY: Record<string, string[]> = {
    "IT": ["DBMS", "CN", "OS", "JAVA", "C", "PYTHON", "PANDAS"],
    "CSE A": ["Data Structures", "Algorithms", "Operating Systems", "AI"],
    "CSE B": ["Data Structures", "Algorithms", "Operating Systems", "AI"],
};

const DEFAULT_SUBJECTS = ["Engineering Mathematics", "Engineering Physics", "Basics of Engineering"];

const UNITS = ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];

export default function NotesPage() {
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [selectedDept, setSelectedDept] = useState("IT");
    const [searchQuery, setSearchQuery] = useState("");

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
    }, [router]);

    if (!role) return <div className="p-8 text-center text-blue-900 font-bold italic">Initializing Repository...</div>;

    const subjects = SUBJECT_LIBRARY[selectedDept] || DEFAULT_SUBJECTS;

    const filteredSubjects = subjects.filter(sub =>
        sub.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-16">
                <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <LibraryBig className="h-64 w-64" />
                    </div>

                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-4xl mx-auto md:mx-0">
                            <BackButton />

                            <div className="mt-8 flex items-center gap-2 mb-4">
                                <Badge variant="outline" className="border-blue-400 text-blue-100 bg-blue-800/40 uppercase tracking-[0.2em] text-[10px] px-3 py-1">
                                    Digital Library
                                </Badge>
                                <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">Notes Repository</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                                Course <br className="hidden md:block" />
                                <span className="text-blue-400">Resources</span>
                            </h1>

                            <p className="text-blue-100/70 text-lg max-w-2xl leading-relaxed font-medium">
                                Access comprehensive study materials, previous year notes, and unit-wise PDFs curated for your academic success.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar: Navigation & Search */}
                        <div className="lg:col-span-4 space-y-6">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Library Search</h3>

                            <Card className="border-gray-100 bg-gray-50/50 p-8 rounded-[2rem] shadow-sm">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Department</label>
                                        <Select value={selectedDept} onValueChange={setSelectedDept}>
                                            <SelectTrigger className="bg-white border-transparent focus:border-blue-500 rounded-xl h-12 px-4 shadow-sm">
                                                <SelectValue placeholder="Department" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-gray-100">
                                                {DEPARTMENTS.map(dept => (
                                                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Search Subjects</label>
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                            <Input
                                                placeholder="e.g. DBMS, JAVA"
                                                className="pl-11 bg-white border-transparent focus:border-blue-500 rounded-xl h-12 shadow-sm"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <BookOpen className="h-32 w-32" />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black tracking-tight leading-none mb-4 uppercase">Reference Hub</h4>
                                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                        Up to date for 2025
                                    </div>
                                    <p className="mt-4 text-slate-400 text-xs font-medium leading-relaxed italic">
                                        Download unit-wise notes directly to your device for offline studying.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Main Grid: Subject Cards */}
                        <div className="lg:col-span-8 space-y-6">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Available Subjects</h3>

                            <div className="grid gap-6">
                                {filteredSubjects.length === 0 ? (
                                    <div className="text-center py-24 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                                        <LibraryBig className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                                            No subjects found matching your query
                                        </p>
                                    </div>
                                ) : (
                                    filteredSubjects.map((subject) => (
                                        <Card key={subject} className="group bg-white border border-gray-100 p-0 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 overflow-hidden">
                                            <div className="bg-blue-50/50 px-8 py-5 border-b border-blue-100 flex items-center justify-between">
                                                <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight flex items-center gap-3">
                                                    <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                                                        <FileText className="h-5 w-5 text-white" />
                                                    </div>
                                                    {subject}
                                                </h3>
                                                <Badge variant="outline" className="border-blue-200 text-blue-600 font-bold uppercase tracking-widest text-[9px]">
                                                    {selectedDept} Content
                                                </Badge>
                                            </div>
                                            <CardContent className="p-8">
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                                    {UNITS.map((unit) => (
                                                        <div
                                                            key={unit}
                                                            className="group relative flex flex-col items-center p-4 border border-gray-50 rounded-[1.5rem] hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer bg-white"
                                                            onClick={() => toast.success(`Starting download: ${selectedDept}_${subject}_${unit}.pdf`)}
                                                        >
                                                            <div className="w-10 h-10 mb-3 rounded-full bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                                                                <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                                            </div>
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-700">{unit}</span>

                                                            <div className="absolute inset-0 bg-blue-600/5 rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <div className="bg-white p-1.5 rounded-full shadow-lg drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-all opacity-0 group-hover:opacity-100">
                                                                    <Download className="h-3 w-3 text-blue-600" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
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
