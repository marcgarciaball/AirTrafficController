import Link from "next/link"
import type { ReactNode } from "react"
import { ArcProgress } from "@/components/ui-torre/arc-progress"
import { Checklist, ChecklistItem, LinkRow } from "@/components/ui-torre/checklist"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Card, Section } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { TEXT, type Tone } from "@/components/ui-torre/tones"
import { UtcClock } from "@/components/ui-torre/utc-clock"
import { buttonVariants } from "@/components/ui/button"
import { loose } from "@/lib/bloques/db"
import { loadBlockStats } from "@/lib/bloques/progress"
import { dailyQueue } from "@/lib/cards/queue"
import { DAILY_ENGLISH_MINUTES, skillOfDay, type EnglishSkill } from "@/lib/english/plan"
import { SKILL_RESOURCES } from "@/lib/english/resources"
import { buildSession } from "@/lib/plan/session"
import { buildPlan } from "@/lib/plan/planner"
import { localDay, streak, totals } from "@/lib/plan/time"
import { loadRoadmap } from "@/lib/roadmap/load"
import { formatMinutes } from "@/lib/sessions/format"
import { createClient } from "@/lib/supabase/server"
import { cn } from "@/lib/utils"
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

const ENGLISH_LABEL: Record<EnglishSkill, string> = {
  reading_use: "Reading and Use of English",
  writing: "Writing",
  listening: "Listening",
  speaking: "Speaking",
}

const FORECAST: Record<string, { text: string; tone: Tone }> = {
  llegas: { text: "Llegas", tone: "success" },
  justo: { text: "Justo", tone: "warning" },
  no_llegas: { text: "No llegas", tone: "danger" },
  sin_objetivo: { text: "Sin fecha", tone: "muted" },
}

