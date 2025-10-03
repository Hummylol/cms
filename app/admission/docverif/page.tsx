"use client";
import BackButton from "@/components/BackButton";
import { useState } from "react";

export default function DocVerification() {
  const [form, setForm] = useState({
    notes: "",
    applicant: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    try {
      const fd = new FormData(e.target as HTMLFormElement);
      if (form.notes) fd.set('notes', form.notes);
      if (form.applicant) fd.set('applicant', form.applicant);
      const res = await fetch('/api/docverif/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit');
      setResult('Submitted successfully.');
      (e.target as HTMLFormElement).reset();
      setForm({ notes: "", applicant: "" });
    } catch (err: unknown) {
      setResult(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <BackButton/>
      <h1 className="text-xl font-bold text-blue-700 mb-2">Document Verification</h1>
      {result && (
        <div className="mb-2 text-sm {result.includes('success') ? 'text-green-600' : 'text-red-600'}">{result}</div>
      )}
      <p className="text-gray-600 mb-4">Upload PDF copies of your documents. Max ~10MB each is typical.</p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Applicant Name</label>
          <input name="applicant" value={form.applicant} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Full Name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">10th Marksheet (PDF)</label>
          <input name="tenth" type="file" accept="application/pdf" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">12th Marksheet (PDF)</label>
          <input name="twelfth" type="file" accept="application/pdf" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Transfer Certificate (PDF)</label>
          <input name="tc" type="file" accept="application/pdf" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Photo (PDF)</label>
          <input name="photo" type="file" accept="application/pdf" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Community Certificate (PDF, if applicable)</label>
          <input name="community" type="file" accept="application/pdf" className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} className="w-full border p-2 rounded" placeholder="Optional notes" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
