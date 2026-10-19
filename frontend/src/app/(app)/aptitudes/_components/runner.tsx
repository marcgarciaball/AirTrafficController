"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState, useTransition, type ReactNode } from "react"
import { Check, X } from "lucide-react"
import { FIELD_LABEL } from "@/components/ui-torre/field"
import { ProgressBar } from "@/components/ui-torre/progress-bar"
import { Section } from "@/components/ui-torre/section"
import { StatusChip } from "@/components/ui-torre/status-chip"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkCalculo } from "@/lib/aptitudes/calculo"
import { checkMemoria, parseDigits, type MemoriaItem } from "@/lib/aptitudes/memoria"
import { kindConfig, nextLevel, type Kind } from "@/lib/aptitudes/kinds"
import { multitaskScore, trackingFraction, trackingHit, trackingPosition, type MultitareaItem } from "@/lib/aptitudes/multitarea"
import { generateSet, type AptItem } from "@/lib/aptitudes/set"
import { cn } from "@/lib/utils"
import { saveAptitudeResult } from "../actions"
import { describeTerm, FigureView, PolyShape } from "./views"

type Answer = number | number[] | null
type Phase = "intro" | "running" | "done"
type Review = { title: ReactNode; given: string; expected: string; ok: boolean; note?: string }
type Multi = { correct: number; hits: number; samples: number; given: (number | null)[] }

const LETTERS = ["A", "B", "C", "D"]
const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

function isOk(e: AptItem, a: Answer): boolean {
  switch (e.kind) {
    case "atencion":
      return a === e.item.answer
    case "espacial":
    case "abstracto":
      return a === e.item.answerIndex
    case "memoria":
      return Array.isArray(a) && checkMemoria(e.item, a)
    case "calculo":
      return typeof a === "number" && checkCalculo(e.item, a)
    case "multitarea":
      return false
  }
}

function review(e: AptItem, a: Answer, i: number): Review {
  const ok = isOk(e, a)
  const n = typeof a === "number" ? String(a) : "sin respuesta"
  switch (e.kind) {
    case "atencion":
      return { title: `Contar ${e.item.target}`, given: n, expected: String(e.item.answer), ok }
    case "espacial":
      return {
        title: `Figura ${i + 1}`,
        given: typeof a === "number" ? LETTERS[a] : "sin respuesta",
        expected: LETTERS[e.item.answerIndex],
        ok,
        note: "La correcta es la misma figura solo girada; el reflejo no vale.",
      }
    case "abstracto":
      return {
        title: `Serie ${i + 1}: ${e.item.series.map(describeTerm).join(", ")}`,
        given: typeof a === "number" ? `${LETTERS[a]} (${describeTerm(e.item.options[a])})` : "sin respuesta",
        expected: `${LETTERS[e.item.answerIndex]} (${describeTerm(e.item.options[e.item.answerIndex])})`,
        ok,
        note: e.item.explanation,
      }
    case "memoria":
      return {
        title: `Secuencia ${i + 1}`,
        given: Array.isArray(a) ? a.join(" ") || "—" : "sin respuesta",
        expected: e.item.sequence.join(" "),
        ok,
        note: e.item.mode === "posiciones" ? "Posiciones numeradas por filas desde 1." : undefined,
      }
    case "calculo":
      return { title: e.item.prompt, given: typeof a === "number" ? `${a} ${e.item.unit}` : "sin respuesta", expected: `${e.item.answer} ${e.item.unit}`, ok }
    case "multitarea":
      return { title: "", given: "", expected: "", ok }
  }
}

function NumericStep({ prompt, unit, onSubmit }: { prompt: ReactNode; unit?: string; onSubmit: (v: number | null) => void }) {
  const [v, setV] = useState("")
  const go = () => onSubmit(v.trim() === "" || Number.isNaN(Number(v)) ? null : Number(v))
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        go()
      }}
      className="space-y-4"
    >
      {prompt}
      <div className="flex items-end gap-3">
        <label className="flex-1 space-y-2">
          <span className={FIELD_LABEL}>Respuesta{unit ? ` (${unit})` : ""}</span>
          <Input autoFocus inputMode="numeric" value={v} onChange={(e) => setV(e.target.value)} className="text-right" />
        </label>
        <Button type="submit" size="lg">Siguiente</Button>
      </div>
    </form>
  )
}

