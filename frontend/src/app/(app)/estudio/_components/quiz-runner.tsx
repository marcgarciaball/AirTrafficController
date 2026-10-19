"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Annunciator } from "@/components/cockpit/annunciator"
import { Gauge } from "@/components/cockpit/gauge"
import { Panel } from "@/components/cockpit/panel"
import { Tape } from "@/components/cockpit/tape"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { AttemptResult, ClientQuestion, ReviewItem } from "@/lib/study/types"
import { finishAttempt, startAttempt } from "../actions"

type Phase = "intro" | "running" | "finishing" | "done"
const LETTERS = ["A", "B", "C", "D"]

function fmt(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
}

export function QuizRunner({
  mode,
  topicId,
  topicTitles,
  questions,
  label,
}: {
  mode: "tema" | "simulacro"
  topicId: string | null
  topicTitles: Record<string, string>
  questions: ClientQuestion[]
  label: string
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [phase, setPhase] = useState<Phase>("intro")
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [index, setIndex] = useState(0)
  const [chosen, setChosen] = useState<Record<string, number | null>>({})
  const [error, setError] = useState<string | null>(null)
  const [minutes, setMinutes] = useState("")
  const [remaining, setRemaining] = useState<number | null>(null)
  const [outcome, setOutcome] = useState<{ result: AttemptResult; review: ReviewItem[] } | null>(null)
  const chosenRef = useRef(chosen)
  chosenRef.current = chosen
  const idRef = useRef(attemptId)
  idRef.current = attemptId
  const headingRef = useRef<HTMLHeadingElement>(null)

  const finish = useCallback(async () => {
    const id = idRef.current
    if (!id) return
    setPhase("finishing")
    const answers = questions.map((q) => ({ question_id: q.id, chosen_index: chosenRef.current[q.id] ?? null }))
    const res = await finishAttempt(id, answers)
    if ("error" in res) {
      setError(res.error)
      setPhase("running")
      return
    }
    setOutcome(res)
    setPhase("done")
  }, [questions])

  // Cronómetro opcional.
  useEffect(() => {
    if (phase !== "running" || remaining === null) return
    if (remaining <= 0) {
      void finish()
      return
    }
    const t = setTimeout(() => setRemaining((r) => (r === null ? r : r - 1)), 1000)
    return () => clearTimeout(t)
  }, [phase, remaining, finish])

  useEffect(() => {
    headingRef.current?.focus()
  }, [index, phase])

  async function start() {
    setError(null)
    const res = await startAttempt(mode, topicId, questions.map((q) => q.id))
    if ("error" in res) {
      setError(res.error)
      return
    }
    setAttemptId(res.id)
    setChosen({})
    setIndex(0)
    const mins = Number(minutes)
    setRemaining(mode === "simulacro" && Number.isFinite(mins) && mins > 0 ? Math.round(mins * 60) : null)
    setPhase("running")
  }

  function repeat() {
    setOutcome(null)
    setAttemptId(null)
    setError(null)
    setPhase("intro")
    startTransition(() => router.refresh())
  }

  if (questions.length === 0) {
    return <p className="text-sm text-muted-foreground">Contenido en preparación: aún no hay preguntas.</p>
  }

  if (phase === "intro") {
    return (
      <Panel title={label} aside={`${questions.length} PREG`}>
        <div className="space-y-5">
          <p className="max-w-[68ch] leading-relaxed">
            {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}. Puedes dejar preguntas en blanco.
          </p>
          {mode === "simulacro" ? (
            <>
              <p className="flex max-w-[68ch] items-start gap-3 text-sm leading-relaxed">
                <Annunciator tone="amber" className="mt-px">Nota</Annunciator>
                La penalización por fallo no consta en las bases oficiales; aquí no se aplica.
              </p>
              <div className="w-48 space-y-1">
                <Label htmlFor="minutes">Cronómetro · min</Label>
                <Input
                  id="minutes"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={300}
                  value={minutes}
                  onChange={(e) => setMinutes(e.target.value)}
                  placeholder="SIN LÍMITE"
                />
              </div>
            </>
          ) : null}
          {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
          <Button size="lg" onClick={start} disabled={pending}>Empezar</Button>
        </div>
      </Panel>
    )
  }

  if (phase === "done" && outcome) {
    const { result, review } = outcome
    const byTopic = new Map<string, { total: number; correct: number }>()
    for (const r of review) {
      const t = byTopic.get(r.topic_id) ?? { total: 0, correct: 0 }
      t.total++
      if (r.correct) t.correct++
      byTopic.set(r.topic_id, t)
    }
    const counts: [string, number, string][] = [
      ["Aciertos", result.correct, "text-green"],
      ["Fallos", result.wrong, result.wrong > 0 ? "text-red" : "text-foreground"],
      ["En blanco", result.blank, "text-muted-foreground"],
      ["Total", result.total, "text-foreground"],
    ]
    return (
      <div className="space-y-8">
        <Panel title="Resultado" aside={label}>
          <div className="flex items-end gap-6">
            <Gauge value={result.pct} label="Acierto" tone={result.pct >= 50 ? "green" : "amber"} className="shrink-0" />
            <dl className="grid flex-1 grid-cols-[1fr_auto] gap-x-4 gap-y-1 text-sm">
              {counts.map(([k, v, c]) => (
                <div key={k} className="contents">
                  <dt className="uppercase tracking-wide text-muted-foreground">{k}</dt>
                  <dd className={cn("text-right font-mono tabular-nums", c)}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Panel>
        {mode === "simulacro" ? (
          <Panel title="Desglose por tema" flush>
            <ul className="divide-y divide-line">
              {[...byTopic.entries()].map(([tid, t]) => (
                <li key={tid} className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm sm:px-4">
                  <span>{topicTitles[tid] ?? "Tema"}</span>
                  <span className="font-mono tabular-nums">{t.correct}/{t.total}</span>
                </li>
              ))}
            </ul>
            <p className="px-3 py-2 text-xs text-muted-foreground sm:px-4">La penalización por fallo no consta en las bases oficiales; aquí no se aplica.</p>
          </Panel>
        ) : null}
        <Button size="lg" onClick={repeat} disabled={pending}>Repetir</Button>
        <Panel title="Revisión" aside={`${review.length}`} flush>
          <ol className="divide-y divide-line">
            {review.map((r, n) => (
              <li key={r.question_id} className="space-y-2 px-3 py-3 sm:px-4">
                <p className="max-w-[68ch] leading-relaxed">
                  <span className="mr-2 font-mono text-muted-foreground tabular-nums">{String(n + 1).padStart(2, "0")}</span>
                  {r.stem}
                </p>
                <ul>
                  {r.options.map((o, i) => {
                    const isCorrect = i === r.correct_index
                    const isChosen = i === r.chosen_index
                    const wrong = isChosen && !isCorrect
                    return (
                      <li
                        key={i}
                        className={cn(
                          "flex items-start gap-3 border px-2.5 py-1.5 text-sm",
                          isCorrect ? "border-green text-green" : wrong ? "border-red text-red" : "border-transparent text-muted-foreground"
                        )}
                      >
                        <span className="shrink-0 font-mono">[{LETTERS[i]}]</span>
                        <span className="flex-1">{o}</span>
                        {isCorrect ? <span className="shrink-0 font-mono text-xs uppercase">✓ Correcta</span> : null}
                        {wrong ? <span className="shrink-0 font-mono text-xs uppercase">✕ Tu respuesta</span> : null}
                      </li>
                    )
                  })}
                </ul>
                {r.chosen_index === null ? <p className="text-xs uppercase tracking-wide text-muted-foreground">En blanco</p> : null}
                <p className="max-w-[68ch] text-sm leading-relaxed text-foreground">{r.explanation}</p>
                <p className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <span className="font-mono">{r.source_pages}</span> · Contenido propio
                  <Annunciator tone="amber">Sin revisar</Annunciator>
                </p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    )
  }

  const q = questions[index]
  const last = index === questions.length - 1
  const sel = chosen[q.id] ?? null
  const busy = phase === "finishing"
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-baseline justify-between font-mono text-sm uppercase tabular-nums">
          <span aria-live="polite">
            <span className="text-foreground">{label}</span>{" "}
            <span className="text-foreground">{index + 1}/{questions.length}</span>
          </span>
          {remaining !== null ? (
            <span role="timer" aria-label="Tiempo restante" className={remaining <= 60 ? "text-amber" : "text-foreground"}>
              {fmt(Math.max(remaining, 0))}
            </span>
          ) : null}
        </div>
        <Tape value={(index / questions.length) * 100} tone="green" label={`Pregunta ${index + 1} de ${questions.length}`} />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="max-w-[68ch] text-base leading-relaxed font-normal text-foreground">
        {q.stem}
      </h2>
      <div role="radiogroup" aria-label="Opciones" className="divide-y divide-line border-y border-line">
        {q.options.map((o, i) => {
          const checked = sel === i
          return (
            <label
              key={i}
              className={cn(
                "flex min-h-11 cursor-pointer items-start gap-3 border px-3 py-2.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan",
                checked ? "border-cyan" : "border-transparent hover:bg-surface"
              )}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                className="sr-only"
                checked={checked}
                onChange={() => setChosen((c) => ({ ...c, [q.id]: i }))}
              />
              <span aria-hidden="true" className="shrink-0 font-mono text-cyan">[{LETTERS[i]}]</span>
              <span className="text-foreground">{o}</span>
            </label>
          )
        })}
      </div>
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
      <div className="flex flex-wrap justify-between gap-2">
        <Button
          variant="outline"
          size="lg"
          disabled={busy}
          onClick={() => {
            setChosen((c) => ({ ...c, [q.id]: null }))
            if (!last) setIndex(index + 1)
          }}
        >
          Dejar en blanco
        </Button>
        {last ? (
          <Button size="lg" disabled={busy} onClick={() => void finish()}>{busy ? "Corrigiendo…" : "Terminar"}</Button>
        ) : (
          <Button size="lg" disabled={busy} onClick={() => setIndex(index + 1)}>Siguiente</Button>
        )}
      </div>
    </div>
  )
}
