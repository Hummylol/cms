"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, BookOpen, Plus, Trash2, Save } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type ExamSlot = {
    id: string
    date: string
    subjectCode: string
    time: string // e.g., "10:00 AM - 01:00 PM"
}

const departments = ["CSE", "IT", "EEE", "ECE", "CS", "CSBS", "AIDS", "AIML", "BME"]
const years = ["Year 1", "Year 2", "Year 3", "Year 4"]
const sections = ["A", "B", "-"]

export function ExamTimetableViewer() {
    const [role, setRole] = useState<string | null>(null)
    const [mounted, setMounted] = useState(false)

    // Selectors
    const [selectedYear, setSelectedYear] = useState(years[0])
    const [selectedDept, setSelectedDept] = useState(departments[0])
    const [selectedSection, setSelectedSection] = useState(sections[0])

    // Timetable State
    const [timetable, setTimetable] = useState<Record<string, ExamSlot[]>>({})

    // New Exam Form State
    const [newDate, setNewDate] = useState("")
    const [newSubject, setNewSubject] = useState("")
    const [newTime, setNewTime] = useState("09:00 AM - 12:00 PM")

    useEffect(() => {
        setRole(localStorage.getItem("mockUserRole"))
        const saved = localStorage.getItem("examTimetable")
        if (saved) {
            setTimetable(JSON.parse(saved))
        }
        setMounted(true)
    }, [])

    const isStaff = role === "staff"
    const currentKey = `${selectedYear}-${selectedDept}-${selectedSection}`
    const currentExams = timetable[currentKey] || []

    const handleAddExam = () => {
        if (!newDate || !newSubject) return

        const newExam: ExamSlot = {
            id: crypto.randomUUID(),
            date: newDate,
            subjectCode: newSubject,
            time: newTime,
        }

        const updated = {
            ...timetable,
            [currentKey]: [...currentExams, newExam].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        }

        setTimetable(updated)
        localStorage.setItem("examTimetable", JSON.stringify(updated))
        setNewDate("")
        setNewSubject("")
    }

    const handleDeleteExam = (id: string) => {
        const updated = {
            ...timetable,
            [currentKey]: currentExams.filter((e) => e.id !== id),
        }
        setTimetable(updated)
        localStorage.setItem("examTimetable", JSON.stringify(updated))
    }

    if (!mounted) return null

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-blue-100">
                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-blue-700 uppercase">Year</Label>
                    <Select value={selectedYear} onValueChange={setSelectedYear}>
                        <SelectTrigger className="w-[120px] h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={y}>{y}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-blue-700 uppercase">Department</Label>
                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                        <SelectTrigger className="w-[120px] h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map((d) => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <Label className="text-xs font-semibold text-blue-700 uppercase">Section</Label>
                    <Select
                        value={selectedSection}
                        onValueChange={setSelectedSection}
                    >
                        <SelectTrigger className="w-[100px] h-9">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {sections.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {isStaff && (
                <Card className="border-blue-200 bg-blue-50/30">
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-800">
                            <Plus className="h-4 w-4" /> Add Exam Entry
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="date" className="text-xs">Date</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                    onClick={(e) => (e.target as HTMLInputElement).showPicker?.()}
                                    className="h-9 cursor-pointer"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="subject" className="text-xs">Subject Code</Label>
                                <Input
                                    id="subject"
                                    placeholder="e.g. CS3401"
                                    value={newSubject}
                                    onChange={(e) => setNewSubject(e.target.value)}
                                    className="h-9"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="time" className="text-xs">Time / Session</Label>
                                <Select value={newTime} onValueChange={setNewTime}>
                                    <SelectTrigger className="h-9">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM (FN)</SelectItem>
                                        <SelectItem value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (AN)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button onClick={handleAddExam} className="w-full bg-blue-600 hover:bg-blue-700 h-9">
                            Add to Schedule
                        </Button>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-3">
                {currentExams.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                        <p className="text-sm text-gray-400 font-medium italic">
                            No exams scheduled for {selectedDept} {selectedYear} {selectedSection !== "-" ? `Section ${selectedSection}` : ""}
                        </p>
                    </div>
                ) : (
                    currentExams.map((exam) => (
                        <Card key={exam.id} className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                                <div className="bg-blue-600 text-white p-4 flex flex-col items-center justify-center min-w-[100px]">
                                    <span className="text-xs uppercase font-bold opacity-80">
                                        {new Date(exam.date).toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-black">
                                        {new Date(exam.date).getDate()}
                                    </span>
                                    <span className="text-xs font-medium">
                                        {new Date(exam.date).getFullYear()}
                                    </span>
                                </div>
                                <div className="flex-1 p-4 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 text-blue-500" />
                                            <span className="font-bold text-gray-800">{exam.subjectCode}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="h-3.5 w-3.5" />
                                            {exam.time}
                                        </div>
                                    </div>
                                    {isStaff && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => handleDeleteExam(exam.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}
