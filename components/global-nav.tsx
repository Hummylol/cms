"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function GlobalNav() {
    const router = useRouter();
    const pathname = usePathname();

    // Do not show back button on the homepage
    if (pathname === "/") return null;

    return (
        <button
            onClick={() => router.push("/")}
            className="fixed top-4 left-4 z-50 p-2.5 bg-white/80 backdrop-blur border border-slate-200 rounded-full shadow text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition"
            title="Back to Home"
        >
            <ArrowLeft className="w-5 h-5" />
        </button>
    );
}
