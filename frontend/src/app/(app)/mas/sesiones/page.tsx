import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { effectiveSeconds, localDay, totals, weekStart } from "@/lib/plan/time"
import { formatDate } from "@/lib/format"
import { formatHM } from "@/lib/sessions/format"
import { isoToLocalTime } from "@/lib/sessions/tz"
import { createClient } from "@/lib/supabase/server"
import { DeleteButton } from "./delete-button"
import { SessionForm, type Initial } from "./session-form"

type Row = {
  id: string
  task_id: string | null
  topic_id: string | null
  started_at: string
  ended_at: string | null
  paused_seconds: number
  paused_at: string | null
  origin: string
  notes: string | null
}

export default async function Page({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams
  const supabase = await createClient()
  const { data: auth } = await supabase.auth.getUser()
  const { data: profile } = auth.user ? await supabase.from("profiles").select("timezone").eq("id", auth.user.id).maybeSingle() : { data: null }
  const tz = profile?.timezone ?? "Europe/Madrid"
  const now = new Date()
  const [{ data: rows }, { data: taskRows }] = await Promise.all([
    supabase.from("study_sessions").select("*").order("started_at", { ascending: false }).limit(500),
    supabase.from("tasks").select("id, title, parent_id").order("sort"),
  ])
  const sessions = (rows ?? []) as Row[]
  const parents = new Set((taskRows ?? []).map((t) => t.parent_id).filter(Boolean))
  const leaves = (taskRows ?? []).filter((t) => !parents.has(t.id)).map((t) => ({ id: t.id, title: t.title }))
  const titleOf = new Map((taskRows ?? []).map((t) => [t.id, t.title]))

  const t = totals(sessions, tz, now)
  const today = localDay(now.toISOString(), tz)
  const byDay = new Map<string, Row[]>()
  for (const s of sessions) {
    const d = localDay(s.started_at, tz)
    byDay.set(d, [...(byDay.get(d) ?? []), s])
  }

  const editing = edit ? sessions.find((s) => s.id === edit && s.ended_at) : undefined
  const initial: Initial | undefined = editing
    ? {
        id: editing.id,
        day: localDay(editing.started_at, tz),
        start: isoToLocalTime(editing.started_at, tz),
        end: isoToLocalTime(editing.ended_at!, tz),
        taskId: editing.task_id ?? "",
        notes: editing.notes ?? "",
      }
    : undefined

  return (
    <section className="space-y-12">
      <PageHeader title="Sesiones de estudio" back={{ href: "/mas", label: "Más" }} />

      <Section title="Totales">
        <dl className="grid grid-cols-3 gap-4">
          {[
            ["hoy", t.byDay[today] ?? 0],
            ["esta semana", t.byWeek[weekStart(today)] ?? 0],
            ["en total", t.total],
          ].map(([k, v]) => (
            <div key={k as string} className="flex flex-col-reverse gap-0.5">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="text-2xl font-bold text-foreground">{formatHM(v as number)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={initial ? "Editar sesión" : "Entrada manual"}>
        <SessionForm key={initial?.id ?? "new"} tasks={leaves} today={today} initial={initial} />
      </Section>

      {sessions.length === 0 ? (
        <p className="text-muted-foreground">Aún no hay sesiones.</p>
      ) : (
        [...byDay.entries()].map(([day, list]) => (
          <Section key={day} title={formatDate(day)} aside={formatHM(t.byDay[day] ?? 0)} flush>
            <ul className="divide-y divide-line">
              {list.map((s) => (
                <li key={s.id} className="flex flex-wrap items-start gap-x-4 gap-y-2 px-5 py-4 sm:px-6">
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-bold">
                      {isoToLocalTime(s.started_at, tz)}–{s.ended_at ? isoToLocalTime(s.ended_at, tz) : "en marcha"}
                      <span className="ml-2 font-normal text-muted-foreground">{formatHM(effectiveSeconds(s, now))}</span>
                    </p>
                    <p className="truncate text-foreground">{s.task_id ? (titleOf.get(s.task_id) ?? "Tarea") : "Sin tarea"}</p>
                    {s.notes ? <p className="text-sm text-muted-foreground">{s.notes}</p> : null}
                  </div>
                  {s.origin === "manual" ? <StatusChip tone="muted">manual</StatusChip> : null}
                  {s.ended_at ? (
                    <div className="flex shrink-0 gap-1">
                      <Link href={`/mas/sesiones?edit=${s.id}`} className={buttonVariants({ variant: "ghost", size: "sm", className: "font-normal text-primary" })}>
                        Editar
                      </Link>
                      <DeleteButton id={s.id} />
                    </div>
                  ) : (
                    <Link href="/sesion" className={buttonVariants({ variant: "ghost", size: "sm", className: "font-normal text-primary" })}>Abrir</Link>
                  )}
                </li>
              ))}
            </ul>
          </Section>
        ))
      )}
    </section>
  )
}
