import BackButton from "@/components/BackButton";

export default function HallTicketPage() {
    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg text-center">
                    <div className="text-6xl mb-6">🎫</div>
                    <h1 className="text-2xl font-bold text-blue-700 mb-3">Hall Ticket Generation</h1>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        Download your official hall ticket for end semester examinations. You must carry a printed copy
                        to the examination hall. Hall tickets are issued only after fee clearance.
                    </p>
                    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm text-left space-y-3 mb-6">
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Requirements</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> All semester fees must be cleared</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Minimum 75% attendance required</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> No pending library dues or fines</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Registration fee payment confirmed</li>
                        </ul>
                    </div>
                    <button
                        disabled
                        className="w-full py-3 rounded-lg bg-blue-200 text-blue-400 font-medium cursor-not-allowed text-sm"
                    >
                        🎫 Generate Hall Ticket (Not yet available)
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        Hall tickets will be enabled closer to the examination date.
                    </p>
                </div>
            </div>
        </>
    );
}