/** Cifra grande con su etiqueta en minúsculas debajo. */
function Figure({ value, unit, label, tone = "default", word = false }: { value: ReactNode; unit?: string; label: string; tone?: Tone; word?: boolean }) {
  return (
    <div className="min-w-0 space-y-1">
      <p className={cn("font-bold", word ? "text-2xl sm:leading-10" : "text-3xl", TEXT[tone])}>
        {value}
        {unit ? <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span> : null}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
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
  const byDay = totals(sessions, tz, now).byDay
  const plan = buildPlan({
    today,
    tz,
    weeklyHours: profile?.weekly_hours ?? 10,
    targetDate: profile?.target_date ?? null,
    roadmap,
    secondsByDay: byDay,
  })

  const phaseOf = new Map(roadmap.phases.map((p) => [p.id, p]))
  const nowTask = plan.now
  const nowPhase = nowTask ? phaseOf.get(nowTask.phase_id) : undefined
  const pct = plan.todayMinutes > 0 ? (plan.doneTodayMinutes / plan.todayMinutes) * 100 : 100
  const f = plan.forecast
  const fc = FORECAST[f.status] ?? FORECAST.sin_objetivo
  const days = streak(byDay, today)
  const dateLabel = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(now)
  const db = loose(supabase)
  const [{ data: blockRows }, { data: dueRows }, { data: wrong }, stats] = await Promise.all([
    db.from("study_blocks").select("id, sort, topics!inner(number)").order("sort").limit(500),
    db.from("user_cards").select("id, due, suspended").eq("suspended", false).limit(3000),
    db.from("block_answers").select("question_id").eq("correct", false).limit(200),
    loadBlockStats(db),
  ])
  const blocks = (blockRows ?? []) as unknown as { id: string; topics: { number: number } }[]
  const topicOf = new Map(blocks.map((b) => [b.id, b.topics.number]))
  const dueCards = dailyQueue(dueRows ?? [], now, tz, 1e6).length
  const session = buildSession({
    todayMinutes: plan.todayMinutes,
    dueCards,
    newBlocks: blocks.filter((b) => !stats.get(b.id)?.status || stats.get(b.id)?.status === "en_curso").map((b) => ({ id: b.id, minutes: 5 })),
    weakBlocks: blocks.filter((b) => (stats.get(b.id)?.mastery ?? 100) < 70).map((b) => ({ id: b.id })),
    failedQuestions: new Set((wrong ?? []).map((w: { question_id: string }) => w.question_id)).size,
  })
  const firstBlock = session.weak[0] ?? session.blocks[0]
  const startHref = session.cards > 0 ? "/flashback" : firstBlock ? `/estudio/${topicOf.get(firstBlock)}/b/${firstBlock}` : null
  const engSkill = skillOfDay(today)
  const later = plan.next.filter((t) => t.id !== nowTask?.id)

  return (
    <div className="space-y-12">
      <header className="flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Hoy</h1>
          <p className="text-muted-foreground first-letter:uppercase">{dateLabel}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Link href="/guia/plazas" className={buttonVariants({ variant: "outline", size: "sm" })}>¿Hay plazas?</Link>
          <UtcClock className="font-mono text-sm text-muted-foreground" />
        </div>
      </header>

      <Card className="space-y-6">
        <h2 className="sr-only">Resumen</h2>
        <div className="flex items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-1">
            <ArcProgress value={roadmap.globalPct} label="Avance global" tone="primary" />
            <p className="text-sm text-muted-foreground">avance global</p>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-5 min-[420px]:grid-cols-2 lg:grid-cols-3">
            <Figure value={plan.doneTodayMinutes} unit={`de ${plan.todayMinutes} min`} label="minutos de hoy" />
            <Figure value={days} unit={days === 1 ? "día" : "días"} label="racha de estudio" />
            <Figure value={fc.text} label="previsión" tone={fc.tone} word />
          </div>
        </div>
        <ProgressBar value={pct} label="Progreso de hoy" tone="success" />
      </Card>

      <section aria-labelledby="ahora" className="relative rounded-lg border border-guide/40 bg-card p-5 shadow-sm sm:p-6">
        <span aria-hidden="true" className="absolute inset-y-5 left-0 w-1 rounded-r-full bg-guide sm:inset-y-6" />
        <h2 id="ahora" className="flex items-center gap-2 text-sm text-guide">
          <span aria-hidden="true" className="size-2.5 rotate-45 rounded-[2px] bg-guide" />
          Lo siguiente que te toca
        </h2>
        {nowTask ? (
          <div className="mt-3 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xl font-bold">{nowTask.title}</p>
              <p className="text-muted-foreground">
                {nowPhase ? `Fase ${nowPhase.number} · ${nowPhase.title} · ` : ""}
                {nowTask.est_minutes ? `unos ${formatMinutes(nowTask.est_minutes)}` : "sin estimación"}
              </p>
            </div>
            {open ? (
              <Link href="/sesion" className={buttonVariants({ size: "lg" })}>
                Continuar sesión
              </Link>
            ) : (
              <StartButton taskId={nowTask.id} topicId={nowTask.topic_id} />
            )}
          </div>
        ) : (
          <p className="mt-3 text-muted-foreground">No hay tareas pendientes disponibles.</p>
        )}
      </section>

      {startHref ? (
        <Section title="Sesión de hoy" plain>
          <Card className="space-y-4">
            <p className="text-lg">
              {session.blocks.length + session.weak.length} {session.blocks.length + session.weak.length === 1 ? "bloque" : "bloques"} · {session.cards} {session.cards === 1 ? "tarjeta" : "tarjetas"} · {session.reviewQuestions} {session.reviewQuestions === 1 ? "repaso" : "repasos"} (~{formatMinutes(session.minutes)})
            </p>
            <Link href={startHref} className={buttonVariants({ size: "lg" })}>
              Empezar
            </Link>
          </Card>
        </Section>
      ) : null}

      <Section title="Inglés de hoy" plain>
        <Card className="space-y-3">
          <p className="text-lg">
            {DAILY_ENGLISH_MINUTES} min · {ENGLISH_LABEL[engSkill]}
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {SKILL_RESOURCES[engSkill].map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                {r.label}
              </a>
            ))}
          </p>
          <Link href="/ingles" className={buttonVariants({ variant: "outline" })}>
            Plan de inglés
          </Link>
        </Card>
      </Section>

      {plan.behindMinutes > 0 ? (
        <p role="status" className="rounded-lg border border-warning/40 bg-card px-5 py-4 text-warning sm:px-6">
          Vas con retraso: {formatMinutes(plan.behindMinutes)} por recuperar esta semana.
        </p>
      ) : null}

      <Section title="Después" aside={later.length > 0 ? `${later.length} ${later.length === 1 ? "tarea" : "tareas"}` : undefined} flush>
        {later.length === 0 ? (
          <p className="px-5 py-4 text-muted-foreground sm:px-6">No hay más tareas pendientes disponibles.</p>
        ) : (
          <Checklist>
            {later.map((t) => {
              const ph = phaseOf.get(t.phase_id)
              return (
                <ChecklistItem
                  key={t.id}
                  state="disponible"
                  href={ph ? `/ruta/${ph.number}` : undefined}
                  detail={ph ? `Fase ${ph.number} · ${ph.title}` : undefined}
                  meta={t.status === "en_curso" ? <StatusChip tone="success">en curso</StatusChip> : undefined}
                >
                  {t.title}
                </ChecklistItem>
              )
            })}
          </Checklist>
        )}
      </Section>

      <Section title="Previsión" plain>
        <p className="max-w-prose text-muted-foreground">
          {f.status === "sin_objetivo" ? (
            <>
              Aún no tienes fecha objetivo. Quedan {formatMinutes(f.remainingMinutes)} de tareas.{" "}
              <Link href="/mas/perfil" className="text-primary underline">Fijar una fecha</Link>
            </>
          ) : (
            <>
              Quedan {formatMinutes(f.remainingMinutes)}
              {f.weeksLeft != null ? ` en ${f.weeksLeft.toFixed(1)} semanas` : ""}.
              {f.neededWeeklyHours != null ? ` Necesitarías ${f.neededWeeklyHours.toFixed(1)} horas a la semana.` : ""}
            </>
          )}
        </p>
        {f.weeksLeft != null && f.minWeeks > f.weeksLeft ? (
          <p role="status" className="mt-3 max-w-prose text-warning">
            Aviso: las fases pendientes piden como mínimo {f.minWeeks} semanas (con sus dependencias) y solo quedan {f.weeksLeft.toFixed(1)} hasta la fecha. Las horas no lo compensan: revisa la fecha o el alcance.
          </p>
        ) : null}
      </Section>

      <Section title="Para consultar" flush>
        <ul className="divide-y divide-line">
          <LinkRow href="/ruta" detail="Las fases del plan y lo que llevas hecho en cada una.">
            Ruta
          </LinkRow>
          <LinkRow href="/guia" detail="Requisitos, proceso, calendario y todo lo necesario para empezar desde cero.">
            Guía del proceso
          </LinkRow>
          <LinkRow href="/guia/examen" detail="Cuánto pesa cada prueba, qué mínimo pide y cómo prepararla.">
            El examen por dentro
          </LinkRow>
        </ul>
      </Section>
    </div>
  )
}
