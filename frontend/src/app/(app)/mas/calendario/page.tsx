import Link from "next/link"
import type { SupabaseClient } from "@supabase/supabase-js"
import { Annunciator } from "@/components/cockpit/annunciator"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
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
const DOW = ["L", "M", "X", "J", "V", "S", "D"]

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
    <section className="space-y-6">
      <PageTitle code="MÁS · CALENDARIO" title="Calendario" back={{ href: "/mas", label: "Más" }} />

      <Panel title={monthLabel(month)} aside={<span className="flex gap-3">
        <Link href={`/mas/calendario?m=${shiftMonth(month, -1)}`} className="text-cyan hover:underline" aria-label="Mes anterior">‹</Link>
        <Link href="/mas/calendario" className="text-cyan hover:underline">Hoy</Link>
        <Link href={`/mas/calendario?m=${shiftMonth(month, 1)}`} className="text-cyan hover:underline" aria-label="Mes siguiente">›</Link>
      </span>}>
        <table className="w-full table-fixed border-collapse text-xs">
          <thead>
            <tr>{DOW.map((d) => <th key={d} scope="col" className="pb-1 font-normal uppercase text-muted-foreground">{d}</th>)}</tr>
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
                    <td key={day} className={cn("h-16 border border-line p-1 align-top", !inMonth && "opacity-40", day === today && "outline outline-1 outline-cyan")}>
                      <span className="font-mono tabular-nums text-foreground">{Number(day.slice(8))}</span>
                      <span className="mt-0.5 block font-mono tabular-nums">
                        {d > 0 ? <span className="block text-green">{d}m</span> : null}
                        {p > 0 ? <span className="block text-magenta">{p}m</span> : null}
                      </span>
                      <span className="flex gap-1">
                        {hasEv ? <span className="text-amber" title="Hito de convocatoria">◆<span className="sr-only">Hito</span></span> : null}
                        {rem > 0 ? <span className="text-cyan" title="Recordatorio">●<span className="sr-only">Recordatorio</span></span> : null}
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-muted-foreground">
          <span className="text-green">Verde</span>: minutos hechos. <span className="text-magenta">Magenta</span>: planificados esta semana ({weeklyHours > 0 ? `${weeklyHours} h/semana` : "sin horas definidas"}). <span className="text-amber">◆</span> hito. <span className="text-cyan">●</span> recordatorio.
        </p>
      </Panel>

      <Panel title="Hitos del mes" flush>
        {monthEvents.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-muted-foreground">Sin hitos de convocatoria este mes.</p>
        ) : (
          <ul className="divide-y divide-line">
            {monthEvents.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center gap-2 px-3 py-2.5 sm:px-4">
                <span className="font-mono text-sm tabular-nums">{formatDate(e.date)}</span>
                <span className="flex-1 text-sm">{KIND[e.kind] ?? e.kind}</span>
                {e.is_estimate ? <Annunciator tone="amber">Estimación</Annunciator> : null}
                {!e.verified ? <Annunciator tone="amber">Pendiente de verificar</Annunciator> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Recordatorios" flush>
        {upcoming.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-muted-foreground">Sin recordatorios.</p>
        ) : (
          <ul className="divide-y divide-line">
            {upcoming.map((r) => (
              <li key={r.id} className="flex items-center gap-3 px-3 py-2.5 sm:px-4">
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-sm", r.done ? "text-green" : "text-foreground")}>{r.done ? "✓ " : ""}{r.title}</p>
                  <p className="font-mono text-xs tabular-nums text-muted-foreground">{formatDate(r.day)} {isoToLocalTime(r.due_at, tz)}</p>
                </div>
                <ReminderActions id={r.id} done={r.done} />
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Nuevo recordatorio">
        <ReminderForm today={today} />
      </Panel>
    </section>
  )
}
