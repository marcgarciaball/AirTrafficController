"use client"

import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Check, X } from "lucide-react"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Card, Section } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"
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
  const idRef = useRef(attemptId)
  const autoTriedRef = useRef(false)
  useEffect(() => {
    chosenRef.current = chosen
    idRef.current = attemptId
  }, [chosen, attemptId])
  const headingRef = useRef<HTMLHeadingElement>(null)

  const finish = useCallback(async () => {
    const id = idRef.current
    if (!id) return
    setError(null)
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
      // El envío automático se intenta una sola vez; si falla, el usuario reintenta con el botón.
      if (!autoTriedRef.current) {
        autoTriedRef.current = true
        void finish()
      }
      return
    }
    const t = setTimeout(() => setRemaining((r) => (r === null ? r : r - 1)), 1000)
    return () => clearTimeout(t)
  }, [phase, remaining, finish])

  useEffect(() => {
    headingRef.current?.focus()
  }, [index, phase])

  // Teclado: 1-4 o A-D eligen opción; Intro pasa a la siguiente.
  const current = phase === "running" ? questions[index] : undefined
  useEffect(() => {
    if (!current) return
    const q = current
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const t = e.target as HTMLElement | null
      if (t && ((t.tagName === "INPUT" && (t as HTMLInputElement).type !== "radio") || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return
      const k = e.key.toLowerCase()
      const i = "1234".indexOf(k) >= 0 ? "1234".indexOf(k) : "abcd".indexOf(k)
      if (k.length === 1 && i >= 0 && i < q.options.length) {
        e.preventDefault()
        setChosen((c) => ({ ...c, [q.id]: i }))
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [current])

  async function start() {
    setError(null)
    const res = await startAttempt(mode, topicId, questions.map((q) => q.id))
    if ("error" in res) {
      setError(res.error)
      return
    }
    autoTriedRef.current = false
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
    return <p className="text-lg text-muted-foreground">Contenido en preparación: aún no hay preguntas.</p>
  }

  if (phase === "intro") {
    return (
      <Card className="max-w-prose space-y-6 sm:p-8">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-xl font-bold">
            {questions.length} {questions.length === 1 ? "pregunta" : "preguntas"}
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Puedes dejar preguntas en blanco y volver atrás. Elige con el ratón o con las teclas 1 a 4 (o A a D). La corrección llega al final.
          </p>
        </div>
        {mode === "simulacro" ? (
          <>
            <p className="flex items-start gap-3 leading-relaxed text-muted-foreground">
              <StatusChip tone="warning" className="mt-0.5">nota</StatusChip>
              La penalización por fallo no consta en las bases oficiales; aquí no se aplica.
            </p>
            <div className="w-56 space-y-2">
              <Label htmlFor="minutes">Cronómetro en minutos</Label>
              <Input
                id="minutes"
                type="number"
                inputMode="numeric"
                min={1}
                max={300}
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Sin límite"
              />
            </div>
          </>
        ) : null}
        {error ? <p role="alert" className="text-danger">{error}</p> : null}
        <Button size="lg" onClick={start} disabled={pending}>Empezar</Button>
      </Card>
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
      ["aciertos", result.correct, "text-success"],
      ["fallos", result.wrong, result.wrong > 0 ? "text-danger" : "text-foreground"],
      ["en blanco", result.blank, "text-foreground"],
    ]
    return (
      <div className="space-y-12">
        <Card className="space-y-6 sm:p-8">
          <h2 className="sr-only">Resultado</h2>
          <div className="space-y-1">
            <p className="text-4xl font-bold">
              {result.pct}
              <span className="ml-1 text-xl font-normal text-muted-foreground">% de acierto</span>
            </p>
            <p className="text-muted-foreground">{result.correct} de {result.total} preguntas bien</p>
          </div>
          <ProgressBar value={result.pct} label="Acierto" tone={result.pct >= 50 ? "success" : "warning"} />
          <dl className="grid grid-cols-3 gap-4 border-t pt-5">
            {counts.map(([k, v, c]) => (
              <div key={k} className="space-y-0.5">
                <dd className={cn("text-2xl font-bold", c)}>{v}</dd>
                <dt className="text-sm text-muted-foreground">{k}</dt>
              </div>
            ))}
          </dl>
          <Button size="lg" onClick={repeat} disabled={pending}>Repetir</Button>
        </Card>
        {mode === "simulacro" ? (
          <Section title="Por tema" description="La penalización por fallo no consta en las bases oficiales; aquí no se aplica." flush>
            <ul className="divide-y divide-line">
              {[...byTopic.entries()].map(([tid, t]) => (
                <li key={tid} className="flex items-baseline justify-between gap-4 px-5 py-3.5 sm:px-6">
                  <span>{topicTitles[tid] ?? "Tema"}</span>
                  <span className="shrink-0 text-muted-foreground">{t.correct} de {t.total}</span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}
        <section aria-labelledby="revision" className="space-y-6">
          <h2 id="revision" className="text-xl font-bold">Revisión</h2>
          <ol className="space-y-6">
            {review.map((r, n) => (
              <li key={r.question_id} className="space-y-4 rounded-lg border bg-card p-5 shadow-sm sm:p-6">
                <p className="text-sm text-muted-foreground">
                  Pregunta {n + 1} de {review.length}
                  {r.chosen_index === null ? " · en blanco" : r.correct ? " · bien" : " · mal"}
                </p>
                <p className="max-w-prose text-lg leading-relaxed font-bold">{r.stem}</p>
                <ul className="space-y-2">
                  {r.options.map((o, i) => {
                    const isCorrect = i === r.correct_index
                    const isChosen = i === r.chosen_index
                    const wrong = isChosen && !isCorrect
                    return (
                      <li
                        key={i}
                        className={cn(
                          "flex items-start gap-3 rounded-md border px-4 py-3",
                          isCorrect ? "border-success bg-success/[0.06]" : wrong ? "border-danger bg-danger/[0.06]" : "border-transparent"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-7 shrink-0 items-center justify-center rounded-md text-sm font-bold",
                            isCorrect ? "bg-success text-card" : wrong ? "bg-danger text-card" : "bg-subtle text-muted-foreground"
                          )}
                        >
                          {isCorrect ? <Check className="size-4" strokeWidth={3} /> : wrong ? <X className="size-4" strokeWidth={3} /> : LETTERS[i]}
                        </span>
                        <span className={cn("flex-1 pt-0.5", isCorrect || wrong ? "text-foreground" : "text-muted-foreground")}>
                          {o}
                          {isCorrect ? <span className="mt-0.5 block text-sm font-bold text-success">Respuesta correcta</span> : null}
                          {wrong ? <span className="mt-0.5 block text-sm font-bold text-danger">Tu respuesta</span> : null}
                        </span>
                      </li>
                    )
                  })}
                </ul>
                <div className="max-w-prose space-y-3 border-t pt-4">
                  <p className="text-sm font-bold">Explicación</p>
                  <p className="text-lg leading-relaxed">{r.explanation}</p>
                  <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                    <span>Páginas del temario: {r.source_pages}</span>
                    <StatusChip tone="warning">contenido propio · sin revisar</StatusChip>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    )
  }

  const q = questions[index]
  const last = index === questions.length - 1
  const sel = chosen[q.id] ?? null
  const busy = phase === "finishing"
  return (
    <div className="max-w-prose space-y-8">
      <div className="space-y-3">
        <div className="flex items-baseline justify-between text-muted-foreground">
          <span aria-live="polite">
            Pregunta <span className="font-bold text-foreground">{index + 1}</span> de {questions.length}
          </span>
          {remaining !== null ? (
            <span role="timer" aria-label="Tiempo restante" className={cn("font-mono", remaining <= 60 ? "text-warning" : "text-foreground")}>
              {fmt(Math.max(remaining, 0))}
            </span>
          ) : null}
        </div>
        <ProgressBar value={(index / questions.length) * 100} tone="primary" size="sm" label={`Pregunta ${index + 1} de ${questions.length}`} />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="text-xl leading-relaxed font-bold text-foreground focus-visible:outline-none">
        {q.stem}
      </h2>
      <div role="radiogroup" aria-label="Opciones" className="space-y-3">
        {q.options.map((o, i) => {
          const checked = sel === i
          return (
            <label
              key={i}
              className={cn(
                "flex min-h-14 cursor-pointer items-start gap-4 rounded-lg border bg-card px-4 py-3.5 text-lg leading-relaxed shadow-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary",
                checked ? "border-primary ring-1 ring-primary" : "hover:border-muted-foreground/50 hover:bg-subtle"
              )}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                className="sr-only"
                checked={checked}
                onChange={() => setChosen((c) => ({ ...c, [q.id]: i }))}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md border text-base font-bold transition-colors",
                  checked ? "border-primary bg-primary text-primary-foreground" : "border-border bg-subtle text-muted-foreground"
                )}
              >
                {LETTERS[i]}
              </span>
              <span className="text-foreground">{o}</span>
            </label>
          )
        })}
      </div>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
      {error && remaining !== null && remaining <= 0 ? (
        <Button size="lg" disabled={busy} onClick={() => void finish()}>Reintentar envío</Button>
      ) : null}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-6">
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="lg" disabled={busy || index === 0} onClick={() => setIndex(index - 1)}>
            Anterior
          </Button>
          <Button
            variant="ghost"
            size="lg"
            disabled={busy}
            onClick={() => {
              setChosen((c) => ({ ...c, [q.id]: null }))
              if (!last) setIndex(index + 1)
            }}
          >
            Dejar en blanco
          </Button>
        </div>
        {last ? (
          <Button size="lg" disabled={busy} onClick={() => void finish()}>{busy ? "Corrigiendo…" : "Terminar"}</Button>
        ) : (
          <Button size="lg" disabled={busy} onClick={() => setIndex(index + 1)}>Siguiente</Button>
        )}
      </div>
    </div>
  )
}
