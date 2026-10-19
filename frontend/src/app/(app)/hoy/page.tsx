import Link from "next/link"
import { FmaBar } from "@/components/cockpit/fma-bar"
import { Memo, MemoItem } from "@/components/cockpit/memo"
import { Panel } from "@/components/cockpit/panel"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Tape } from "@/components/cockpit/tape"
import { buildPlan } from "@/lib/plan/planner"
import { localDay, totals } from "@/lib/plan/time"
import { loadRoadmap } from "@/lib/roadmap/load"
import { formatMinutes } from "@/lib/sessions/format"
import { createClient } from "@/lib/supabase/server"
import { StartButton } from "./start-button"

type SessionRow = {
  id: string
  task_id: string | null
  topic_id: string | null
  started_at: string
  ended_at: string | null
  paused_seconds: number
  paused_at: string | null
}

export default async function Page() {
  const supabase = await createClient()
  const [{ roadmap }, { data: auth }] = await Promise.all([loadRoadmap(), supabase.auth.getUser()])
  const { data: profile } = auth.user
    ? await supabase.from("profiles").select("target_date, weekly_hours, timezone").eq("id", auth.user.id).maybeSingle()
    : { data: null }
  const tz = profile?.timezone ?? "Europe/Madrid"
  const now = new Date()
  const since = new Date(now.getTime() - 14 * 86400000).toISOString()
  const { data: rows } = await supabase
    .from("study_sessions")
    .select("id, task_id, topic_id, started_at, ended_at, paused_seconds, paused_at")
    .gte("started_at", since)
  const sessions = (rows ?? []) as SessionRow[]
  const open = sessions.find((s) => s.ended_at === null) ?? null
  const today = localDay(now.toISOString(), tz)
  const plan = buildPlan({
    today,
    tz,
    weeklyHours: profile?.weekly_hours ?? 10,
    targetDate: profile?.target_date ?? null,
    roadmap,
    secondsByDay: totals(sessions, tz, now).byDay,
  })

  const phaseOf = new Map(roadmap.phases.map((p) => [p.id, p]))
  const current = roadmap.phases.find((p) => p.number === roadmap.currentPhase) ?? null
  const nowTask = plan.now
  const nowPhase = nowTask ? phaseOf.get(nowTask.phase_id) : undefined
  const pct = plan.todayMinutes > 0 ? (plan.doneTodayMinutes / plan.todayMinutes) * 100 : 100
  const f = plan.forecast
  const fTone = f.status === "llegas" ? "green" : f.status === "justo" ? "amber" : f.status === "no_llegas" ? "red" : "dim"

  return (
    <section className="space-y-6">
      <h1 className="sr-only">Hoy</h1>
      <div className="-mx-4 md:mx-0 md:border-x md:border-line">
        <FmaBar
          todayMinutes={plan.todayMinutes}
          phase={current}
          next={nowTask?.title ?? roadmap.next[0]?.title ?? null}
          target={profile?.target_date ?? null}
        />
      </div>

      <Panel title="Ahora">
        {nowTask ? (
          <div className="space-y-3">
            <p className="leading-snug text-magenta">{nowTask.title}</p>
            <p className="text-sm text-muted-foreground tabular-nums">
              {nowPhase ? `F${nowPhase.number} · ${nowPhase.title} · ` : ""}
              {nowTask.est_minutes ? `${formatMinutes(nowTask.est_minutes)} estimados` : "Sin estimación"}
            </p>
            {open ? (
              <Link href="/sesion" className="inline-flex h-11 items-center border border-cyan px-4 font-mono text-sm uppercase tracking-wide text-cyan hover:bg-surface">
                [ Continuar sesión ]
              </Link>
            ) : (
              <StartButton taskId={nowTask.id} topicId={nowTask.topic_id} />
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No hay tareas pendientes disponibles.</p>
        )}
      </Panel>

      <Panel title="Hoy" aside={`${plan.doneTodayMinutes} / ${plan.todayMinutes} min`}>
        <Tape value={pct} label="Progreso de hoy" tone="green" />
      </Panel>

      {plan.behindMinutes > 0 ? (
        <Panel title="Atrasado" className="border-amber">
          <p className="font-mono text-amber tabular-nums">{formatMinutes(plan.behindMinutes)} por recuperar esta semana</p>
        </Panel>
      ) : null}

      <Panel title="Siguiente" aside={plan.next.length > 0 ? `${plan.next.length}` : undefined} flush>
        {plan.next.length === 0 ? (
          <p className="px-3 py-2.5 text-sm text-muted-foreground sm:px-4">No hay más tareas pendientes disponibles.</p>
        ) : (
          <Memo>
            {plan.next.map((t, i) => {
              const ph = phaseOf.get(t.phase_id)
              return (
                <MemoItem
                  key={t.id}
                  state={i === 0 ? "siguiente" : "disponible"}
                  href={ph ? `/ruta/${ph.number}` : undefined}
                  detail={ph ? `F${ph.number} · ${ph.title}` : undefined}
                  meta={t.status === "en_curso" ? <Annunciator tone="green">En curso</Annunciator> : undefined}
                >
                  {t.title}
                </MemoItem>
              )
            })}
          </Memo>
        )}
      </Panel>

      <Panel title="Previsión">
        {f.status === "sin_objetivo" ? (
          <p className="text-sm text-muted-foreground">Sin fecha objetivo. Quedan {formatMinutes(f.remainingMinutes)} de tareas.</p>
        ) : (
          <div className="space-y-1">
            <Annunciator tone={fTone}>{f.status === "llegas" ? "Llegas" : f.status === "justo" ? "Justo" : "No llegas"}</Annunciator>
            <p className="text-sm text-muted-foreground tabular-nums">
              Quedan {formatMinutes(f.remainingMinutes)}
              {f.weeksLeft != null ? ` en ${f.weeksLeft.toFixed(1)} semanas` : ""}.
              {f.neededWeeklyHours != null ? ` Necesitarías ${f.neededWeeklyHours.toFixed(1)} h/semana.` : ""}
            </p>
          </div>
        )}
      </Panel>

      <Panel title="Referencia" flush>
        <Memo>
          <MemoItem state="disponible" href="/guia" detail="Requisitos, proceso, calendario y todo lo necesario para empezar desde cero.">
            Guía del proceso
          </MemoItem>
          <MemoItem state="disponible" href="/guia/examen" detail="Cuánto pesa cada prueba, qué mínimo pide y cómo prepararla.">
            El examen por dentro
          </MemoItem>
        </Memo>
      </Panel>
    </section>
  )
}