function ChoiceStep({ options, onPick }: { options: ReactNode[]; onPick: (i: number) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {options.map((o, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => onPick(i)}
            className="flex min-h-24 w-full items-center justify-center gap-4 rounded-lg border bg-card px-4 py-3 shadow-sm transition-colors hover:border-primary/60 hover:bg-subtle"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-subtle font-bold text-muted-foreground">{LETTERS[i]}</span>
            {o}
          </button>
        </li>
      ))}
    </ul>
  )
}

function PosGrid({ cols, lit, onPick }: { cols: number; lit?: number; onPick?: (i: number) => void }) {
  return (
    <div className="grid w-48 gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array.from({ length: cols * cols }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={!onPick}
          onClick={() => onPick?.(i)}
          aria-label={`Casilla ${i + 1}`}
          className={cn("aspect-square min-h-11 rounded-md border text-sm transition-colors", lit === i ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground", onPick && "hover:border-primary")}
        >
          {onPick ? i + 1 : ""}
        </button>
      ))}
    </div>
  )
}

function MemoriaStep({ item, onSubmit }: { item: MemoriaItem; onSubmit: (a: number[]) => void }) {
  const len = item.sequence.length
  const digits = item.mode === "digitos"
  const total = digits ? 1 : len
  const [tick, setTick] = useState(0)
  const [text, setText] = useState("")
  const [picked, setPicked] = useState<number[]>([])
  useEffect(() => {
    if (tick >= total) return
    const id = setTimeout(() => setTick((t) => t + 1), (item.showSeconds * 1000) / total)
    return () => clearTimeout(id)
  }, [tick, total, item.showSeconds])
  if (tick < total) {
    return digits ? (
      <p aria-live="polite" className="py-8 text-center font-mono text-3xl tracking-[0.3em] text-foreground">{item.sequence.join(" ")}</p>
    ) : (
      <div className="flex justify-center py-4" aria-label="Memoriza el orden de las casillas iluminadas">
        <PosGrid cols={item.cols} lit={item.sequence[tick]} />
      </div>
    )
  }
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault()
        onSubmit(digits ? parseDigits(text) : picked)
      }}
      className="space-y-4"
    >
      <p className="text-sm text-muted-foreground">Reproduce la secuencia ({len} elementos).</p>
      {digits ? (
        <label className="block space-y-2">
          <span className={FIELD_LABEL}>Dígitos</span>
          <Input autoFocus inputMode="numeric" value={text} onChange={(e) => setText(e.target.value)} className="tracking-[0.3em]" />
        </label>
      ) : (
        <div className="space-y-2">
          <PosGrid cols={item.cols} onPick={(i) => setPicked((p) => (p.length < len ? [...p, i] : p))} />
          <p className="font-mono text-sm text-foreground tabular-nums">{picked.map((p) => p + 1).join(" ") || "—"}</p>
          <Button type="button" variant="outline" size="sm" onClick={() => setPicked([])}>
            Borrar
          </Button>
        </div>
      )}
      <Button type="submit">Comprobar</Button>
    </form>
  )
}

