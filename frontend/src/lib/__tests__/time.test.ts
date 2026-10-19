import { describe, it, expect } from "vitest"
import { effectiveSeconds, localDay, weekStart, totals, streak } from "@/lib/plan/time"

const S = (o: Partial<Parameters<typeof effectiveSeconds>[0]> = {}) => ({
  started_at: "2026-10-19T10:00:00Z", ended_at: "2026-10-19T11:00:00Z", paused_seconds: 0, paused_at: null, ...o,
})
const now = new Date("2026-10-19T12:00:00Z")

describe("effectiveSeconds", () => {
  it("sesión terminada sin pausas", () => expect(effectiveSeconds(S(), now)).toBe(3600))
  it("descuenta pausas acumuladas", () => expect(effectiveSeconds(S({ paused_seconds: 600 }), now)).toBe(3000))
  it("pausa en curso descuenta hasta now", () =>
    expect(effectiveSeconds(S({ ended_at: null, paused_at: "2026-10-19T11:30:00Z" }), now)).toBe(5400))
  it("sesión en marcha usa now", () => expect(effectiveSeconds(S({ ended_at: null }), now)).toBe(7200))
  it("nunca negativo", () => expect(effectiveSeconds(S({ paused_seconds: 99999 }), now)).toBe(0))
})

describe("localDay / weekStart", () => {
  it("23:30 UTC en verano es el día siguiente en Madrid", () => {
    expect(localDay("2026-07-15T23:30:00Z", "Europe/Madrid")).toBe("2026-07-16")
    expect(localDay("2026-07-15T23:30:00Z", "UTC")).toBe("2026-07-15")
  })
  it("23:30 UTC en invierno es el día siguiente (UTC+1)", () =>
    expect(localDay("2026-01-15T23:30:00Z", "Europe/Madrid")).toBe("2026-01-16"))
  it("22:30 UTC en invierno sigue siendo el mismo día", () =>
    expect(localDay("2026-01-15T22:30:00Z", "Europe/Madrid")).toBe("2026-01-15"))
  it("weekStart devuelve el lunes", () => {
    expect(weekStart("2026-10-19")).toBe("2026-10-19") // lunes
    expect(weekStart("2026-10-25")).toBe("2026-10-19") // domingo
    expect(weekStart("2026-11-01")).toBe("2026-10-26")
  })
})

describe("totals", () => {
  const sessions = [
    { ...S(), task_id: "t1", topic_id: "p1" },
    { ...S({ started_at: "2026-10-20T08:00:00Z", ended_at: "2026-10-20T08:30:00Z" }), task_id: "t1", topic_id: null },
    { ...S({ started_at: "2026-10-26T08:00:00Z", ended_at: "2026-10-26T09:00:00Z" }), task_id: null, topic_id: "p1" },
  ]
  it("agrega por día, semana, tarea y tema", () => {
    const t = totals(sessions, "Europe/Madrid", new Date("2026-10-27T00:00:00Z"))
    expect(t.byDay).toEqual({ "2026-10-19": 3600, "2026-10-20": 1800, "2026-10-26": 3600 })
    expect(t.byWeek).toEqual({ "2026-10-19": 5400, "2026-10-26": 3600 })
    expect(t.byTask).toEqual({ t1: 5400 })
    expect(t.byTopic).toEqual({ p1: 7200 })
    expect(t.total).toBe(9000)
  })
  it("incluye sesión en marcha con now", () => {
    const t = totals([{ ...S({ ended_at: null }), task_id: null, topic_id: null }], "UTC", now)
    expect(t.total).toBe(7200)
  })
})

describe("streak", () => {
  const d = (...xs: string[]) => Object.fromEntries(xs.map((x) => [x, 60]))
  it("cuenta días consecutivos terminando hoy", () =>
    expect(streak(d("2026-10-17", "2026-10-18", "2026-10-19"), "2026-10-19")).toBe(3))
  it("puede terminar ayer", () => expect(streak(d("2026-10-17", "2026-10-18"), "2026-10-19")).toBe(2))
  it("un hueco corta la racha", () =>
    expect(streak(d("2026-10-15", "2026-10-17", "2026-10-18", "2026-10-19"), "2026-10-19")).toBe(3))
  it("menos de 1 minuto no cuenta", () => expect(streak({ "2026-10-19": 59 }, "2026-10-19")).toBe(0))
  it("sin ayer ni hoy es 0", () => expect(streak(d("2026-10-16"), "2026-10-19")).toBe(0))
})
