import BackButton from "@/components/BackButton";

export default function ExamTimetablePage() {
    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg text-center">
                    <div className="text-6xl mb-6">📋</div>
                    <h1 className="text-2xl font-bold text-blue-700 mb-3">End Semester Timetable</h1>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        The end semester examination timetable will be published here once released by the Controller of Examinations.
                        Check back closer to the exam period.
                    </p>
                    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm text-left space-y-3">
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">What to expect</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Date and time for each subject exam</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Examination hall/venue details</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Session (FN / AN) information</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Department-wise schedule</li>
                        </ul>
                    </div>
                    <p className="mt-6 text-xs text-gray-400">
                        🕐 Timetable not yet published. Please check back later.
                    </p>
                </div>
            </div>
        </>
    );
}