function MultiStep({ item, remaining, onSample, onAnswer, onAllAnswered }: { item: MultitareaItem; remaining: number; onSample: (hit: boolean) => void; onAnswer: (idx: number, value: number | null, ok: boolean) => void; onAllAnswered: () => void }) {
  const area = useRef<HTMLDivElement>(null)
  const pointer = useRef<{ x: number; y: number } | null>(null)
  const t0 = useRef(0)
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 })
  const [idx, setIdx] = useState(0)
  const [v, setV] = useState("")
  const [hit, setHit] = useState(false)
  useEffect(() => {
    t0.current = Date.now()
    let n = 0
    const id = setInterval(() => {
      const target = trackingPosition(item.seed, item.level, Date.now() - t0.current)
      setPos(target)
      const on = pointer.current ? trackingHit(target, pointer.current, item.radius) : false
      setHit(on)
      if (++n % 2 === 0) onSample(on)
    }, 50)
    return () => clearInterval(id)
  }, [item, onSample])
  const cur = item.calc[idx]
  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const n = v.trim() === "" || Number.isNaN(Number(v)) ? null : Number(v)
    onAnswer(idx, n, n !== null && checkCalculo(cur, n))
    setV("")
    if (idx + 1 >= item.calc.length) onAllAnswered()
    else setIdx(idx + 1)
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <p className="text-sm font-bold">Seguimiento: mantén el cursor sobre el objetivo</p>
        <div
          ref={area}
          onPointerMove={(e) => {
            const r = area.current!.getBoundingClientRect()
            pointer.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height }
          }}
          onPointerLeave={() => (pointer.current = null)}
          style={{ touchAction: "none" }}
          className="relative aspect-square w-full rounded-lg border bg-card"
        >
          <span
            aria-hidden="true"
            className={cn("absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2", hit ? "border-success" : "border-warning")}
            style={{ left: `${pos.x * 100}%`, top: `${pos.y * 100}%`, width: `${item.radius * 200}%`, height: `${item.radius * 200}%` }}
          />
        </div>
        <p className="font-mono text-sm text-muted-foreground">{fmt(remaining)}</p>
      </div>
      <form onSubmit={submit} className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Cálculo {idx + 1} de {item.calc.length}
        </p>
        <p className="leading-relaxed">{cur.prompt}</p>
        <label className="block space-y-1">
          <span className={FIELD_LABEL}>Respuesta ({cur.unit})</span>
          <Input inputMode="numeric" value={v} onChange={(e) => setV(e.target.value)} className="text-right" />
        </label>
        <Button type="submit" size="lg">Siguiente</Button>
      </form>
    </div>
  )
}

