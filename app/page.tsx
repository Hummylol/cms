// app/page.tsx

import Link from 'next/link';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">Welcome to College Management System</h1>
        <p className="text-gray-600 mb-8 text-sm">
          Start your journey by completing each step in the admission process.
        </p>

        <div className="space-y-4">
          <Link
            href="/admission"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            📝 Admission
          </Link>
          <Link
            href="/timetable"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            🗓️ Timetable
          </Link>
          <Link
            href="/attendance"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
             Attendance
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
