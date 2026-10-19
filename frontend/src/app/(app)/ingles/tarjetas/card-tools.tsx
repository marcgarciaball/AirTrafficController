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
  if (!card) return <p className="text-muted-foreground">No hay tarjetas pendientes hoy. Buen trabajo.</p>
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
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">{card.deck}</p>
      <p className="text-xl leading-relaxed font-bold">{card.front}</p>
      {shown ? (
        <>
          <p className="border-t pt-5 text-lg leading-relaxed">{card.back}</p>
          <div className="flex flex-wrap gap-2">
            {GRADES.map(([g, t]) => (
              <Button key={g} type="button" size="lg" variant={g === 0 ? "destructive" : "outline"} disabled={pending} onClick={() => grade(g)}>
                {t}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Button type="button" size="lg" onClick={() => setShown(true)}>Mostrar respuesta</Button>
      )}
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
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
    <form action={submit} className="space-y-5">
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
      <Button type="submit" disabled={pending}>Crear tarjeta</Button>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </form>
  )
}

export function CardList({ cards }: { cards: { id: string; deck: string; front: string; due_on: string }[] }) {
  const [confirm, setConfirm] = useState<string | null>(null)
  const [pending, start] = useTransition()
  if (!cards.length) return <p className="text-muted-foreground">Aún no has creado tarjetas.</p>
  return (
    <ul className="divide-y divide-line">
      {cards.map((c) => (
        <li key={c.id} className="flex min-h-12 items-center gap-4 py-2.5">
          <span className="min-w-0 flex-1 truncate">{c.front}</span>
          <span className="shrink-0 text-sm text-muted-foreground">vuelve el {formatDate(c.due_on)}</span>
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
