"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDate } from "@/lib/format"
import { addCard, deleteCard, reviewCard } from "../actions"
import { CAP, LABEL, SELECT } from "../_components/ui"

type Due = { id: string; deck: string; front: string; back: string }

const GRADES: [number, string][] = [
  [0, "0 No lo sabía"],
  [3, "3 Con esfuerzo"],
  [4, "4 Bien"],
  [5, "5 Fácil"],
]

export function Reviewer({ cards, today }: { cards: Due[]; today: string }) {
  const [shown, setShown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const [skipped, setSkipped] = useState<string[]>([])
  const queue = cards.filter((c) => !skipped.includes(c.id))
  const card = queue[0]
  if (!card) return <p className="text-sm text-muted-foreground">No hay tarjetas pendientes hoy.</p>
  function grade(g: number) {
    setError(null)
    start(async () => {
      const r = await reviewCard(card.id, g, today)
      if (r.error) setError(r.error)
      else {
        setSkipped((s) => [...s, card.id])
        setShown(false)
      }
    })
  }
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{card.deck}</p>
      <p className="text-lg">{card.front}</p>
      {shown ? (
        <>
          <p className="border-t border-line pt-3 text-green">{card.back}</p>
          <div className="flex flex-wrap gap-2">
            {GRADES.map(([g, t]) => (
              <Button key={g} type="button" variant={g === 0 ? "destructive" : "outline"} disabled={pending} onClick={() => grade(g)}>
                {t}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Button type="button" onClick={() => setShown(true)}>[ Mostrar respuesta ]</Button>
      )}
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
    </div>
  )
}

export function CardForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  function submit(fd: FormData) {
    setError(null)
    start(async () => {
      const r = await addCard({
        deck: String(fd.get("deck")) as "vocabulario",
        front: String(fd.get("front") ?? ""),
        back: String(fd.get("back") ?? ""),
      })
      if (r.error) setError(r.error)
    })
  }
  return (
    <form action={submit} className="space-y-4">
      <label className={LABEL}>
        <span className={CAP}>Mazo</span>
        <select name="deck" className={SELECT}>
          <option value="vocabulario">Vocabulario</option>
          <option value="fraseologia">Fraseología</option>
        </select>
      </label>
      <label className={LABEL}>
        <span className={CAP}>Anverso</span>
        <Input name="front" required maxLength={500} />
      </label>
      <label className={LABEL}>
        <span className={CAP}>Reverso</span>
        <Input name="back" required maxLength={1000} />
      </label>
      <Button type="submit" disabled={pending}>[ Crear tarjeta ]</Button>
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
    </form>
  )
}

export function CardList({ cards }: { cards: { id: string; deck: string; front: string; due_on: string }[] }) {
  const [confirm, setConfirm] = useState<string | null>(null)
  const [pending, start] = useTransition()
  if (!cards.length) return <p className="text-sm text-muted-foreground">Aún no has creado tarjetas.</p>
  return (
    <ul className="divide-y divide-line border-y border-line">
      {cards.map((c) => (
        <li key={c.id} className="flex items-center gap-3 py-2 text-sm">
          <span className="min-w-0 flex-1 truncate">{c.front}</span>
          <span className="shrink-0 font-mono text-muted-foreground tabular-nums">{formatDate(c.due_on)}</span>
          <Button
            type="button"
            size="xs"
            variant={confirm === c.id ? "destructive" : "outline"}
            disabled={pending}
            onClick={() => (confirm === c.id ? start(async () => { await deleteCard(c.id); setConfirm(null) }) : setConfirm(c.id))}
          >
            {confirm === c.id ? "Confirmar" : "Borrar"}
          </Button>
        </li>
      ))}
    </ul>
  )
}
