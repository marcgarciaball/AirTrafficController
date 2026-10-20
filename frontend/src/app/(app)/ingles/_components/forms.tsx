"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { weeklyPlan, SKILL_ORDER, type EnglishSkill } from "@/lib/english/plan"
import { SKILL_RESOURCES } from "@/lib/english/resources"
import { addEndorsement, addLog, deleteEndorsement, deleteLog } from "../actions"
import { CAP, LABEL, SELECT } from "./ui"

const GOALS = [
  ["c1", "C1 de ENAIRE"],
  ["oaci_en", "OACI inglés"],
  ["oaci_es", "OACI castellano"],
] as const
const SKILLS = [
  ["reading", "Reading"],
  ["use", "Use of English"],
  ["writing", "Writing"],
  ["listening", "Listening"],
  ["speaking", "Speaking"],
] as const

const num = (v: FormDataEntryValue | null) => (v === null || String(v).trim() === "" ? null : Number(String(v).replace(",", ".")))

export function LogForm({ today }: { today: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  function submit(fd: FormData) {
    setError(null)
    const g = (k: string) => String(fd.get(k) ?? "")
    start(async () => {
      const r = await addLog({
        goal: g("goal") as "c1",
        skill: g("skill") as "reading",
        part: g("part").trim() || null,
        taken_on: g("taken_on"),
        score: num(fd.get("score")),
        max_score: num(fd.get("max_score")),
        notes: g("notes").trim() || null,
      })
      if (r.error) setError(r.error)
    })
  }
  return (
    <form action={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={LABEL}>
          <span className={CAP}>Objetivo</span>
          <select name="goal" className={SELECT}>
            {GOALS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
        </label>
        <label className={LABEL}>
          <span className={CAP}>Destreza</span>
          <select name="skill" className={SELECT}>
            {SKILLS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}
          </select>
        </label>
        <label className={LABEL}>
          <span className={CAP}>Fecha</span>
          <Input name="taken_on" type="date" required max={today} defaultValue={today} />
        </label>
        <label className={LABEL}>
          <span className={CAP}>Parte</span>
          <Input name="part" maxLength={80} placeholder="Part 2, Fase 1…" />
        </label>
        <label className={LABEL}>
          <span className={CAP}>Nota</span>
          <Input name="score" type="number" step="any" min={0} inputMode="decimal" />
        </label>
        <label className={LABEL}>
          <span className={CAP}>Máximo</span>
          <Input name="max_score" type="number" step="any" min={0} inputMode="decimal" />
        </label>
      </div>
      <label className={LABEL}>
        <span className={CAP}>Notas</span>
        <Input name="notes" maxLength={1000} />
      </label>
      <Button type="submit" disabled={pending}>Añadir prueba</Button>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </form>
  )
}

export function EndorsementForm({ today }: { today: string }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  function submit(fd: FormData) {
    setError(null)
    const g = (k: string) => String(fd.get(k) ?? "")
    start(async () => {
      const r = await addEndorsement({
        language: g("language") as "en",
        level: Number(g("level")),
        assessed_on: g("assessed_on"),
        center: g("center").trim() || null,
      })
      if (r.error) setError(r.error)
    })
  }
  return (
    <form action={submit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={LABEL}>
          <span className={CAP}>Idioma</span>
          <select name="language" className={SELECT}>
            <option value="en">Inglés</option>
            <option value="es">Castellano</option>
          </select>
        </label>
        <label className={LABEL}>
          <span className={CAP}>Nivel OACI</span>
          <select name="level" defaultValue="4" className={SELECT}>
            <option value="4">4 (Operacional)</option>
            <option value="5">5 (Avanzado)</option>
            <option value="6">6 (Experto)</option>
          </select>
        </label>
        <label className={LABEL}>
          <span className={CAP}>Fecha de evaluación</span>
          <Input name="assessed_on" type="date" required max={today} defaultValue={today} />
        </label>
        <label className={LABEL}>
          <span className={CAP}>Centro</span>
          <Input name="center" maxLength={120} />
        </label>
      </div>
      <Button type="submit" disabled={pending}>Añadir anotación</Button>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </form>
  )
}

export function DeleteButton({ id, kind }: { id: string; kind: "log" | "endorsement" }) {
  const [confirm, setConfirm] = useState(false)
  const [pending, start] = useTransition()
  if (!confirm) {
    return <Button type="button" size="xs" variant="ghost" className="text-muted-foreground" onClick={() => setConfirm(true)}>Borrar</Button>
  }
  return (
    <Button
      type="button"
      size="xs"
      variant="destructive"
      disabled={pending}
      onClick={() => start(async () => { await (kind === "log" ? deleteLog(id) : deleteEndorsement(id)) })}
    >
      Confirmar borrado
    </Button>
  )
}

const SKILL_LABEL: Record<EnglishSkill, string> = {
  reading_use: "Reading and Use of English",
  writing: "Writing",
  listening: "Listening",
  speaking: "Speaking",
}

export function WeeklyPlan() {
  const [minutes, setMinutes] = useState(180)
  const plan = weeklyPlan(minutes)
  return (
    <div className="space-y-5">
      <label className={LABEL}>
        <span className={CAP}>Minutos de inglés por semana</span>
        <Input
          type="number"
          min={0}
          max={3000}
          step={15}
          value={Number.isFinite(minutes) ? minutes : 0}
          onChange={(e) => setMinutes(Math.max(0, Number(e.target.value)))}
          className="max-w-32"
        />
      </label>
      <ul className="divide-y divide-line border-y">
        {SKILL_ORDER.map((s) => (
          <li key={s} className="flex min-h-12 flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
            <div className="space-y-1">
              <p>{SKILL_LABEL[s]}</p>
              <p className="flex flex-wrap gap-x-3 text-sm">
                {SKILL_RESOURCES[s].map((r) => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="text-primary underline decoration-primary/40 hover:decoration-primary">
                    {r.label}
                  </a>
                ))}
              </p>
            </div>
            <span className="font-bold">{plan[s]} min</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
