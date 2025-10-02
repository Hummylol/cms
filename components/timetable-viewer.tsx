"use client"

import React, { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, User, Edit3, Check, X } from "lucide-react"

type SlotType = "lecture" | "lab" | "break"
type TimeSlot = {
  id: string
  start: string // "08:30"
  end: string // "09:15"
  subject: string
  faculty: string
  room: string
  type: SlotType
}

type DaySchedule = {
  [day: string]: TimeSlot[]
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// Departments & years requested
const departments = [
  "CSE A",
  "CSE B",
  "IT",
  "EEE",
  "ECE",
  "CS",
  "CSBS",
  "AIDS",
  "AIML",
  "BME",
]
const years = ["Year 1", "Year 2", "Year 3", "Year 4"]

// break definitions (minutes)
const breaks = [
  { start: "10:00", end: "10:10" }, // 10 min
  { start: "11:40", end: "12:20" }, // 40 min
  { start: "13:50", end: "14:00" }, // 10 min
]

// helpers: convert "HH:MM" to minutes and back
const toMinutes = (t: string) => {
  const [hh, mm] = t.split(":").map(Number)
  return hh * 60 + mm
}
const fromMinutes = (m: number) => {
  const hh = Math.floor(m / 60)
  const mm = m % 60
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`
}

// produce the day slot sequence from 08:30 to 15:30, 45-min periods and the breaks
function generateDaySlots(): TimeSlot[] {
  const dayStart = toMinutes("08:30")
  const dayEnd = toMinutes("15:30")
  const periodLen = 45

  // convert break times to minutes
  const breakWindows = breaks.map((b) => ({
    start: toMinutes(b.start),
    end: toMinutes(b.end),
  }))

  const slots: TimeSlot[] = []
  let cursor = dayStart
  let idCounter = 0

  while (cursor < dayEnd) {
    // if cursor is at break start -> push break slot and advance to break end
    const matchingBreak = breakWindows.find((bw) => bw.start === cursor)
    if (matchingBreak) {
      const id = `slot-${idCounter++}`
      slots.push({
        id,
        start: fromMinutes(matchingBreak.start),
        end: fromMinutes(matchingBreak.end),
        subject: "Break",
        faculty: "",
        room: "",
        type: "break",
      })
      cursor = matchingBreak.end
      continue
    }

    // normal 45-min period
    const periodStart = cursor
    const periodEnd = cursor + periodLen

    // Next break start (if any) — ensure periods don't cross into break starts unexpectedly
    const nextBreak = breakWindows.find((bw) => bw.start > periodStart)
    if (nextBreak && periodEnd > nextBreak.start) {
      // If the period would cross the break, end it just before break so it fits the scheme.
      // However with the chosen start & break times, this branch isn't expected to be used.
      const id = `slot-${idCounter++}`
      slots.push({
        id,
        start: fromMinutes(periodStart),
        end: fromMinutes(nextBreak.start),
        subject: "Period",
        faculty: "",
        room: "",
        type: "lecture",
      })
      cursor = nextBreak.start
      continue
    }

    // push full period
    const id = `slot-${idCounter++}`
    slots.push({
      id,
      start: fromMinutes(periodStart),
      end: fromMinutes(periodEnd),
      subject: "Free",
      faculty: "",
      room: "",
      type: "lecture",
    })
    cursor = periodEnd
  }

  return slots
}

// Build a default timetable skeleton for every dept/year/day
function buildEmptyTimetable(): { [dept: string]: { [year: string]: DaySchedule } } {
    const baseSlots = generateDaySlots()
    const result: { [dept: string]: { [year: string]: DaySchedule } } = {}
    for (const dept of departments) {
      result[dept] = {}
      for (const y of years) {
        const daySchedule: DaySchedule = {}
        for (const d of days) {
          daySchedule[d] = baseSlots.map((s) => ({ ...s, id: `${dept}-${y}-${d}-${s.id}` }))
        }
        result[dept][y] = daySchedule
      }
    }
  
    // ✅ Seed IT 4th Year Monday timetable
    const monday = result["IT"]["Year 4"]["Monday"]
    monday[0].subject = "Big Data Analytics"
    monday[0].faculty = "Dr. D. Sudhagar"
  
    monday[1].subject = "Ethical Hacking"
    monday[1].faculty = "Mrs. K. Pushpavalli"
  
    monday[3].subject = "Cloud Computing Lab"
    monday[3].faculty = "Mr. K. Arun Prasad / Mr. R. Jayakumar"
  
    monday[4].subject = "Cloud Computing Lab"
    monday[4].faculty = "Mr. K. Arun Prasad / Mr. R. Jayakumar"
  
    monday[6].subject = "Essence of Indian Traditional Knowledge"
    monday[6].faculty = "Mrs. K. Shanmugapriya"
  
    monday[7].subject = "Cloud Computing"
    monday[7].faculty = "Mr. K. Arun Prasad"
  
    monday[9].subject = "Introduction to EV Vehicle"
    monday[9].faculty = "Mr. Arul Prakash"
  
    monday[10].subject = "AI Tools & Techniques"
    monday[10].faculty = "Mrs. S. Jeevitha"
  
    return result
  }

export function TimetableViewer() {
  // Hardcode user as staff for now (true => editable)
  const isStaff = true

  // initial timetable state (in memory)
  const initial = useMemo(() => buildEmptyTimetable(), [])
  const [timetable, setTimetable] = useState(initial)

  // selectors
  const [selectedDept, setSelectedDept] = useState(departments[2])
  const [selectedYear, setSelectedYear] = useState(years[3])
  const [selectedDay, setSelectedDay] = useState(days[0]) // default Monday

  // editing state
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingDraft, setEditingDraft] = useState<Partial<TimeSlot> | null>(null)

  const schedule = timetable[selectedDept][selectedYear][selectedDay] || []

  function startEdit(slot: TimeSlot) {
    setEditingId(slot.id)
    setEditingDraft({ ...slot })
  }


  function buildEmptyTimetable(): { [dept: string]: { [year: string]: DaySchedule } } {
    const baseSlots = generateDaySlots()
    const result: { [dept: string]: { [year: string]: DaySchedule } } = {}
    for (const dept of departments) {
      result[dept] = {}
      for (const y of years) {
        const daySchedule: DaySchedule = {}
        for (const d of days) {
          daySchedule[d] = baseSlots.map((s) => ({ ...s, id: `${dept}-${y}-${d}-${s.id}` }))
        }
        result[dept][y] = daySchedule
      }
    }
  
    // ✅ Seed IT 4th Year Monday timetable
    const monday = result["IT"]["Year 4"]["Monday"]
    monday[0].subject = "Big Data Analytics"
    monday[0].faculty = "Dr. D. Sudhagar"
  
    monday[1].subject = "Ethical Hacking"
    monday[1].faculty = "Mrs. K. Pushpavalli"
  
    monday[3].subject = "Cloud Computing Lab"
    monday[3].faculty = "Mr. K. Arun Prasad / Mr. R. Jayakumar"
  
    monday[4].subject = "Cloud Computing Lab"
    monday[4].faculty = "Mr. K. Arun Prasad / Mr. R. Jayakumar"
  
    monday[6].subject = "Essence of Indian Traditional Knowledge"
    monday[6].faculty = "Mrs. K. Shanmugapriya"
  
    monday[7].subject = "Cloud Computing"
    monday[7].faculty = "Mr. K. Arun Prasad"
  
    monday[9].subject = "Introduction to EV Vehicle"
    monday[9].faculty = "Mr. Arul Prakash"
  
    monday[10].subject = "AI Tools & Techniques"
    monday[10].faculty = "Mrs. S. Jeevitha"
  
    return result
  }

  function cancelEdit() {
    setEditingId(null)
    setEditingDraft(null)
  }

  function saveEdit() {
    if (!editingId || !editingDraft) return
    setTimetable((prev) => {
      const copy = structuredClone(prev)
      const dayList = copy[selectedDept][selectedYear][selectedDay] as TimeSlot[]
      const idx = dayList.findIndex((s) => s.id === editingId)
      if (idx !== -1) {
        // ensure required fields exist
        dayList[idx] = {
          ...(dayList[idx] as TimeSlot),
          subject: editingDraft.subject ?? dayList[idx].subject,
          faculty: editingDraft.faculty ?? dayList[idx].faculty,
          room: editingDraft.room ?? dayList[idx].room,
          type: (editingDraft.type as SlotType) ?? dayList[idx].type,
        }
      }
      return copy
    })
    setEditingId(null)
    setEditingDraft(null)
  }

  // small utility to render a badge for type
  const renderTypeBadge = (t: SlotType) => {
    if (t === "break") return <Badge variant="outline" className="bg-green-500">BREAK</Badge>
    if (t === "lab") return <Badge variant="secondary" className="bg-red-800 text-white" >LAB</Badge>
    return <Badge>LECTURE</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Filters row (mobile-first stacked) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          <Select value={selectedDept} onValueChange={(v) => setSelectedDept(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={(v) => setSelectedYear(v)}>
            <SelectTrigger className="w-[110px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedDay} onValueChange={(v) => setSelectedDay(v)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {days.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        
      </div>

      {/* Day header */}
      <div className="flex items-center justify-center gap-4">
        <h2 className="text-lg font-semibold">{selectedDept} — {selectedYear} — {selectedDay}</h2>
        {isStaff && <div className="text-xs text-muted-foreground">Viewing as <span className="font-bold bg-red-800 text-white px-1 py-0.5 rounded-full">staff</span></div>}
      </div>

      <div className="space-y-3">
        {schedule.map((slot) => {
          const isEditing = editingId === slot.id
          return (
            <Card key={slot.id}>
              <CardHeader className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div className="text-sm">
                      <div className="font-medium">{slot.start} — {slot.end}</div>
                      <div className="text-xs text-muted-foreground">{slot.type.toUpperCase()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {renderTypeBadge(slot.type)}
                  {isStaff && !isEditing && (
                    <button
                      className="btn-ghost inline-flex items-center gap-1 px-2 py-1 rounded"
                      onClick={() => startEdit(slot)}
                      aria-label="Edit slot"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                {!isEditing ? (
                  <>
                    <div className="mb-2">
                      <div className="font-semibold">{slot.subject || <span className="text-muted-foreground">—</span>}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        {slot.faculty ? (
                          <>
                            <User className="h-3 w-3" /> {slot.faculty}
                          </>
                        ) : null}
                        {slot.room ? (
                          <>
                            <MapPin className="h-3 w-3" /> {slot.room}
                          </>
                        ) : null}
                      </div>
                    </div>
                  </>
                ) : (
                  // Editing UI (inline simple form)
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium">Subject</label>
                      <input
                        value={editingDraft?.subject ?? ""}
                        onChange={(e) => setEditingDraft((d) => ({ ...(d ?? {}), subject: e.target.value }))}
                        className="w-full rounded border px-2 py-1 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium">Faculty</label>
                        <input
                          value={editingDraft?.faculty ?? ""}
                          onChange={(e) => setEditingDraft((d) => ({ ...(d ?? {}), faculty: e.target.value }))}
                          className="w-full rounded border px-2 py-1 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Room</label>
                        <input
                          value={editingDraft?.room ?? ""}
                          onChange={(e) => setEditingDraft((d) => ({ ...(d ?? {}), room: e.target.value }))}
                          className="w-full rounded border px-2 py-1 text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium">Type</label>
                      <Select
                        value={editingDraft?.type ?? slot.type}
                        onValueChange={(v) =>
                          setEditingDraft((d) =>
                            d ? { ...d, type: v as typeof slot.type } : { type: v as typeof slot.type }
                          )
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lecture">Lecture</SelectItem>
                          <SelectItem value="lab">Lab</SelectItem>
                          <SelectItem value="break">Break</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        className="inline-flex items-center gap-2 rounded bg-primary px-3 py-1 text-sm text-white"
                        onClick={saveEdit}
                      >
                        <Check className="h-4 w-4" /> Save
                      </button>
                      <button
                        className="inline-flex items-center gap-2 rounded border px-3 py-1 text-sm"
                        onClick={cancelEdit}
                      >
                        <X className="h-4 w-4" /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      
    </div>
  )
}
