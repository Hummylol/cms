// app/page.tsx
"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

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

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 h-px bg-blue-100" />
            <span className="text-xs text-blue-300 font-medium uppercase tracking-wide">Upcoming</span>
            <div className="flex-1 h-px bg-blue-100" />
          </div>

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

      <PWAInstallPrompt />
    </main>
  );
}

