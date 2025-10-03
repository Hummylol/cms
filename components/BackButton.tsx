'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="text-sm text-blue-600 mt-6 underline hover:text-blue-800"
    >
      ← Home
    </button>
  );
}
