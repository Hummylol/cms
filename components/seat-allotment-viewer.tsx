"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Armchair, Lock, Info } from "lucide-react"

// Simple hash function for consistent randomization based on string seed
function hashCode(str: string) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = (hash << 5) - hash + char
        hash = hash & hash // Convert to 32bit integer
    }
    return Math.abs(hash)
}

export function SeatAllotmentViewer() {
    const [mounted, setMounted] = useState(false)
    const [role, setRole] = useState<string | null>(null)
    const [userEmail, setUserEmail] = useState<string | null>(null)

    useEffect(() => {
        setRole(localStorage.getItem("mockUserRole"))
        setUserEmail(localStorage.getItem("mockUserEmail"))
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isStaff = role === "staff"
    const seed = userEmail || "anonymous"
    const hash = hashCode(seed)

    // Floors: 0, 1, 2
    const floor = hash % 3

    // Rooms: M[floor]01 to M[floor]07
    const roomNum = (hash % 7) + 1
    const room = `M${floor}${roomNum.toString().padStart(2, "0")}`

    // Bench: Rows A-D (0-3), Col 1-6 (0-5)
    const rows = ["A", "B", "C", "D"]
    const rowIndex = hash % 4
    const colIndex = (hash % 6) + 1
    const bench = `${rows[rowIndex]}${colIndex}`

    return (
        <div className="space-y-6">
            <Card className={`relative overflow-hidden border-blue-100 shadow-lg ${isStaff ? "bg-gray-50/50" : "bg-white"}`}>
                {isStaff && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md p-6 text-center">
                        <div className="bg-blue-600 p-4 rounded-full mb-4 shadow-blue-200 shadow-xl">
                            <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Seat Allotment Restricted</h3>
                        <p className="text-sm text-gray-600 max-w-xs">
                            Seating arrangements are only visible to students to ensure examination integrity.
                        </p>
                    </div>
                )}

                <CardHeader className="bg-blue-600 text-white pb-8">
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="border-white/30 text-white bg-white/10 uppercase tracking-widest text-[10px]">
                            End Semester Dec 2025
                        </Badge>
                        <div className="flex items-center gap-2 text-xs opacity-80">
                            <Info className="h-3 w-3" />
                            Randomized Allotment
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-black tracking-tight">Examination Seating</CardTitle>
                    {!isStaff && <p className="text-blue-100 text-sm opacity-80 mt-1">Found assignment for: <span className="font-bold underline">{userEmail}</span></p>}
                </CardHeader>

                <CardContent className="pt-8 pb-10 px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className={`space-y-4 ${isStaff ? "blur-sm" : ""}`}>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                                    <MapPin className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Assigned Room</p>
                                    <p className="text-3xl font-black text-gray-800">{room}</p>
                                    <p className="text-xs text-blue-500 font-medium">Floor {floor === 0 ? "Ground" : floor === 1 ? "1st" : "2nd"}</p>
                                </div>
                            </div>
                        </div>

                        <div className={`space-y-4 ${isStaff ? "blur-sm" : ""}`}>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100">
                                    <Armchair className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Bench Number</p>
                                    <p className="text-3xl font-black text-gray-800">{bench}</p>
                                    <p className="text-xs text-blue-500 font-medium tracking-tight">Row {rows[rowIndex]} - Seat {colIndex}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {!isStaff && (
                        <div className="mt-10 bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
                            <div className="mt-0.5"><Info className="h-4 w-4 text-blue-600" /></div>
                            <p className="text-xs text-blue-800 leading-relaxed font-medium">
                                Please occupy your assigned seat <span className="font-bold">15 minutes before</span> the exam starts. Swapping seats without permission will result in disqualification.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {!isStaff && (
                <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                        Room Details: {room}
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 24 }).map((_, i) => {
                            const r = rows[Math.floor(i / 6)]
                            const c = (i % 6) + 1
                            const currentBench = `${r}${c}`
                            const isSelected = currentBench === bench
                            return (
                                <div
                                    key={i}
                                    className={`h-10 rounded-lg flex items-center justify-center text-[10px] font-bold border transition-all ${isSelected ? "bg-blue-600 text-white border-blue-700 scale-110 shadow-lg shadow-blue-200 z-1" : "bg-gray-50 text-gray-400 border-gray-100"}`}
                                >
                                    {currentBench}
                                </div>
                            )
                        })}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-4 text-center font-medium uppercase tracking-widest italic">Facing towards the blackboard</p>
                </div>
            )}
        </div>
    )
}
