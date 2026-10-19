import Link from "next/link"
import { Annunciator } from "@/components/cockpit/annunciator"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
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
    <section className="space-y-6">
      <PageTitle code="MÁS · SESIONES" title="Sesiones de estudio" back={{ href: "/mas", label: "Más" }} />

      <Panel title="Totales">
        <dl className="grid grid-cols-3 gap-3 text-sm">
          {[
            ["Hoy", t.byDay[today] ?? 0],
            ["Semana", t.byWeek[weekStart(today)] ?? 0],
            ["Total", t.total],
          ].map(([k, v]) => (
            <div key={k as string}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
              <dd className="font-mono tabular-nums text-foreground">{formatHM(v as number)}</dd>
            </div>
          ))}
        </dl>
      </Panel>

      <Panel title={initial ? "Editar sesión" : "Entrada manual"}>
        <SessionForm key={initial?.id ?? "new"} tasks={leaves} today={today} initial={initial} />
      </Panel>

      {sessions.length === 0 ? (
        <p className="text-sm text-muted-foreground">Aún no hay sesiones.</p>
      ) : (
        [...byDay.entries()].map(([day, list]) => (
          <Panel key={day} title={formatDate(day)} aside={formatHM(t.byDay[day] ?? 0)} flush>
            <ul className="divide-y divide-line">
              {list.map((s) => (
                <li key={s.id} className="flex items-start gap-3 px-3 py-2.5 sm:px-4">
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="font-mono text-sm tabular-nums">
                      {isoToLocalTime(s.started_at, tz)}–{s.ended_at ? isoToLocalTime(s.ended_at, tz) : "en marcha"}
                      <span className="ml-2 text-muted-foreground">{formatHM(effectiveSeconds(s, now))}</span>
                    </p>
                    <p className="truncate text-sm text-foreground">{s.task_id ? (titleOf.get(s.task_id) ?? "Tarea") : "Sin tarea"}</p>
                    {s.notes ? <p className="text-sm text-muted-foreground">{s.notes}</p> : null}
                  </div>
                  {s.origin === "manual" ? <Annunciator tone="dim">Manual</Annunciator> : null}
                  {s.ended_at ? (
                    <div className="flex shrink-0 gap-2">
                      <Link href={`/mas/sesiones?edit=${s.id}`} className="inline-flex h-6 items-center border border-line px-2 font-mono text-xs uppercase tracking-wide hover:bg-surface">
                        Editar
                      </Link>
                      <DeleteButton id={s.id} />
                    </div>
                  ) : (
                    <Link href="/sesion" className="text-sm uppercase tracking-wide text-cyan">Abrir ›</Link>
                  )}
                </li>
              ))}
            </ul>
          </Panel>
        ))
      )}
    </section>
  )
}
