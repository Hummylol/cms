import BackButton from "@/components/BackButton";

export default function SeatingAllotmentPage() {
    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg text-center">
                    <div className="text-6xl mb-6">🪑</div>
                    <h1 className="text-2xl font-bold text-blue-700 mb-3">Semester Exam Seating Allotment</h1>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        Your examination hall and seat number will be displayed here before the commencement of end semester examinations.
                    </p>
                    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm text-left space-y-3">
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Details provided</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Exam hall number and building</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Seat / bench number</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Roll number mapped to seat</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Seating arrangement map</li>
                        </ul>
                    </div>
                    <p className="mt-6 text-xs text-gray-400">
                        🕐 Seating allotment not yet released. Please check back later.
                    </p>
                </div>
            </div>
        </>
    );
}
