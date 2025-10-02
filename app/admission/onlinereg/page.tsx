// app/onlinereg/page.tsx

export default function OnlineRegFees() {
  return (
    <div className="p-4 max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold text-blue-700 mb-4">Pay Registration Fees</h1>

      <p className="text-gray-600 mb-4 text-sm">
        Please scan the QR code below or email your payment confirmation to:
      </p>

      <div className="mb-4">
        <img
          src="/payment-qr-placeholder.png" // Replace with your actual image path
          alt="Payment QR Code"
          className="w-48 h-48 mx-auto border rounded"
        />
      </div>

      <p className="text-sm text-gray-700">
        📧 Email: <a href="mailto:admissions@jerusalemcollege.edu" className="text-blue-600 underline">admissions@jerusalemcollege.edu</a>
      </p>

      <p className="text-xs text-gray-500 mt-4">Make sure to include your full name and phone number in the payment note.</p>
    </div>
  );
}
