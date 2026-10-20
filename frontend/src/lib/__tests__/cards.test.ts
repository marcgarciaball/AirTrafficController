import { describe, expect, it } from "vitest"
import { newCardState, review } from "@/lib/cards/fsrs"
import { dailyQueue } from "@/lib/cards/queue"

describe("review", () => {
  it("rating 1 suma un lapso y vence antes que con rating 3", () => {
    const now = new Date("2026-10-20T10:00:00Z")
    let c = newCardState(now)
    for (let i = 0; i < 4 && c.state !== 2; i++) c = review(c, 3, new Date(i === 0 ? now : c.due)).card
    expect(c.state).toBe(2)
    const later = new Date(c.due)
    const again = review(c, 1, later)
    const good = review(c, 3, later)
    expect(again.card.lapses).toBe(c.lapses + 1)
    expect(new Date(again.card.due).getTime()).toBeLessThan(new Date(good.card.due).getTime())
    expect(again.log.rating).toBe(1)
  })
})

describe("dailyQueue", () => {
  const now = new Date("2026-10-20T08:00:00Z") // 10:00 Madrid
  it("500 vencidas y 10 min devuelve 75, la mas antigua primero", () => {
    const cards = Array.from({ length: 500 }, (_, i) => ({
      id: i,
      due: new Date(Date.UTC(2026, 9, 19) - i * 3600_000).toISOString(),
    }))
    const q = dailyQueue(cards, now, "Europe/Madrid", 10)
    expect(q).toHaveLength(75)
    expect(q[0].id).toBe(499)
  })
  it("due 23:30 Madrid cuenta como hoy; 00:30 de manana no", () => {
    const a = { id: "a", due: "2026-10-20T21:30:00Z" }
    const b = { id: "b", due: "2026-10-20T22:30:00Z" }
    expect(dailyQueue([a, b], now, "Europe/Madrid", 10).map((x) => x.id)).toEqual(["a"])
  })
  it("excluye suspendidas", () => {
    const s = { due: "2026-10-01T00:00:00Z", suspended: true }
    expect(dailyQueue([s], now, "Europe/Madrid", 10)).toEqual([])
  })
})
