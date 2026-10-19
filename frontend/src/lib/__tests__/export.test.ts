import { describe, it, expect } from "vitest"
import { csvField, toCsv, sessionsCsv, attemptsCsv, buildExport } from "@/lib/export/csv"

describe("csvField", () => {
  it("escapa comas, comillas y saltos", () => {
    expect(csvField('a,b')).toBe('"a,b"')
    expect(csvField('di "hola"')).toBe('"di ""hola"""')
    expect(csvField("a\nb")).toBe('"a\nb"')
  })
  it("null y undefined son vacío", () => {
    expect(csvField(null)).toBe("")
    expect(csvField(undefined)).toBe("")
  })
  it("neutraliza fórmulas pero no números negativos", () => {
    expect(csvField("=1+1")).toBe("'=1+1")
    expect(csvField("@x")).toBe("'@x")
    expect(csvField(-5)).toBe("-5")
  })
})

describe("toCsv", () => it("une con CRLF y termina en salto", () => expect(toCsv(["a", "b"], [[1, "x,y"]])).toBe('a,b\r\n1,"x,y"\r\n')))

describe("sessionsCsv", () => {
  it("calcula día local y segundos efectivos", () => {
    const csv = sessionsCsv(
      [{ id: "1", started_at: "2026-10-19T22:30:00Z", ended_at: "2026-10-19T23:30:00Z", paused_seconds: 600, paused_at: null, task_id: null, topic_id: null, origin: "manual", notes: "n,1" }],
      "Europe/Madrid",
      new Date("2026-10-20T00:00:00Z")
    )
    const [h, row] = csv.trim().split("\r\n")
    expect(h.split(",")[1]).toBe("dia")
    expect(row).toBe('1,2026-10-20,2026-10-19T22:30:00Z,2026-10-19T23:30:00Z,3000,manual,,,"n,1"')
  })
})

describe("attemptsCsv", () => {
  it("calcula la nota y deja vacío si total es 0", () => {
    const base = { id: "a", mode: "tema", topic_id: null, started_at: "s", finished_at: null, wrong: 0, blank: 0 }
    const lines = attemptsCsv([{ ...base, total: 4, correct: 3 }, { ...base, id: "b", total: 0, correct: 0 }]).trim().split("\r\n")
    expect(lines[1].endsWith(",75")).toBe(true)
    expect(lines[2].endsWith(",")).toBe(true)
  })
})

describe("buildExport", () => {
  it("separa tablas correctas de omitidas", () => {
    const e = buildExport("u1", new Date("2026-10-19T00:00:00Z"), {
      study_sessions: { data: [{ id: 1 }], error: null },
      flashcards: { data: null, error: { message: "no existe" } },
    })
    expect(e.data).toEqual({ study_sessions: [{ id: 1 }] })
    expect(e.omitted).toEqual(["flashcards"])
    expect(e.exported_at).toBe("2026-10-19T00:00:00.000Z")
    expect(e.user_id).toBe("u1")
  })
})
