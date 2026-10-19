import { describe, expect, it } from "vitest"
import { pickQuestions, pickSimulacro, scoreAttempt, type QuestionRow } from "@/lib/study/quiz"

const q = (id: string, topic = "t1"): QuestionRow => ({
  id,
  topic_id: topic,
  stem: id,
  options: ["a", "b", "c", "d"],
  correct_index: 0,
  explanation: "",
  source_pages: "p. 1",
  difficulty: 2,
  reviewed: false,
})
const pool = (n: number, topic = "t1") => Array.from({ length: n }, (_, i) => q(`${topic}-${i}`, topic))

describe("pickQuestions", () => {
  it("devuelve n preguntas sin repetir", () => {
    const r = pickQuestions(pool(30), 10)
    expect(r).toHaveLength(10)
    expect(new Set(r.map((x) => x.id)).size).toBe(10)
  })
  it("es determinista con seed y no muta la entrada", () => {
    const p = pool(30)
    const copy = [...p]
    expect(pickQuestions(p, 10, 7).map((x) => x.id)).toEqual(pickQuestions(p, 10, 7).map((x) => x.id))
    expect(p).toEqual(copy)
  })
  it("seeds distintas dan órdenes distintos", () => {
    expect(pickQuestions(pool(30), 10, 1).map((x) => x.id)).not.toEqual(pickQuestions(pool(30), 10, 2).map((x) => x.id))
  })
  it("si hay menos que n devuelve todas; n<=0 devuelve vacío", () => {
    expect(pickQuestions(pool(3), 10)).toHaveLength(3)
    expect(pickQuestions(pool(3), 0)).toEqual([])
  })
})

describe("pickSimulacro", () => {
  it("reparte equitativamente entre temas con preguntas", () => {
    const r = pickSimulacro({ a: pool(40, "a"), b: pool(40, "b"), c: pool(40, "c"), vacio: [] }, 50, 1)
    expect(r).toHaveLength(50)
    const counts = r.reduce<Record<string, number>>((m, x) => ((m[x.topic_id] = (m[x.topic_id] ?? 0) + 1), m), {})
    expect(Object.keys(counts).sort()).toEqual(["a", "b", "c"])
    expect(Math.max(...Object.values(counts)) - Math.min(...Object.values(counts))).toBeLessThanOrEqual(1)
    expect(new Set(r.map((x) => x.id)).size).toBe(50)
  })
  it("redistribuye cuando un tema tiene pocas preguntas", () => {
    const r = pickSimulacro({ a: pool(2, "a"), b: pool(40, "b") }, 20, 3)
    expect(r).toHaveLength(20)
    expect(r.filter((x) => x.topic_id === "a")).toHaveLength(2)
  })
  it("devuelve todas si hay menos que n y es determinista", () => {
    const input = { a: pool(3, "a"), b: pool(4, "b") }
    expect(pickSimulacro(input)).toHaveLength(7)
    expect(pickSimulacro(input, 5, 9).map((x) => x.id)).toEqual(pickSimulacro(input, 5, 9).map((x) => x.id))
  })
  it("sin preguntas devuelve vacío", () => {
    expect(pickSimulacro({ a: [] })).toEqual([])
  })
})

describe("scoreAttempt", () => {
  it("cuenta aciertos, fallos y blancos", () => {
    expect(scoreAttempt([{ correct: true }, { correct: true }, { correct: false }, { correct: null }])).toEqual({
      total: 4, correct: 2, wrong: 1, blank: 1, pct: 50,
    })
  })
  it("sin respuestas pct es 0", () => {
    expect(scoreAttempt([])).toEqual({ total: 0, correct: 0, wrong: 0, blank: 0, pct: 0 })
  })
  it("redondea el porcentaje", () => {
    expect(scoreAttempt([{ correct: true }, { correct: false }, { correct: false }]).pct).toBe(33)
  })
})

import { parseMarkdown } from "@/lib/study/markdown"
describe("parseMarkdown", () => {
  it("parsea títulos, listas, párrafos y negrita sin HTML", () => {
    const b = parseMarkdown("### T\n\nHola **mundo** <b>x</b>\nseguido\n\n- a\n- **b**\n")
    expect(b[0]).toEqual({ type: "h3", inlines: [{ text: "T", bold: false }] })
    expect(b[1]).toEqual({
      type: "p",
      inlines: [{ text: "Hola ", bold: false }, { text: "mundo", bold: true }, { text: " <b>x</b> seguido", bold: false }],
    })
    expect(b[2]).toMatchObject({ type: "ul" })
    expect((b[2] as { items: unknown[] }).items).toHaveLength(2)
  })
})
