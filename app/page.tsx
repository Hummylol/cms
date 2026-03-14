// app/page.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import { Bot } from 'lucide-react';

export default function HomePage() {
  const [userText, setUserText] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("mockUserRole");
    const email = localStorage.getItem("mockUserEmail");
    if (role && email) {
      if (role === "staff") setUserText("Staff");
      else setUserText(email); // Roll No
    }
  }, []);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-white">
      {/* Top right login button */}
      <div className="absolute top-4 right-4 focus-within:z-10">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition shadow-sm"
        >
          {userText ? `👤 ${userText}` : "🔑 Login"}
        </Link>
      </div>

      <div className="w-full max-w-md text-center mt-12">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Welcome to College Management System</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Jerusalem College of Engineering — Student Portal
        </p>

        <div className="space-y-3">
          <Link href="/admission" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📝 Admission
          </Link>
          <Link href="/timetable" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            🗓️ Timetable
          </Link>
          <Link href="/attendance" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📅 Attendance
          </Link>
          <Link href="/results" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📊 Results
          </Link>
          <Link href="/clubs" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            🎭 Clubs & Communities
          </Link>
          <Link href="/notes" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📚 Notes & Resources
          </Link>
          <Link href="/assignments" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📝 Assignments
          </Link>

          <Link href="/exam-timetable" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            📋 End Semester Timetable
          </Link>
          <Link href="/seating-allotment" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            🪑 Semester Exam Seating Allotment
          </Link>
          <Link href="/malpractice-fees" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            ⚠️ Malpractice Documentation
          </Link>
          <Link href="/placement" className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            🚀 Placement Prediction
          </Link>
        </div>

        <footer className="mt-10 text-xs text-gray-400">
          © 2025 Jerusalem College Management System
        </footer>
      </div>

      {/* Floating Chatbot Button */}
      <button
        onClick={() => alert("Chatbot coming soon!")}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:-translate-y-1 transition-all duration-300 z-50 group border border-white/20"
        title="Need help?"
      >
        <Bot className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>

      <PWAInstallPrompt />
    </main>
  );
}

