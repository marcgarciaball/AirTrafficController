import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import type { SupabaseClient } from "@supabase/supabase-js"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { monthGrid, monthLabel, parseMonth, shiftMonth } from "@/lib/calendar/month"
import { formatDate } from "@/lib/format"
import { buildPlan } from "@/lib/plan/planner"
import { localDay, totals } from "@/lib/plan/time"
import { loadRoadmap } from "@/lib/roadmap/load"
import { isoToLocalTime } from "@/lib/sessions/tz"
import { minutesByDay } from "@/lib/stats/aggregate"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
import { ReminderActions } from "./reminder-actions"
import { ReminderForm } from "./reminder-form"

const KIND: Record<string, string> = {
  publicacion: "Publicación",
  inscripcion_inicio: "Inicio de inscripción",
  inscripcion_fin: "Fin de inscripción",
  fase1: "Fase 1",
  fase2: "Fase 2",
  fase3: "Fase 3",
  resultado: "Resultado",
}
const DOW = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

type Ev = { id: string; date: string; kind: string; is_estimate: boolean; verified: boolean }
type Rem = { id: string; title: string; due_at: string; done: boolean }

export default async function Page({ searchParams }: { searchParams: Promise<{ m?: string }> }) {
  const { m } = await searchParams
  const db = (await createClient()) as unknown as SupabaseClient
  const { data: auth } = await db.auth.getUser()
  const { data: profile } = auth.user
    ? await db.from("profiles").select("timezone, weekly_hours, target_date").eq("id", auth.user.id).maybeSingle()
    : { data: null }
  const tz: string = profile?.timezone ?? "Europe/Madrid"
  const now = new Date()
  const today = localDay(now.toISOString(), tz)
  const month = parseMonth(m, today)
  const grid = monthGrid(month)

  const [{ roadmap }, { data: sessions }, { data: events }, { data: reminders }] = await Promise.all([
    loadRoadmap(),
    db.from("study_sessions").select("task_id, topic_id, started_at, ended_at, paused_seconds, paused_at"),
    db.from("exam_call_events").select("id, date, kind, is_estimate, verified").order("date"),
    db.from("reminders").select("id, title, due_at, done").order("due_at"),
  ])
  const t = totals(sessions ?? [], tz, now)
  const done = minutesByDay(t.byDay)
  const weeklyHours = profile?.weekly_hours ? Number(profile.weekly_hours) : 0
  // El plan solo describe la semana actual: fuera de ella no hay minutos planificados.
  const plan = buildPlan({ today, tz, weeklyHours, targetDate: profile?.target_date ?? null, roadmap, secondsByDay: t.byDay })
  const planned = Object.fromEntries(plan.week.map((w) => [w.day, w.plannedMinutes]))

  const evs = (events ?? []) as Ev[]
  const rems = ((reminders ?? []) as Rem[]).map((r) => ({ ...r, day: localDay(r.due_at, tz) }))
  const evByDay = new Map<string, Ev[]>()
  for (const e of evs) evByDay.set(e.date, [...(evByDay.get(e.date) ?? []), e])
  const remByDay = new Map<string, number>()
  for (const r of rems) if (!r.done) remByDay.set(r.day, (remByDay.get(r.day) ?? 0) + 1)
  const monthEvents = evs.filter((e) => e.date.startsWith(month))
  const upcoming = rems.filter((r) => !r.done || r.day.startsWith(month))

  return (
    <section className="space-y-12">
      <PageHeader title="Calendario" back={{ href: "/mas", label: "Más" }} />

      <Section title={monthLabel(month)} aside={<span className="flex items-center gap-1">
        <Link href={`/mas/calendario?m=${shiftMonth(month, -1)}`} className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="Mes anterior"><ChevronLeft aria-hidden="true" className="size-5" /></Link>
        <Link href="/mas/calendario" className={buttonVariants({ variant: "outline", size: "sm" })}>Hoy</Link>
        <Link href={`/mas/calendario?m=${shiftMonth(month, 1)}`} className={buttonVariants({ variant: "ghost", size: "icon" })} aria-label="Mes siguiente"><ChevronRight aria-hidden="true" className="size-5" /></Link>
      </span>}>
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr>{DOW.map((d) => (
              <th key={d} scope="col" className="pb-2 text-sm font-normal text-muted-foreground">
                <span aria-hidden="true" className="sm:hidden">{d === "Miércoles" ? "X" : d[0]}</span>
                <span className="max-sm:sr-only">{d}</span>
              </th>
            ))}</tr>
          </thead>
          <tbody>
            {grid.map((week, i) => (
              <tr key={i}>
                {week.map(({ day, inMonth }) => {
                  const d = done[day] ?? 0
                  const p = planned[day] ?? 0
                  const hasEv = evByDay.has(day)
                  const rem = remByDay.get(day) ?? 0
                  return (
                    <td key={day} className={cn("h-20 border p-1.5 align-top", !inMonth && "text-muted-foreground/60 [&>*]:opacity-50", day === today && "bg-primary/[0.06]")}>
                      <span className={cn("inline-flex size-6 items-center justify-center rounded-full", day === today ? "bg-primary font-bold text-primary-foreground" : "text-foreground")}>{Number(day.slice(8))}</span>
                      <span className="mt-0.5 block text-xs leading-4">
                        {d > 0 ? <span className="block font-bold text-success">{d} min</span> : null}
                        {p > 0 ? <span className="block text-muted-foreground">plan {p}</span> : null}
                      </span>
                      <span className="mt-1 flex gap-1">
                        {hasEv ? <span className="size-2 rotate-45 rounded-[1px] bg-warning" title="Hito de convocatoria"><span className="sr-only">Hito</span></span> : null}
                        {rem > 0 ? <span className="size-2 rounded-full bg-primary" title="Recordatorio"><span className="sr-only">Recordatorio</span></span> : null}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <li><span className="font-bold text-success">min</span>: minutos hechos</li>
          <li>plan: minutos planificados esta semana ({weeklyHours > 0 ? `${weeklyHours} horas a la semana` : "sin horas definidas"})</li>
          <li className="flex items-center gap-2"><span aria-hidden="true" className="size-2 rotate-45 rounded-[1px] bg-warning" /> hito de convocatoria</li>
          <li className="flex items-center gap-2"><span aria-hidden="true" className="size-2 rounded-full bg-primary" /> recordatorio</li>
        </ul>
      </Section>

      <Section title="Hitos del mes" flush>
        {monthEvents.length === 0 ? (
          <p className="px-5 py-4 text-muted-foreground sm:px-6">Sin hitos de convocatoria este mes.</p>
        ) : (
          <ul className="divide-y divide-line">
            {monthEvents.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-4 sm:px-6">
                <span className="w-24 shrink-0 text-sm text-muted-foreground">{formatDate(e.date)}</span>
                <span className="flex-1 font-bold">{KIND[e.kind] ?? e.kind}</span>
                {e.is_estimate ? <StatusChip tone="warning">estimación</StatusChip> : null}
                {!e.verified ? <StatusChip tone="warning">pendiente de verificar</StatusChip> : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Recordatorios" flush>
        {upcoming.length === 0 ? (
          <p className="px-5 py-4 text-muted-foreground sm:px-6">Sin recordatorios.</p>
        ) : (
          <ul className="divide-y divide-line">
            {upcoming.map((r) => (
              <li key={r.id} className="flex items-center gap-4 px-5 py-3 sm:px-6">
                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className={cn("truncate", r.done ? "text-muted-foreground line-through" : "text-foreground")}>{r.title}</p>
                  <p className="text-sm text-muted-foreground">{formatDate(r.day)} {isoToLocalTime(r.due_at, tz)}</p>
                </div>
                <ReminderActions id={r.id} done={r.done} />
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Nuevo recordatorio">
        <ReminderForm today={today} />
      </Section>
    </section>
  )
}
