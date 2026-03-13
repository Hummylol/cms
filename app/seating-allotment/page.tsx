import BackButton from "@/components/BackButton";
import { SeatAllotmentViewer } from "@/components/seat-allotment-viewer";

export default function SeatingAllotmentPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-12">
                <section className="bg-blue-900 py-10 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <div className="text-9xl font-black">SEAT</div>
                    </div>
                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-3xl mx-auto md:mx-0">
                            <BackButton />
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-2 mt-4">
                                Exam Seat Allotment
                            </h1>
                            <p className="text-blue-100/80 text-lg max-w-xl">
                                Dynamic seating arrangements for end-semester examinations.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-8">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <SeatAllotmentViewer />
                        </div>
                    </div>
                </section>

                <section className="container mt-8">
                    <div className="mx-auto max-w-3xl border-t border-gray-100 pt-8">
                        <div className="flex items-start gap-4 text-gray-400">
                            <div className="bg-gray-50 p-2 rounded-lg">
                                <span className="text-lg">ℹ️</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-500 mb-1">Help & Support</h3>
                                <p className="text-sm leading-relaxed">
                                    If you cannot find your seating arrangement or if there is a conflict in your Roll Number, please contact the Examination Cell on the Ground Floor.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
