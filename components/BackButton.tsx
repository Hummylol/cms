'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className=''>
      <button
      onClick={() => router.back()}
      className="mt-2 ml-2 p-2.5  backdrop-blur border bg-white border-slate-200 rounded-full shadow text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition"
      title="Go Back"
    >
      <ArrowLeft className="w-5 h-5" />
    </button>
    </div>
  );
}