export function Runner({ kind, level, bestPct }: { kind: Kind; level: number; bestPct: number | null }) {
  const [lvl, setLvl] = useState(level)
  const [phase, setPhase] = useState<Phase>("intro")
  const [items, setItems] = useState<AptItem[]>([])
  const [idx, setIdx] = useState(0)
  const [remaining, setRemaining] = useState(0)
  const [reviews, setReviews] = useState<Review[]>([])
  const [outcome, setOutcome] = useState<{ score: number; total: number; durationS: number } | null>(null)
  const [saved, setSaved] = useState<{ next: number } | { error: string } | null>(null)
  const [, startSave] = useTransition()
  const answers = useRef<Answer[]>([])
  const multi = useRef<Multi>({ correct: 0, hits: 0, samples: 0, given: [] })
  const t0 = useRef(0)
  const finished = useRef(false)
  const cfg = kindConfig(kind, lvl)
  const totalS = cfg.count * cfg.seconds

  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    const durationS = Math.min(totalS, Math.round((Date.now() - t0.current) / 1000))
    let score: number
    let total: number
    let rows: Review[]
    const first = items[0]
    if (first?.kind === "multitarea") {
      const m = multi.current
      const r = multitaskScore(m.correct, first.item.calc.length, trackingFraction(m.hits, m.samples))
      score = r.score
      total = r.total
      rows = first.item.calc.map((c, i) => ({
        title: c.prompt,
        given: m.given[i] == null ? "sin respuesta" : `${m.given[i]} ${c.unit}`,
        expected: `${c.answer} ${c.unit}`,
        ok: m.given[i] != null && checkCalculo(c, m.given[i] as number),
      }))
      rows.push({
        title: "Seguimiento visual",
        given: `${Math.round(trackingFraction(m.hits, m.samples) * 100)} % del tiempo sobre el objetivo`,
        expected: "100 %",
        ok: trackingFraction(m.hits, m.samples) >= 0.5,
      })
    } else {
      rows = items.map((e, i) => review(e, answers.current[i] ?? null, i))
      score = rows.filter((r) => r.ok).length
      total = items.length
    }
    setReviews(rows)
    setOutcome({ score, total, durationS })
    setPhase("done")
    startSave(async () => {
      const res = await saveAptitudeResult({ kind, level: lvl, score, total, durationS })
      setSaved("error" in res ? res : { next: res.nextLevel })
      if (!("error" in res)) setLvl(res.nextLevel)
    })
  }, [items, kind, lvl, totalS])

  useEffect(() => {
    if (phase !== "running") return
    const id = setInterval(() => {
      const left = totalS - Math.floor((Date.now() - t0.current) / 1000)
      setRemaining(Math.max(0, left))
      if (left <= 0) finish()
    }, 250)
    return () => clearInterval(id)
  }, [phase, totalS, finish])

  function start() {
    const seed = Math.floor(Math.random() * 2 ** 31)
    answers.current = []
    multi.current = { correct: 0, hits: 0, samples: 0, given: [] }
    finished.current = false
    t0.current = Date.now()
    setItems(generateSet(kind, lvl, seed))
    setIdx(0)
    setSaved(null)
    setRemaining(totalS)
    setPhase("running")
  }

  const onSample = useCallback((hit: boolean) => {
    multi.current.samples += 1
    if (hit) multi.current.hits += 1
  }, [])
  const onAnswer = useCallback((i: number, value: number | null, ok: boolean) => {
    multi.current.given[i] = value
    if (ok) multi.current.correct += 1
  }, [])

  function submit(a: Answer) {
    answers.current[idx] = a
    if (idx + 1 >= items.length) finish()
    else setIdx(idx + 1)
  }

  if (phase === "intro") {
    return (
      <Section title="Antes de empezar">
        <div className="space-y-6">
          <dl className="grid grid-cols-3 gap-4">
            <div className="space-y-0.5"><dd className="text-2xl font-bold">{lvl} <span className="text-base font-normal text-muted-foreground">de 5</span></dd><dt className="text-sm text-muted-foreground">nivel</dt></div>
            <div className="space-y-0.5"><dd className="text-2xl font-bold">{fmt(totalS)}</dd><dt className="text-sm text-muted-foreground">tiempo</dt></div>
            <div className="space-y-0.5"><dd className="text-2xl font-bold">{bestPct === null ? "—" : `${bestPct} %`}</dd><dt className="text-sm text-muted-foreground">mejor marca</dt></div>
          </dl>
          <ProgressBar value={(lvl / 5) * 100} label="Nivel" tone="primary" />
          <Button size="lg" onClick={start}>Empezar</Button>
        </div>
      </Section>
    )
  }

  if (phase === "done" && outcome) {
    const pct = outcome.total ? Math.round((outcome.score / outcome.total) * 100) : 0
    const next = nextLevel(lvl, outcome.score, outcome.total)
    const shown = saved && "next" in saved ? saved.next : next
    return (
      <div className="space-y-6">
        <Section title="Resultado">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-4xl font-bold">
              {pct}
              <span className="ml-1 text-xl font-normal text-muted-foreground">% de acierto</span>
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">{outcome.score} de {outcome.total} · {fmt(outcome.durationS)}</p>
              <p className="flex items-center gap-2 text-muted-foreground">
                <StatusChip tone={pct >= 80 ? "success" : pct < 50 ? "warning" : "muted"}>
                  {pct >= 80 ? "el nivel sube" : pct < 50 ? "el nivel baja" : "el nivel se mantiene"}
                </StatusChip>
                <span>nivel {shown} de 5</span>
              </p>
              {saved && "error" in saved ? <p className="text-danger">{saved.error}</p> : null}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => setPhase("intro")}>Repetir</Button>
            <Link href="/aptitudes" className={buttonVariants({ variant: "outline", size: "lg" })}>Volver a aptitudes</Link>
          </div>
        </Section>
        <Section title="Revisión" aside={`${reviews.length} ejercicios`} flush>
          <ul className="divide-y divide-line">
            {reviews.map((r, i) => (
              <li key={i} className="flex gap-4 px-5 py-4 sm:px-6">
                <span aria-hidden="true" className={cn("mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-card", r.ok ? "bg-success" : "bg-danger")}>{r.ok ? <Check className="size-3.5" strokeWidth={3} /> : <X className="size-3.5" strokeWidth={3} />}</span>
                <span className="min-w-0 flex-1 space-y-1">
                  <span className="sr-only">{r.ok ? "Correcta: " : "Incorrecta: "}</span>
                  <span className="block">{r.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    Tu respuesta: <span className={r.ok ? "text-success" : "text-danger"}>{r.given}</span>
                    {r.ok ? null : <> · Correcta: <span className="text-success">{r.expected}</span></>}
                  </span>
                  {r.note ? <span className="block text-sm text-muted-foreground">{r.note}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    )
  }

  const cur = items[idx]
  if (!cur) return null
  return (
    <Section title={cur.kind === "multitarea" ? "Ejercicio doble" : `Ejercicio ${idx + 1} de ${items.length}`} aside={<span className={cn("font-mono", remaining <= 10 && "text-warning")}>{fmt(remaining)}</span>}>
      <div className="space-y-6">
        <ProgressBar value={((totalS - remaining) / totalS) * 100} label="Tiempo transcurrido" tone={remaining <= 10 ? "warning" : "primary"} />
        {cur.kind === "atencion" ? (
          <NumericStep
            key={idx}
            onSubmit={submit}
            prompt={
              <div className="space-y-3">
                <p>Cuenta cuántas veces aparece <span className="font-mono text-xl font-bold text-primary">{cur.item.target}</span></p>
                <div className="inline-grid gap-1 font-mono text-lg" role="img" aria-label={`Cuadrícula de ${cur.item.grid.length} por ${cur.item.grid.length}`} style={{ gridTemplateColumns: `repeat(${cur.item.grid.length}, 1.75rem)` }}>
                  {cur.item.grid.flat().map((c, i) => <span key={i} className="text-center">{c}</span>)}
                </div>
              </div>
            }
          />
        ) : null}
        {cur.kind === "calculo" ? <NumericStep key={idx} onSubmit={submit} unit={cur.item.unit} prompt={<p className="leading-relaxed">{cur.item.prompt}</p>} /> : null}
        {cur.kind === "espacial" ? (
          <div key={idx} className="space-y-4">
            <p>¿Cuál es la misma figura, solo girada?</p>
            <div className="flex justify-center rounded-lg border bg-subtle py-4"><PolyShape cells={cur.item.base} label="Figura original" /></div>
            <ChoiceStep onPick={submit} options={cur.item.options.map((o, i) => <PolyShape key={i} cells={o} label={`Opción ${LETTERS[i]}`} />)} />
          </div>
        ) : null}
        {cur.kind === "abstracto" ? (
          <div key={idx} className="space-y-4">
            <p>¿Qué elemento continúa la serie?</p>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-subtle px-4 py-4">
              {cur.item.series.map((t, i) => <FigureView key={i} term={t} label={`Elemento ${i + 1}: ${describeTerm(t)}`} />)}
              <span className="flex h-14 w-14 items-center justify-center rounded-md border-2 border-dashed border-primary text-xl font-bold text-primary">?</span>
            </div>
            <ChoiceStep onPick={submit} options={cur.item.options.map((o, i) => <FigureView key={i} term={o} label={`Opción ${LETTERS[i]}: ${describeTerm(o)}`} />)} />
          </div>
        ) : null}
        {cur.kind === "memoria" ? <MemoriaStep key={idx} item={cur.item} onSubmit={submit} /> : null}
        {cur.kind === "multitarea" ? <MultiStep item={cur.item} onSample={onSample} onAnswer={onAnswer} remaining={remaining} onAllAnswered={finish} /> : null}
      </div>
    </Section>
  )
}
