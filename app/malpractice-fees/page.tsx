import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, AlertTriangle, Landmark, Info, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MalpracticeFeesPage() {
    const driveLink = "https://drive.google.com/file/d/1kS2FS4EEW7PjBp0g2OOKq2yFA5Hd1MQH/view";

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 pb-16">
                {/* Full-width Header Section */}
                <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <AlertTriangle className="h-64 w-64" />
                    </div>

                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-4xl mx-auto md:mx-0">
                            <BackButton />

                            <div className="mt-8 flex items-center gap-2 mb-4">
                                <Badge variant="outline" className="border-blue-400 text-blue-100 bg-blue-800/40 uppercase tracking-[0.2em] text-[10px] px-3 py-1">
                                    Official Procedure
                                </Badge>
                                <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">Exam Section</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                                Malpractice <br className="hidden md:block" />
                                <span className="text-blue-400">Documentation</span>
                            </h1>

                            <p className="text-blue-100/70 text-lg max-w-2xl leading-relaxed font-medium">
                                If you have been identified for malpractice, follow the procedure below to download and submit the required documentation to clear your records.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="container mt-12">
                    <div className="max-w-4xl mx-auto md:mx-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                        {/* Left Side: Steps */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Required Steps</h3>

                            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                                        <FileText className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-blue-900 mb-2">1. Access & Fill</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                            Open the official malpractice form via the provided link. Ensure every field is filled in capital letters as per college records.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
                                <div className="flex items-start gap-6">
                                    <div className="h-14 w-14 bg-indigo-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-200">
                                        <Landmark className="h-7 w-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-indigo-900 mb-2">2. Manual Submission</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed font-medium">
                                            Visit the <span className="font-bold text-gray-900 underline decoration-indigo-300">Finance Office (Admin Block)</span> with the printed document for verification and processing.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Action Card */}
                        <div className="space-y-6 sticky top-8">
                            <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Clearance Action</h3>

                            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <ArrowRight className="h-32 w-32" />
                                </div>

                                <div className="relative z-10 space-y-8">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Available Online</span>
                                        </div>
                                        <h4 className="text-2xl font-black tracking-tight leading-none mb-4 uppercase">Download the <br /> Official Form</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                            Clear your malpractice penalties within the stipulated time to avoid examination restrictions.
                                        </p>
                                    </div>

                                    <Link href={driveLink} target="_blank" className="block">
                                        <Button className="w-full h-16 bg-white hover:bg-blue-50 text-blue-900 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl flex items-center justify-center gap-2">
                                            Open Document <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="h-px flex-1 bg-slate-800"></div>
                                        <div className="flex items-center gap-1.5 opacity-40">
                                            <Info className="h-3 w-3" />
                                            <span className="text-[9px] font-bold uppercase tracking-widest">Official G-Drive</span>
                                        </div>
                                        <div className="h-px flex-1 bg-slate-800"></div>
                                    </div>
                                </div>
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
