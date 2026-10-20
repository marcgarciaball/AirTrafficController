"use client"

import Link from "next/link"
import { useCallback, useEffect, useState, useTransition } from "react"
import { Check, X } from "lucide-react"
import { MarkdownBody } from "@/components/study/markdown-body"
import { PendingCheck, OwnContent } from "@/components/ui-torre/content-labels"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Card } from "@/components/ui-torre/section"
import { Button, buttonVariants } from "@/components/ui/button"
import type { StepKey } from "@/lib/study/steps"
import { cn } from "@/lib/utils"
import { answerQuestion, completeBlock, createOwnCard, type AnswerResult } from "@/app/(app)/estudio/[n]/b/actions"

export type RunnerBlock = {
  id: string
  title: string
  objectives: string[]
  key_idea: string
  body_md: string
  example_md: string | null
  trap_md: string
  exam_tip_md: string
  mnemonic_md: string | null
  source_pages: string
  reviewed: boolean
}
export type RunnerQuestion = { id: string; stem: string; options: string[] }

const LETTERS = ["A", "B", "C", "D"]
const STEP_TITLE: Record<StepKey, string> = {
  objetivos: "Qué vas a aprender",
  previa: "Antes de leer: ¿qué sabes ya?",
  idea: "La idea clave",
  explicacion: "Explicación",
  ejemplo: "Ejemplo",
  trampa: "Ojo con la trampa",
  consejo: "Consejo para el examen",
  mnemotecnia: "Para recordarlo",
  comprobacion: "Comprueba lo aprendido",
  fuente: "Fuente y cierre",
}

