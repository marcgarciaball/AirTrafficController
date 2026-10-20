import { describe, expect, it } from "vitest"
import { buildSession } from "@/lib/plan/session"

describe("buildSession", () => {
  it("20 min y 200 tarjetas: 60 tarjetas y rellena con bloques", () => {
    const r = buildSession({
      todayMinutes: 20,
      dueCards: 200,
      newBlocks: [1, 2, 3, 4].map((n) => ({ id: `n${n}`, minutes: 5 })),
      weakBlocks: [{ id: "w1" }],
      failedQuestions: 30,
    })
    expect(r.cards).toBe(60)
    expect(r.weak).toEqual(["w1"])
    expect(r.blocks.length).toBeGreaterThan(0)
    expect(r.reviewQuestions).toBeLessThanOrEqual(10)
    expect(r.minutes).toBeLessThanOrEqual(20)
  })
  it("sin tiempo sobrante no anade bloques", () => {
    const r = buildSession({ todayMinutes: 10, dueCards: 500, newBlocks: [{ id: "n", minutes: 8 }], weakBlocks: [], failedQuestions: 0 })
    expect(r.cards).toBe(30)
    expect(r.blocks).toEqual([])
  })
})
