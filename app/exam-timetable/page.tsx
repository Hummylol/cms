import BackButton from "@/components/BackButton";
import { ExamTimetableViewer } from "@/components/exam-timetable-viewer";

export default function ExamTimetablePage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-12">
                <section className="bg-blue-900 py-10 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <div className="text-9xl font-black">EXAM</div>
                    </div>
                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-3xl mx-auto md:mx-0">
                            <BackButton />
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-2 mt-4">
                                End Semester Timetable
                            </h1>
                            <p className="text-blue-100/80 text-lg max-w-xl">
                                Official examination schedule for all departments and years.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-8">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <ExamTimetableViewer />
                        </div>
                    </div>
                </section>

                <section className="container mt-8 lg:mt-12">
                    <div className="mx-auto max-w-3xl bg-blue-50 border border-blue-100 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-600 text-white p-2 rounded-lg">
                                <span className="text-xl">⚠️</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">Important Instructions</h3>
                                <ul className="text-sm text-blue-800/80 space-y-1.5 list-disc pl-4">
                                    <li>Students must report to the examination hall 30 minutes before the session starts.</li>
                                    <li>Carry your Hall Ticket and College ID card for all examinations.</li>
                                    <li>Electronic gadgets and smartwatches are strictly prohibited inside the hall.</li>
                                    <li>Verify your subject codes carefully before the exam.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
