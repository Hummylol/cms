"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Users } from "lucide-react";
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
import BackButton from "@/components/BackButton";
import { Badge } from "@/components/ui/badge";

type Announcement = {
    id: string;
    club: string;
    title: string;
    content: string;
    date: string;
};

const CLUBS = ["Halcyon", "Rotaract", "NSS", "YRC", "NCC", "EPoch", "AIT"];

export default function ClubsPage() {
    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [activeClub, setActiveClub] = useState(CLUBS[0]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    // Form state
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newContent, setNewContent] = useState("");

    // Dialog state
    const [dialogOpen, setDialogOpen] = useState(false);
    const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);

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

        // Load initial announcements
        const storedAnnouncements = localStorage.getItem("mockClubAnnouncements");
        if (storedAnnouncements) {
            setAnnouncements(JSON.parse(storedAnnouncements));
        } else {
            // Setup initial placeholders
            const initial: Announcement[] = [
                { id: "1", club: "Halcyon", title: "Auditions for Dance Team", content: "Join us this Friday at the main auditorium for the annual dance team auditions. All styles welcome!", date: new Date().toLocaleDateString() },
                { id: "2", club: "Rotaract", title: "Blood Donation Drive", content: "Annual blood donation camp happening next week in collaboration with City Hospital. Please register.", date: new Date().toLocaleDateString() },
                { id: "3", club: "NSS", title: "Campus Cleanup Drive", content: "Let's make our campus greener! Join the NSS volunteers this Saturday morning.", date: new Date().toLocaleDateString() },
                { id: "4", club: "YRC", title: "First Aid Training Workshop", content: "Mandatory first aid certification workshop for all newly inducted YRC members.", date: new Date().toLocaleDateString() },
            ];
            setAnnouncements(initial);
            localStorage.setItem("mockClubAnnouncements", JSON.stringify(initial));
        }
    }, [router]);

    const handleCreateAnnouncement = () => {
        if (!newTitle.trim() || !newContent.trim()) {
            toast.error("Please fill in both title and content.");
            return;
        }

        const newAnnouncement: Announcement = {
            id: Date.now().toString(),
            club: activeClub,
            title: newTitle.trim(),
            content: newContent.trim(),
            date: new Date().toLocaleDateString()
        };

        const updated = [newAnnouncement, ...announcements];
        setAnnouncements(updated);
        localStorage.setItem("mockClubAnnouncements", JSON.stringify(updated));

        setNewTitle("");
        setNewContent("");
        setIsCreating(false);
        toast.success("Announcement posted successfully!");
    };

    const confirmDelete = (id: string) => {
        setAnnouncementToDelete(id);
        setDialogOpen(true);
    };

    const handleDelete = () => {
        if (!announcementToDelete) return;

        const updated = announcements.filter(a => a.id !== announcementToDelete);
        setAnnouncements(updated);
        localStorage.setItem("mockClubAnnouncements", JSON.stringify(updated));
        setDialogOpen(false);
        setAnnouncementToDelete(null);
        toast.success("Announcement deleted.");
    };

    if (!role) return <div className="p-8 text-center text-blue-900 font-bold italic">Initializing Portal...</div>;

    const filteredAnnouncements = announcements.filter(a => a.club === activeClub);

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-16">
                <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <AlertDialogContent className="rounded-[2rem]">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-black text-blue-900 uppercase">Delete Announcement</AlertDialogTitle>
                            <AlertDialogDescription className="font-medium text-slate-600">
                                Are you sure you want to delete this announcement? This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-xl font-bold uppercase tracking-widest text-xs">Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-red-100">
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <section className="bg-blue-900 py-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10">
                        <Users className="h-64 w-64" />
                    </div>

                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-4xl mx-auto md:mx-0">
                            <BackButton />

                            <div className="mt-8 flex items-center gap-2 mb-4">
                                <Badge variant="outline" className="border-blue-400 text-blue-100 bg-blue-800/40 uppercase tracking-[0.2em] text-[10px] px-3 py-1">
                                    Campus Life
                                </Badge>
                                <span className="h-1 w-1 bg-blue-400 rounded-full"></span>
                                <span className="text-[10px] uppercase tracking-widest text-blue-300 font-bold">Student Clubs</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                                Clubs & <br className="hidden md:block" />
                                <span className="text-blue-400">Communities</span>
                            </h1>

                            <p className="text-blue-100/70 text-lg max-w-2xl leading-relaxed font-medium">
                                Stay updated with the latest events and announcements from your favorite campus clubs.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="container mt-12">
                    {/* Club Navigation Tabs */}
                    <div className="flex space-x-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                        {CLUBS.map(club => (
                            <Button
                                key={club}
                                variant={activeClub === club ? "default" : "outline"}
                                onClick={() => {
                                    setActiveClub(club);
                                    setIsCreating(false);
                                }}
                                className={`min-w-[120px] rounded-xl font-bold uppercase tracking-widest text-[10px] h-11 transition-all ${activeClub === club
                                    ? "bg-blue-600 shadow-lg shadow-blue-100 scale-105"
                                    : "border-gray-100 text-gray-400 hover:border-blue-200 hover:text-blue-600"
                                    }`}
                            >
                                {club}
                            </Button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Announcements Feed */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex justify-between items-center px-1">
                                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">{activeClub} Feed</h2>
                                {role === "staff" && !isCreating && (
                                    <Button onClick={() => setIsCreating(true)} className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold uppercase tracking-widest text-[10px] h-9 shadow-lg shadow-blue-100">
                                        <Plus className="w-3 h-3 mr-2" /> New Post
                                    </Button>
                                )}
                            </div>

                            {/* Create Form (Staff Only) */}
                            {role === "staff" && isCreating && (
                                <Card className="border-blue-100 bg-blue-50/30 p-8 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xl font-black text-blue-900 mb-6 uppercase tracking-tight">Post to {activeClub}</h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Announcement Title</label>
                                                    <Input
                                                        placeholder="e.g., Upcoming Hackathon"
                                                        value={newTitle}
                                                        onChange={(e) => setNewTitle(e.target.value)}
                                                        className="bg-white border-transparent focus:border-blue-500 rounded-xl h-12 px-4 shadow-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] uppercase font-black tracking-widest text-blue-900 mb-2 block ml-1">Details & Content</label>
                                                    <Textarea
                                                        placeholder="Enter announcement details..."
                                                        className="min-h-[120px] bg-white border-transparent focus:border-blue-500 rounded-xl p-4 shadow-sm resize-none"
                                                        value={newContent}
                                                        onChange={(e) => setNewContent(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 justify-end">
                                            <Button variant="ghost" onClick={() => setIsCreating(false)} className="rounded-xl font-bold uppercase tracking-widest text-xs text-slate-500">Cancel</Button>
                                            <Button onClick={handleCreateAnnouncement} className="bg-blue-600 hover:bg-blue-700 rounded-xl font-bold uppercase tracking-widest text-xs px-6 h-12 shadow-xl shadow-blue-100">Post Announcement</Button>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            <div className="space-y-4">
                                {filteredAnnouncements.length === 0 ? (
                                    <div className="text-center py-24 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No announcements for {activeClub}</p>
                                    </div>
                                ) : (
                                    filteredAnnouncements.map((announcement) => (
                                        <Card key={announcement.id} className="group bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col">
                                            <div className="flex flex-row items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{announcement.date}</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">{announcement.title}</h3>
                                                </div>
                                                {role === "staff" && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 text-red-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                                                        onClick={() => confirmDelete(announcement.id)}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                )}
                                            </div>
                                            <p className="whitespace-pre-wrap text-slate-600 leading-relaxed font-medium">
                                                {announcement.content}
                                            </p>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Right Sidebar: About Card */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-8 space-y-6">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest px-1">Club Info</h3>
                                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Users className="h-32 w-32" />
                                    </div>
                                    <div className="relative z-10 space-y-6">
                                        <div>
                                            <h4 className="text-2xl font-black tracking-tight leading-none mb-4 uppercase">{activeClub}</h4>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
                                                Dedicated to student excellence and community engagement at Jerusalem College.
                                            </p>
                                        </div>
                                        <div className="space-y-4 pt-4">
                                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                                                Active Since 2024
                                            </div>
                                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                                                <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                                                {filteredAnnouncements.length} Published Updates
                                            </div>
                                        </div>
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
