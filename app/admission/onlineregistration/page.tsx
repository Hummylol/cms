// app/onlineregistration/page.tsx

'use client';

import { useState } from 'react';
import BackButton from "@/components/BackButton";

export default function OnlineRegistration() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    course: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const res = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit');
      setResult('Submitted successfully.');
      setForm({ fullName: '', email: '', phone: '', dob: '', address: '', course: '' });
    } catch (err: unknown) {
      setResult(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <BackButton/>
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-blue-700 mb-2">Online Registration</h1>
      {result && (
        <div className="mb-2 text-sm {result.includes('success') ? 'text-green-600' : 'text-red-600'}">{result}</div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          className="w-full border p-2 rounded"
          value={form.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={handleChange}
        />
        <select
          name="course"
          className="w-full border p-2 rounded"
          value={form.course}
          onChange={handleChange}
        >
          <option value="">Select Course</option>
          <option value="IT">IT</option>
          <option value="CSE">CSE</option>
          <option value="CSBS">CSBS</option>
          <option value="AIDS">AIDS</option>
          <option value="AIML">AIML</option>
          <option value="CS">CS</option>
          <option value="BME">BME</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </>
  );
}