/** Una pregunta con corrección al momento. Teclas 1-4 o A-D. */
function Question({ q, index, total, onDone }: { q: RunnerQuestion; index: number; total: number; onDone: (correct: boolean) => void }) {
  const [chosen, setChosen] = useState<number | null>(null)
  const [result, setResult] = useState<AnswerResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  const pick = useCallback(
    (i: number) => {
      if (result || pending) return
      setChosen(i)
      setError(null)
      start(async () => {
        const r = await answerQuestion(q.id, i)
        if ("error" in r) setError(r.error)
        else setResult(r)
      })
    },
    [q.id, result, pending],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key.toUpperCase()
      const i = "1234".includes(k) && k.length === 1 ? Number(k) - 1 : LETTERS.indexOf(k)
      if (i >= 0 && i < q.options.length) pick(i)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [pick, q.options.length])

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">Pregunta {index + 1} de {total}</p>
      <p className="max-w-prose text-xl leading-relaxed font-bold">{q.stem}</p>
      <ul className="space-y-3">
        {q.options.map((o, i) => {
          const isRight = result?.correct_index === i
          const isWrong = result && chosen === i && !result.correct
          return (
            <li key={i}>
              <button
                type="button"
                disabled={!!result || pending}
                onClick={() => pick(i)}
                className={cn(
                  "flex min-h-14 w-full items-start gap-3 rounded-lg border bg-card px-4 py-3 text-left text-base leading-relaxed transition-colors enabled:hover:border-primary/60 enabled:hover:bg-subtle",
                  isRight && "border-success text-success",
                  isWrong && "border-danger text-danger",
                  !result && chosen === i && "border-primary",
                )}
              >
                <span aria-hidden="true" className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border text-sm font-bold">{LETTERS[i]}</span>
                <span className="flex-1 text-foreground">{o}</span>
                {isRight ? <Check aria-label="Correcta" className="mt-1 size-5 shrink-0" /> : null}
                {isWrong ? <X aria-label="Incorrecta" className="mt-1 size-5 shrink-0" /> : null}
              </button>
            </li>
          )
        })}
      </ul>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
      {result ? (
        <div role="status" className="max-w-prose space-y-4">
          <p className={cn("font-bold", result.correct ? "text-success" : "text-danger")}>
            {result.correct ? "Correcto." : `Incorrecto. La respuesta correcta es la ${LETTERS[result.correct_index]}.`}
          </p>
          {result.explanation ? <p className="text-base leading-relaxed text-muted-foreground">{result.explanation}</p> : null}
          <Button type="button" size="lg" onClick={() => onDone(result.correct)}>
            {index + 1 < total ? "Siguiente pregunta" : "Continuar"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

function QuestionSet({ questions, onFinish }: { questions: RunnerQuestion[]; onFinish: (correct: number) => void }) {
  const [i, setI] = useState(0)
  const [ok, setOk] = useState(0)
  return (
    <Question
      key={questions[i].id}
      q={questions[i]}
      index={i}
      total={questions.length}
      onDone={(c) => {
        const n = ok + (c ? 1 : 0)
        setOk(n)
        if (i + 1 < questions.length) setI(i + 1)
        else onFinish(n)
      }}
    />
  )
}

function SaveConcept({ title, idea }: { title: string; idea: string }) {
  const [state, setState] = useState<"idle" | "saved" | string>("idle")
  const [pending, start] = useTransition()
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        type="button"
        variant="outline"
        disabled={pending || state === "saved"}
        onClick={() =>
          start(async () => {
            const r = await createOwnCard(title, idea)
            setState(r.error ?? "saved")
          })
        }
      >
        {state === "saved" ? "Guardado en Flashback" : "Guardar este concepto"}
      </Button>
      {state !== "idle" && state !== "saved" ? <span role="alert" className="text-danger">{state}</span> : null}
    </div>
  )
}

export function BlockRunner({
  block,
  steps,
  previa,
  comprobacion,
  topicNumber,
  nextBlockId,
}: {
  block: RunnerBlock
  steps: StepKey[]
  previa: RunnerQuestion[]
  comprobacion: RunnerQuestion[]
  topicNumber: number
  nextBlockId: string | null
}) {
  const [pos, setPos] = useState(0)
  const [questionsDone, setQuestionsDone] = useState<Record<string, boolean>>({})
  const [result, setResult] = useState<{ check_correct: number; check_total: number; new_cards: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const step = steps[pos]
  const last = pos === steps.length - 1
  const needsQuestions = (step === "previa" && previa.length > 0) || (step === "comprobacion" && comprobacion.length > 0)
  const blocked = needsQuestions && !questionsDone[step]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pos])

  function finish() {
    setError(null)
    start(async () => {
      const r = await completeBlock(block.id)
      if ("error" in r) setError(r.error)
      else setResult(r)
    })
  }

  if (result) {
    return (
      <Card className="space-y-5">
        <h2 className="text-xl font-bold">Bloque terminado</h2>
        {result.check_total > 0 ? <p className="text-lg">Has acertado {result.check_correct} de {result.check_total} en la comprobación.</p> : null}
        <p className="text-lg font-bold text-success">+{result.new_cards} {result.new_cards === 1 ? "tarjeta" : "tarjetas"} al Flashback</p>
        <div className="flex flex-wrap gap-3">
          {nextBlockId ? <Link href={`/estudio/${topicNumber}/b/${nextBlockId}`} className={buttonVariants({ size: "lg" })}>Siguiente bloque</Link> : null}
          <Link href={`/estudio/${topicNumber}/bloques`} className={buttonVariants({ size: "lg", variant: nextBlockId ? "outline" : "default" })}>Volver a los bloques</Link>
          {result.new_cards > 0 ? <Link href="/flashback" className={buttonVariants({ size: "lg", variant: "outline" })}>Ir al Flashback</Link> : null}
        </div>
      </Card>
    )
  }

  let content
  switch (step) {
    case "objetivos":
      content = (
        <ul className="max-w-prose list-disc space-y-2 pl-6 text-lg leading-relaxed marker:text-muted-foreground">
          {block.objectives.map((o, i) => <li key={i} className="pl-1">{o}</li>)}
        </ul>
      )
      break
    case "previa":
      content = <QuestionSet questions={previa} onFinish={() => setQuestionsDone((d) => ({ ...d, previa: true }))} />
      break
    case "idea":
      content = (
        <div className="space-y-5">
          <p className="max-w-prose text-xl leading-relaxed font-bold">{block.key_idea}</p>
          <SaveConcept title={block.title} idea={block.key_idea} />
        </div>
      )
      break
    case "explicacion":
      content = <MarkdownBody md={block.body_md} />
      break
    case "ejemplo":
      content = <MarkdownBody md={block.example_md ?? ""} />
      break
    case "trampa":
      content = <MarkdownBody md={block.trap_md} />
      break
    case "consejo":
      content = (
        <div className="space-y-4">
          <MarkdownBody md={block.exam_tip_md} />
          <span className="inline-flex"><OwnContent reviewed={block.reviewed} /></span>
        </div>
      )
      break
    case "mnemotecnia":
      content = <MarkdownBody md={block.mnemonic_md ?? ""} />
      break
    case "comprobacion":
      content = <QuestionSet questions={comprobacion} onFinish={() => setQuestionsDone((d) => ({ ...d, comprobacion: true }))} />
      break
    case "fuente":
      content = (
        <div className="max-w-prose space-y-4 text-lg leading-relaxed">
          <p>Páginas del temario: {block.source_pages}</p>
          {block.reviewed ? <OwnContent reviewed /> : <PendingCheck />}
        </div>
      )
      break
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Paso {pos + 1} de {steps.length}</p>
        <ProgressBar value={((pos + 1) / steps.length) * 100} label="Progreso del bloque" tone="primary" size="sm" />
      </div>
      <section aria-labelledby="paso" className="space-y-5">
        <h2 id="paso" className="text-xl font-bold">{STEP_TITLE[step]}</h2>
        {content}
      </section>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
      <div className="flex flex-wrap gap-3 border-t pt-6">
        {pos > 0 ? <Button type="button" variant="outline" size="lg" onClick={() => setPos(pos - 1)}>Anterior</Button> : null}
        {last ? (
          <Button type="button" size="lg" disabled={pending} onClick={finish}>Terminar</Button>
        ) : (
          <Button type="button" size="lg" disabled={blocked} onClick={() => setPos(pos + 1)}>Siguiente</Button>
        )}
      </div>
    </div>
  )
}
