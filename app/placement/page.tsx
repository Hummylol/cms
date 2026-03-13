import BackButton from "@/components/BackButton";
import { PlacementPredictor } from "@/components/placement-predictor";

export default function PlacementPredictionPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <main className="flex-1 pb-12">
                <section className="bg-blue-900 py-10 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <div className="text-9xl font-black">CAREER</div>
                    </div>
                    <div className="container relative z-10">
                        <div className="flex flex-col items-center md:items-start max-w-3xl mx-auto md:mx-0">
                            <BackButton />
                            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl mb-2 mt-4">
                                AI Placement Predictor
                            </h1>
                            <p className="text-blue-100/80 text-lg max-w-xl">
                                Powered by our custom trained AI model to analyze your profile and provide real career insights.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-8">
                    <div className="container">
                        <div className="mx-auto max-w-3xl">
                            <PlacementPredictor />
                        </div>
                    </div>
                </section>

                <section className="container mt-8">
                    <div className="mx-auto max-w-3xl border-t border-gray-100 pt-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-50 p-2 rounded-lg">
                                <span className="text-lg">💡</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-blue-900 mb-1">How it works</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Our AI analyze your academic marks, technical skills, and areas of interest against current industry trends and placement eligibility criteria to give you a detailed preparation roadmap.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
