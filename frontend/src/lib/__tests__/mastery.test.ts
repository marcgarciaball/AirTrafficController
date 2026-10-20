import { describe, expect, it } from "vitest"
import { blockMastery, topicMastery } from "@/lib/study/mastery"

describe("mastery", () => {
  it("menos de 3 repasos usa solo la comprobacion", () => {
    expect(blockMastery(2, 3, [])).toBe(67)
  })
  it("3 o mas mezcla comprobacion y retencion", () => {
    expect(blockMastery(3, 3, [{ rating: 3 }, { rating: 3 }, { rating: 1 }])).toBe(87)
  })
  it("checkTotal 0 no da NaN", () => {
    expect(blockMastery(0, 0, [])).toBe(0)
  })
  it("topicMastery promedia solo los bloques con valor", () => {
    expect(topicMastery([{ mastery: 80 }, { mastery: null }, { mastery: 60 }])).toBe(70)
    expect(topicMastery([{ mastery: null }])).toBeNull()
  })
})
