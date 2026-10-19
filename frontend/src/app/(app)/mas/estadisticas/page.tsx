import type { SupabaseClient } from "@supabase/supabase-js"
import { Gauge } from "@/components/cockpit/gauge"
import { PageTitle } from "@/components/cockpit/page-title"
import { Panel } from "@/components/cockpit/panel"
import { Tape } from "@/components/cockpit/tape"
import { QuizLine, WeeklyBars } from "@/components/stats/charts"
import { localDay, streak, totals } from "@/lib/plan/time"
import { quizSeries, subjectDistribution, weeklyGoal, weeklySeries, type Attempt } from "@/lib/stats/aggregate"
import { formatHM } from "@/lib/sessions/format"
import { createClient } from "@/lib/supabase/server"

const SUBJECTS = [
  ["temario", "Temario", "green"],
  ["aptitudes", "Aptitudes", "cyan"],
  ["ingles", "Inglés", "amber"],
  ["otras", "Otras", "dim"],
] as const

export default async function Page() {
  const db = (await createClient()) as unknown as SupabaseClient
  const { data: auth } = await db.auth.getUser()
  const [{ data: profile }, { data: sessions }, { data: attempts }, { data: tasks }, { data: phases }] = await Promise.all([
    auth.user ? db.from("profiles").select("timezone, weekly_hours").eq("id", auth.user.id).maybeSingle() : Promise.resolve({ data: null }),
    db.from("study_sessions").select("task_id, topic_id, started_at, ended_at, paused_seconds, paused_at"),
    db.from("quiz_attempts").select("mode, started_at, finished_at, total, correct"),
    db.from("tasks").select("id, phase_id"),
    db.from("phases").select("id, number"),
  ])
  const tz: string = profile?.timezone ?? "Europe/Madrid"
  const weeklyHours: number | null = profile?.weekly_hours ? Number(profile.weekly_hours) : null
  const now = new Date()
  const today = localDay(now.toISOString(), tz)
  const list = sessions ?? []

  const t = totals(list, tz, now)
  const bars = weeklySeries(t.byWeek, today, 12)
  const goal = weeklyGoal(t.byWeek, today, weeklyHours)
  const days = streak(t.byDay, today)

  const phaseNumber = new Map((phases ?? []).map((p: { id: string; number: number }) => [p.id, p.number]))
  const phaseOfTask: Record<string, number> = {}
  for (const k of (tasks ?? []) as { id: string; phase_id: string }[]) {
    const n = phaseNumber.get(k.phase_id)
    if (n !== undefined) phaseOfTask[k.id] = n
  }
  const split = subjectDistribution(list, phaseOfTask, now)
  const splitTotal = Object.values(split).reduce((a, b) => a + b, 0)
  const points = quizSeries((attempts ?? []) as Attempt[])

  return (
    <section className="space-y-6">
      <PageTitle code="MÁS · ESTADÍSTICAS" title="Estadísticas" back={{ href: "/mas", label: "Más" }} />

      <Panel title="Resumen">
        <dl className="grid grid-cols-3 gap-3 text-sm">
          {[
            ["Total", formatHM(t.total)],
            ["Esta semana", formatHM(goal.doneHours * 3600)],
            ["Racha", `${days} ${days === 1 ? "día" : "días"}`],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt>
              <dd className="font-mono tabular-nums text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">La racha cuenta días seguidos con al menos 1 minuto de estudio.</p>
      </Panel>

      <Panel title="Objetivo semanal">
        {goal.goalHours > 0 ? (
          <div className="flex items-center gap-4">
            <Gauge value={Math.min(100, goal.pct)} label="Semana" tone={goal.pct >= 100 ? "green" : "cyan"} />
            <p className="font-mono text-sm tabular-nums text-foreground">
              {goal.doneHours.toFixed(1)} / {goal.goalHours} h
              <span className="block text-xs text-muted-foreground">{goal.pct} % del objetivo</span>
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Define tus horas semanales en el perfil para compararlas.</p>
        )}
      </Panel>

      <Panel title="Horas por semana" aside="12 semanas">
        <WeeklyBars bars={bars} goalHours={goal.goalHours} />
        <p className="mt-2 text-xs text-muted-foreground">Semana actual en cyan{goal.goalHours > 0 ? "; la línea discontinua es tu objetivo" : ""}.</p>
      </Panel>

      <Panel title="Por materia">
        {splitTotal === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no hay sesiones.</p>
        ) : (
          <ul className="space-y-3">
            {SUBJECTS.map(([key, label, tone]) => {
              const pct = (split[key] / splitTotal) * 100
              return (
                <li key={key} className="space-y-1">
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="uppercase tracking-wide">{label}</span>
                    <span className="font-mono tabular-nums text-muted-foreground">{formatHM(split[key])} · {Math.round(pct)} %</span>
                  </div>
                  <Tape value={pct} label={label} tone={tone === "dim" ? "white" : tone} />
                </li>
              )
            })}
          </ul>
        )}
        <p className="mt-3 text-xs text-muted-foreground">Según la fase de la tarea: F2 temario, F3 aptitudes y F4 inglés.</p>
      </Panel>

      <Panel title="Notas de los tests">
        {points.length === 0 ? (
          <p className="text-sm text-muted-foreground">Aún no has terminado ningún test.</p>
        ) : (
          <>
            <QuizLine points={points} />
            <p className="mt-2 text-xs text-muted-foreground">% de aciertos. Los simulacros en cyan, los tests por tema en green.</p>
          </>
        )}
      </Panel>
    </section>
  )
}
