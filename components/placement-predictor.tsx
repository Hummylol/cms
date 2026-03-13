"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, Sparkles, ChevronRight, ChevronLeft, Loader2, Target, CheckCircle2, Medal, Lightbulb, TrendingUp, ArrowRight, Building2 } from "lucide-react"

// Basic Textarea component to avoid import issues
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ className, ...props }, ref) => (
        <textarea
            className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
            ref={ref}
            {...props}
        />
    )
)
Textarea.displayName = "Textarea"

type FormData = {
    tenthMarks: string
    twelfthMarks: string
    cgpa: string
    interests: string
    skills: string
    knowledge: string
}

type PredictionResult = {
    status: string
    eligibilityNote: string
    topStrengths: string[]
    roadmap: string[]
    targetCompanies: string[]
    industryInsight: string
}

export function PlacementPredictor() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<PredictionResult | null>(null)
    const [formData, setFormData] = useState<FormData>({
        tenthMarks: "",
        twelfthMarks: "",
        cgpa: "",
        interests: "",
        skills: "",
        knowledge: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleNext = () => setStep((s) => s + 1)
    const handleBack = () => setStep((s) => s - 1)

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await fetch("/api/placement-predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            const data = await response.json()
            if (data.error) throw new Error(data.error)
            setResult(data.result)
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Failed to get prediction. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    if (result) {
        return (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-12">
                <Card className="border-blue-100 shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-3xl font-black tracking-tight">
                                    <Sparkles className="h-8 w-8 text-blue-200" /> Career Roadmap
                                </CardTitle>
                                <CardDescription className="text-blue-100/80 text-lg mt-1">Personalized strategy for your placement success.</CardDescription>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 flex items-center gap-2">
                                <Medal className="h-5 w-5 text-yellow-300" />
                                <span className="font-bold text-sm tracking-wide uppercase">{result.status}</span>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-8 space-y-8">
                        {/* Eligibility Section (Icon Highlight Card) */}
                        <div className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 relative overflow-hidden flex items-start gap-4">
                            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200 shrink-0">
                                <CheckCircle2 className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-blue-900 font-extrabold text-sm uppercase tracking-wider mb-1">
                                    Eligibility Assessment
                                </h3>
                                <p className="text-blue-800 leading-relaxed font-semibold">
                                    {result.eligibilityNote}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Strengths Section */}
                            <div className="space-y-4">
                                <h3 className="text-gray-400 font-bold flex items-center gap-2 text-xs uppercase tracking-widest px-1">
                                    <Lightbulb className="h-4 w-4 text-amber-500" /> Key Strengths
                                </h3>
                                <div className="space-y-3">
                                    {result.topStrengths.map((strength, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                                            <div className="h-8 w-8 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600 font-black text-xs">
                                                0{i + 1}
                                            </div>
                                            <span className="text-gray-700 font-bold text-sm">{strength}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Roadmap Section */}
                            <div className="space-y-4">
                                <h3 className="text-gray-400 font-bold flex items-center gap-2 text-xs uppercase tracking-widest px-1">
                                    <Target className="h-4 w-4 text-emerald-500" /> Step-by-Step Roadmap
                                </h3>
                                <div className="space-y-3">
                                    {result.roadmap.map((step, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 group hover:border-emerald-200 transition-colors">
                                            <div className="mt-1 h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <ArrowRight className="h-3 w-3 text-emerald-600" />
                                            </div>
                                            <span className="text-gray-700 font-bold text-sm leading-snug">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Target Companies Section (New) */}
                        <div className="space-y-4">
                            <h3 className="text-gray-400 font-bold flex items-center gap-2 text-xs uppercase tracking-widest px-1">
                                <Building2 className="h-4 w-4 text-indigo-500" /> Target Companies Like
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {result.targetCompanies.map((company, i) => (
                                    <div key={i} className="px-5 py-3 bg-white border-2 border-indigo-50 rounded-2xl text-indigo-700 font-black text-xs uppercase tracking-tighter shadow-sm hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-default">
                                        {company}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Insight Section */}
                        <div className="bg-slate-900 text-white rounded-3xl p-8 relative overflow-hidden shadow-xl shadow-slate-200">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <TrendingUp className="h-32 w-32" />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-indigo-400 font-black flex items-center gap-2 mb-4 uppercase tracking-tighter text-sm">
                                    <TrendingUp className="h-5 w-5" /> Market Demand Insight
                                </h3>
                                <p className="text-slate-200 leading-relaxed font-medium">
                                    {result.industryInsight}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <Button
                                onClick={() => { setResult(null); setStep(1); }}
                                variant="outline"
                                className="px-10 py-6 rounded-full border-2 border-blue-600 text-blue-600 font-black uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white transition-all shadow-lg hover:shadow-blue-200"
                            >
                                Start New Analysis
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "bg-gray-200 text-gray-500"}`}>
                            {s}
                        </div>
                        {s < 3 && <div className={`h-1 w-12 rounded ${step > s ? "bg-blue-600 text-blue-200" : "bg-gray-200"}`}></div>}
                    </div>
                ))}
            </div>

            <Card className="border-blue-100 shadow-2xl overflow-hidden rounded-3xl">
                <CardHeader className="bg-slate-50 border-b border-blue-50 py-6">
                    <CardTitle className="text-xl font-black text-blue-900 flex items-center gap-2 tracking-tight uppercase">
                        {step === 1 && <><Target className="h-6 w-6 text-blue-600" /> Academic Scorecard</>}
                        {step === 2 && <><Brain className="h-6 w-6 text-indigo-600" /> Skills & Domain</>}
                        {step === 3 && <><CheckCircle2 className="h-6 w-6 text-emerald-600" /> Final Assessment</>}
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-8">
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="tenthMarks" className="text-xs font-black uppercase text-gray-400 tracking-widest">10th Grade Marks (%)</Label>
                                    <Input name="tenthMarks" id="tenthMarks" placeholder="e.g. 92" value={formData.tenthMarks} onChange={handleChange} className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold text-lg" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="twelfthMarks" className="text-xs font-black uppercase text-gray-400 tracking-widest">12th Grade Marks (%)</Label>
                                    <Input name="twelfthMarks" id="twelfthMarks" placeholder="e.g. 88" value={formData.twelfthMarks} onChange={handleChange} className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold text-lg" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cgpa" className="text-xs font-black uppercase text-gray-400 tracking-widest">Current University CGPA</Label>
                                <Input name="cgpa" id="cgpa" placeholder="e.g. 8.5" value={formData.cgpa} onChange={handleChange} className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold text-lg" />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <Label htmlFor="interests" className="text-xs font-black uppercase text-gray-400 tracking-widest">Preferred Career Domain</Label>
                                <Input name="interests" id="interests" placeholder="e.g. Web Development, AI/ML, Cloud" value={formData.interests} onChange={handleChange} className="h-14 bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold text-lg" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="skills" className="text-xs font-black uppercase text-gray-400 tracking-widest">Technical Toolkit</Label>
                                <Textarea name="skills" id="skills" placeholder="List your languages, frameworks, tools..." value={formData.skills} onChange={handleChange} className="min-h-[120px] bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold" />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <Label htmlFor="knowledge" className="text-xs font-black uppercase text-gray-400 tracking-widest">Theoretical Proficiency</Label>
                                <Textarea name="knowledge" id="knowledge" placeholder="Mention your depth in core concepts (OOPs, SQL, DSA...)" value={formData.knowledge} onChange={handleChange} className="min-h-[120px] bg-gray-50 border-gray-100 rounded-2xl focus:bg-white transition-all font-bold" />
                            </div>
                            <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-3xl text-xs text-blue-700 leading-relaxed font-bold italic text-center">
                                "Our custom trained engine will now generate a high-precision preparation roadmap based on current industry benchmarks."
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-12">
                        <Button variant="ghost" onClick={handleBack} disabled={step === 1} className="gap-2 font-black uppercase tracking-widest text-xs text-gray-400 hover:text-blue-600 transition-colors">
                            <ChevronLeft className="h-4 w-4" /> Go Back
                        </Button>
                        {step < 3 ? (
                            <Button onClick={handleNext} className="gap-2 bg-blue-600 h-12 px-8 rounded-full font-black uppercase tracking-widest text-xs shadow-lg shadow-blue-200">
                                Next Phase <ChevronRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={loading} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white h-12 px-8 rounded-full font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-200">
                                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Calibrating...</> : <><Sparkles className="h-4 w-4" /> Generate Score</>}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
