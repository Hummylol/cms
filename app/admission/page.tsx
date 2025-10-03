import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className='h-[100vh] flex flex-col gap-4 justify-center items-center'>
        <Link
            href="/admission/onlineregistration"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            📝 Online Registration
          </Link>

          <Link
            href="/admission/docverif"
            className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            📎 Document Verification
          </Link>

          <Link
            href="/admission/onlinereg"
            className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            💳 Pay Registration Fees
          </Link>
    </div>
  )
}

export default page