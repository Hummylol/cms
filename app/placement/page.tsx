import BackButton from "@/components/BackButton";

export default function PlacementPredictionPage() {
    return (
        <>
            <BackButton />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4 py-16">
                <div className="w-full max-w-lg text-center">
                    <div className="text-6xl mb-6">🚀</div>
                    <h1 className="text-2xl font-bold text-blue-700 mb-3">Placement Prediction</h1>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                        Get a personalised placement readiness score based on your academic performance, attendance,
                        skills, and aptitude. Identify areas to improve and boost your chances.
                    </p>
                    <div className="bg-white border border-blue-100 rounded-xl p-6 shadow-sm text-left space-y-3 mb-6">
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Factors considered</p>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> CGPA and subject-wise performance</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Attendance percentage</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Technical skill assessments</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Internships and project experience</li>
                            <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Aptitude and communication score</li>
                        </ul>
                    </div>
                    <button
                        disabled
                        className="w-full py-3 rounded-lg bg-blue-200 text-blue-400 font-medium cursor-not-allowed text-sm"
                    >
                        🚀 Check My Placement Score (Coming Soon)
                    </button>
                    <p className="mt-4 text-xs text-gray-400">
                        This feature is under development. Check back soon!
                    </p>
                </div>
            </div>
        </>
    );
}
