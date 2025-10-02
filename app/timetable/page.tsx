import { TimetableViewer } from "@/components/timetable-viewer"
import { Calendar, Clock, BookOpen } from "lucide-react"

export const metadata = {
  title: "Class Timetable | CMS",
  description: "View and edit weekly class schedule",
}

export default function TimetablePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        <section className="bg-blue-900 py-6 text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">Class Timetable</h1>
              <p className="text-sm text-primary-foreground/90">
                Staff can edit entries directly.
              </p>
            </div>
          </div>
        </section>

        {/* Quick info */}
        <section className="border-b border-border bg-secondary/10 py-4">
          <div className="container">
            <div className="flex justify-around gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Year</div>
                  <div className="text-xs text-muted-foreground">2025-26 (Odd)</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">Timings</div>
                  <div className="text-xs text-muted-foreground">08:30 - 15:30</div>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* Viewer */}
        <section className="py-8">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <TimetableViewer />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
