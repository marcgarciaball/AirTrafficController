import type { SupabaseClient } from "@supabase/supabase-js"
import { PageHeader } from "@/components/ui-torre/page-header"
import { Section } from "@/components/ui-torre/section"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { QuizLine, WeeklyBars } from "@/components/stats/charts"
import { localDay, streak, totals } from "@/lib/plan/time"
import { quizSeries, subjectDistribution, weeklyGoal, weeklySeries, type Attempt } from "@/lib/stats/aggregate"
import { formatHM } from "@/lib/sessions/format"
import { createClient } from "@/lib/supabase/server"

const SUBJECTS = [
  ["temario", "Temario", "success"],
  ["aptitudes", "Aptitudes", "primary"],
  ["ingles", "Inglés", "warning"],
  ["otras", "Otras", "muted"],
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
    <section className="space-y-12">
      <PageHeader title="Estadísticas" back={{ href: "/mas", label: "Más" }} />

      <Section title="Resumen">
        <dl className="grid grid-cols-3 gap-4">
          {[
            ["en total", formatHM(t.total)],
            ["esta semana", formatHM(goal.doneHours * 3600)],
            ["racha", `${days} ${days === 1 ? "día" : "días"}`],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col-reverse gap-0.5">
              <dt className="text-sm text-muted-foreground">{k}</dt>
              <dd className="text-2xl font-bold text-foreground">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-muted-foreground">La racha cuenta días seguidos con al menos 1 minuto de estudio.</p>
      </Section>

      <Section title="Objetivo semanal">
        {goal.goalHours > 0 ? (
          <div className="space-y-4">
            <p className="text-3xl font-bold">
              {goal.doneHours.toFixed(1)}
              <span className="ml-1 text-base font-normal text-muted-foreground">de {goal.goalHours} horas · {goal.pct} % del objetivo</span>
            </p>
            <ProgressBar value={Math.min(100, goal.pct)} label="Objetivo semanal" tone={goal.pct >= 100 ? "success" : "primary"} />
          </div>
        ) : (
          <p className="text-muted-foreground">Define tus horas semanales en el perfil para compararlas.</p>
        )}
      </Section>

      <Section title="Horas por semana" aside="12 semanas">
        <WeeklyBars bars={bars} goalHours={goal.goalHours} />
        <p className="mt-4 text-sm text-muted-foreground">La barra más intensa es la semana actual{goal.goalHours > 0 ? "; la línea discontinua es tu objetivo" : ""}.</p>
      </Section>

      <Section title="Por materia">
        {splitTotal === 0 ? (
          <p className="text-muted-foreground">Aún no hay sesiones.</p>
        ) : (
          <ul className="space-y-5">
            {SUBJECTS.map(([key, label, tone]) => {
              const pct = (split[key] / splitTotal) * 100
              return (
                <li key={key} className="space-y-2">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-bold">{label}</span>
                    <span className="text-sm text-muted-foreground">{formatHM(split[key])} · {Math.round(pct)} %</span>
                  </div>
                  <ProgressBar value={pct} label={label} tone={tone === "muted" ? "default" : tone} />
                </li>
              )
            })}
          </ul>
        )}
        <p className="mt-5 text-sm text-muted-foreground">Según la fase de la tarea: fase 2 temario, fase 3 aptitudes y fase 4 inglés.</p>
      </Section>

      <Section title="Notas de los tests">
        {points.length === 0 ? (
          <p className="text-muted-foreground">Aún no has terminado ningún test.</p>
        ) : (
          <>
            <QuizLine points={points} />
            <p className="mt-4 text-sm text-muted-foreground">Porcentaje de aciertos. Puntos rellenos: simulacros; puntos huecos: tests por tema.</p>
          </>
        )}
      </Section>
    </section>
  )
}
