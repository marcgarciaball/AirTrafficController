"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { rateCard } from "@/app/(app)/flashback/actions"

export type ReviewCard = { id: string; deck: string; front: string; back: string; termEn: string | null }

const RATINGS: { value: 1 | 2 | 3 | 4; label: string; destructive?: boolean }[] = [
  { value: 1, label: "Otra vez", destructive: true },
  { value: 2, label: "Difícil" },
  { value: 3, label: "Bien" },
  { value: 4, label: "Fácil" },
]

/**
 * Repaso de la cola. `quick` (repaso rápido) no reprograma: solo recorre las tarjetas.
 * `reverse` (ES ⇄ EN) pregunta con el término en inglés y responde con el español.
 */
export function CardReview({ cards, quick, reverse }: { cards: ReviewCard[]; quick: boolean; reverse: boolean }) {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  const card = cards[index]

  const advance = useCallback(() => {
    setShown(false)
    setIndex((i) => i + 1)
  }, [])

  const rate = useCallback(
    (value: 1 | 2 | 3 | 4) => {
      if (!card || pending) return
      setError(null)
      if (quick) return advance()
      start(async () => {
        const r = await rateCard(card.id, value)
        if (r.error) setError(r.error)
        else advance()
      })
    },
    [card, pending, quick, advance],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (e.ctrlKey || e.metaKey || e.altKey || t?.closest("input, textarea, select")) return
      if (e.key === " " && !shown) {
        e.preventDefault()
        setShown(true)
      } else if (shown && "1234".includes(e.key) && e.key.length === 1) rate(Number(e.key) as 1 | 2 | 3 | 4)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [shown, rate])

  if (!card)
    return (
      <p role="status" className="text-lg text-muted-foreground">
        {cards.length === 0 ? "No hay tarjetas pendientes hoy." : "Has terminado la cola de hoy. Buen trabajo."}
      </p>
    )

  const swap = reverse && card.termEn
  const front = swap ? card.termEn! : card.front
  const back = swap ? `${card.front}\n${card.back}` : card.back

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Tarjeta {index + 1} de {cards.length} · baraja {card.deck}
        {quick ? " · repaso rápido, no cambia el calendario" : ""}
      </p>
      <p lang={swap ? "en" : undefined} className="max-w-prose text-2xl leading-relaxed font-bold">{front}</p>
      {shown ? (
        <>
          <p className="max-w-prose border-t pt-6 text-lg leading-relaxed whitespace-pre-line">{back}</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RATINGS.map((r) => (
              <Button key={r.value} type="button" size="lg" variant={r.destructive ? "destructive" : "outline"} disabled={pending} onClick={() => rate(r.value)}>
                {r.label} <span aria-hidden="true" className="font-normal text-muted-foreground">({r.value})</span>
              </Button>
            ))}
          </div>
        </>
      ) : (
        <Button type="button" size="lg" onClick={() => setShown(true)}>
          Mostrar <span aria-hidden="true" className="font-normal opacity-80">(espacio)</span>
        </Button>
      )}
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </div>
  )
}
