// app/onlineregistration/page.tsx

'use client';

import { useState } from 'react';

export default function OnlineRegistration() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    address: '',
    course: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-blue-700 mb-4">Online Registration</h1>
      <form className="space-y-4">
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
          <option value="bsc">B.Sc</option>
          <option value="ba">B.A</option>
          <option value="bcom">B.Com</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
