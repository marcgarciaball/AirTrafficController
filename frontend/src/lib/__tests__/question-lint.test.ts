import { describe, expect, it } from "vitest"
import { lintQuestions, positionBalance } from "@/lib/study/question-lint"

const q = (id: string, correct: number, lens: number[]) => ({
  id,
  correct_index: correct,
  options: lens.map((n) => "x".repeat(n)),
})

describe("lintQuestions", () => {
  it("detecta sesgo cuando la correcta es la mas larga en 6 de 10", () => {
    const qs = Array.from({ length: 10 }, (_, i) =>
      i < 6 ? q(`q${i}`, 0, [11, 10, 10, 10]) : q(`q${i}`, 0, [10, 10, 10, 10]),
    )
    const r = lintQuestions(qs)
    expect(r.filter((x) => x.issue === "longest_bias")).toEqual([{ id: "*", issue: "longest_bias" }])
  })
  it("detecta longitud fuera de +-20%", () => {
    const r = lintQuestions([q("a", 1, [10, 30, 10, 10]), q("b", 1, [10, 11, 10, 10])])
    expect(r).toContainEqual({ id: "a", issue: "length_out_of_range" })
    expect(r.find((x) => x.id === "b")).toBeUndefined()
  })
  it("positionBalance cuenta posiciones correctas", () => {
    expect(positionBalance([q("a", 0, [1, 1, 1, 1]), q("b", 3, [1, 1, 1, 1]), q("c", 3, [1, 1, 1, 1])])).toEqual([1, 0, 0, 2])
  })
})
