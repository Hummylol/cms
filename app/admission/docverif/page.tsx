// app/docverif/page.tsx

import BackButton from "@/components/BackButton";

export default function DocVerification() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <BackButton/>
      <h1 className="text-xl font-bold text-blue-700 mb-4">Document Verification</h1>
      <p className="text-gray-600 mb-4">Please upload the following documents:</p>

      <ul className="list-disc list-inside mb-4 text-sm text-gray-700">
        <li>10th Marksheet</li>
        <li>12th Marksheet</li>
        <li>Transfer Certificate</li>
        <li>Passport Size Photo</li>
        <li>Community Certificate (if applicable)</li>
      </ul>

      <div className="space-y-4">
        {['10th Marksheet', '12th Marksheet', 'Transfer Certificate', 'Photo', 'Community Certificate'].map((label, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input type="file" disabled className="w-full border p-2 rounded bg-gray-100 text-gray-500" />
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-red-500">* Upload is disabled for demo purposes</p>
    </div>
  );
}
