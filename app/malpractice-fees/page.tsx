import BackButton from "@/components/BackButton";

export default function MalpracticeFeesPage() {
    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg text-center">
                    <div className="text-6xl mb-6">⚠️</div>
                    <h1 className="text-2xl font-bold text-blue-700 mb-3">Malpractice Fees Payment</h1>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        If you have been penalised for malpractice during an examination, the applicable fine must be paid
                        here before you can re-appear for the affected paper.
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm text-left space-y-3 mb-6">
                        <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide">⚠️ Important Notice</p>
                        <ul className="text-sm text-amber-800 space-y-2">
                            <li className="flex items-start gap-2"><span className="mt-0.5">•</span> Malpractice fine must be cleared within 30 days</li>
                            <li className="flex items-start gap-2"><span className="mt-0.5">•</span> Hall ticket will not be issued until fine is paid</li>
                            <li className="flex items-start gap-2"><span className="mt-0.5">•</span> Contact the exam section for fine details</li>
                            <li className="flex items-start gap-2"><span className="mt-0.5">•</span> Keep the payment receipt for future reference</li>
                        </ul>
                    </div>
                    <div className="bg-white border border-blue-100 rounded-xl p-5 text-sm text-gray-600 text-left mb-4">
                        <p className="font-semibold text-blue-700 mb-2">Contact Examination Section</p>
                        <p>📍 Admin Block, Room 105</p>
                        <p>📞 044-XXXXXXXX</p>
                        <p>📧 exams@jerusalemcollege.edu</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                        Online payment portal coming soon. Visit the examination section in person for now.
                    </p>
                </div>
            </div>
        </>
    );
}
