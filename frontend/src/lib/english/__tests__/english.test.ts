import { describe, it, expect } from "vitest"
import { endorsementExpiry, expiryStatus, latestEndorsement, endorsementObjective } from "@/lib/english/endorsement"
import { sm2, newCard } from "@/lib/english/sm2"
import { weeklyPlan, SKILL_SHARE } from "@/lib/english/plan"
import { percent, chartPoints } from "@/lib/english/chart"

describe("endorsementExpiry (ATCO.B.035)", () => {
  it("nivel 4: 3 años", () => expect(endorsementExpiry(4, "en", "2026-03-10")).toBe("2029-03-10"))
  it("nivel 5: 6 años", () => expect(endorsementExpiry(5, "es", "2026-03-10")).toBe("2032-03-10"))
  it("nivel 6 en inglés: 9 años", () => expect(endorsementExpiry(6, "en", "2026-03-10")).toBe("2035-03-10"))
  it("nivel 6 en castellano: ilimitada", () => expect(endorsementExpiry(6, "es", "2026-03-10")).toBeNull())
  it("29 de febrero se ajusta al 28", () => expect(endorsementExpiry(4, "en", "2024-02-29")).toBe("2027-02-28"))
  it("acepta Date", () => expect(endorsementExpiry(4, "en", new Date("2026-03-10T00:00:00Z"))).toBe("2029-03-10"))
  it("rechaza nivel o fecha no válidos", () => {
    expect(() => endorsementExpiry(3 as never, "en", "2026-01-01")).toThrow()
    expect(() => endorsementExpiry(4, "en", "no")).toThrow()
  })
})

describe("expiryStatus", () => {
  it("ilimitada", () => expect(expiryStatus(null, "2026-10-19")).toBe("ilimitada"))
  it("vigente", () => expect(expiryStatus("2029-03-10", "2026-10-19")).toBe("vigente"))
  it("caduca pronto (menos de 180 días)", () => expect(expiryStatus("2027-02-01", "2026-10-19")).toBe("pronto"))
  it("caduca el mismo día: aún vigente hasta esa fecha", () => expect(expiryStatus("2026-10-19", "2026-10-19")).toBe("pronto"))
  it("caducada", () => expect(expiryStatus("2026-10-18", "2026-10-19")).toBe("caducada"))
})

describe("sm2", () => {
  const today = "2026-10-19"
  it("tarjeta nueva", () => expect(newCard()).toEqual({ ease: 2.5, interval_days: 0, reps: 0 }))
  it("primer acierto: 1 día", () => {
    const r = sm2(newCard(), 4, today)
    expect(r.reps).toBe(1)
    expect(r.interval_days).toBe(1)
    expect(r.due_on).toBe("2026-10-20")
  })
  it("segundo acierto: 6 días", () => {
    const r = sm2({ ease: 2.5, interval_days: 1, reps: 1 }, 4, today)
    expect(r.interval_days).toBe(6)
    expect(r.reps).toBe(2)
  })
  it("tercer acierto: intervalo × facilidad", () => {
    const r = sm2({ ease: 2.5, interval_days: 6, reps: 2 }, 5, today)
    expect(r.interval_days).toBe(15)
    expect(r.ease).toBeCloseTo(2.6, 5)
  })
  it("fallo: reinicia y vuelve mañana, sin tocar la facilidad", () => {
    const r = sm2({ ease: 2.3, interval_days: 15, reps: 4 }, 2, today)
    expect(r).toMatchObject({ reps: 0, interval_days: 1, ease: 2.3, due_on: "2026-10-20" })
  })
  it("la facilidad nunca baja de 1.3", () => {
    let c = { ease: 1.35, interval_days: 6, reps: 2 }
    for (let i = 0; i < 5; i++) c = sm2(c, 3, today)
    expect(c.ease).toBeGreaterThanOrEqual(1.3)
  })
  it("nota 3 baja la facilidad, nota 4 la mantiene", () => {
    expect(sm2(newCard(), 3, today).ease).toBeCloseTo(2.36, 5)
    expect(sm2(newCard(), 4, today).ease).toBeCloseTo(2.5, 5)
  })
  it("rechaza notas fuera de 0..5", () => {
    expect(() => sm2(newCard(), 6, today)).toThrow()
    expect(() => sm2(newCard(), -1, today)).toThrow()
    expect(() => sm2(newCard(), 2.5, today)).toThrow()
  })
  it("no muta la entrada", () => {
    const c = newCard()
    sm2(c, 5, today)
    expect(c).toEqual({ ease: 2.5, interval_days: 0, reps: 0 })
  })
})

describe("weeklyPlan", () => {
  it("el reparto suma exactamente el total", () => {
    for (const m of [0, 1, 7, 59, 60, 95, 180, 333, 1000]) {
      const p = weeklyPlan(m)
      expect(p.reading_use + p.writing + p.listening + p.speaking).toBe(m)
    }
  })
  it("cuatro destrezas, enteros no negativos", () => {
    const p = weeklyPlan(150)
    expect(Object.keys(p).sort()).toEqual(["listening", "reading_use", "speaking", "writing"])
    for (const v of Object.values(p)) expect(Number.isInteger(v) && v >= 0).toBe(true)
  })
  it("las proporciones suman 1", () => expect(Object.values(SKILL_SHARE).reduce((a, b) => a + b, 0)).toBeCloseTo(1, 10))
  it("sigue las proporciones cuando es exacto", () => expect(weeklyPlan(100)).toEqual({ reading_use: 30, writing: 25, listening: 25, speaking: 20 }))
  it("entradas no válidas dan cero", () => {
    expect(weeklyPlan(-5)).toEqual({ reading_use: 0, writing: 0, listening: 0, speaking: 0 })
    expect(weeklyPlan(Number.NaN)).toEqual({ reading_use: 0, writing: 0, listening: 0, speaking: 0 })
  })
})

describe("chart", () => {
  it("percent", () => {
    expect(percent(15, 20)).toBe(75)
    expect(percent(5, 0)).toBeNull()
    expect(percent(30, 20)).toBe(100)
  })
  it("sin datos no hay puntos", () => expect(chartPoints([], 300, 100)).toEqual([]))
  it("un solo dato va centrado", () => {
    const [p] = chartPoints([{ taken_on: "2026-10-01", score: 10, max_score: 20 }], 300, 100)
    expect(p.x).toBe(150)
    expect(p.y).toBe(50)
    expect(p.pct).toBe(50)
  })
  it("ordena por fecha y escala: 100 % arriba, 0 % abajo", () => {
    const pts = chartPoints(
      [
        { taken_on: "2026-10-10", score: 20, max_score: 20 },
        { taken_on: "2026-10-01", score: 0, max_score: 20 },
      ],
      300,
      100,
    )
    expect(pts.map((p) => p.date)).toEqual(["2026-10-01", "2026-10-10"])
    expect(pts[0]).toMatchObject({ x: 0, y: 100 })
    expect(pts[1]).toMatchObject({ x: 300, y: 0 })
  })
  it("ignora registros sin nota o sin máximo", () => {
    const pts = chartPoints(
      [
        { taken_on: "2026-10-01", score: null, max_score: 20 },
        { taken_on: "2026-10-02", score: 5, max_score: null },
        { taken_on: "2026-10-03", score: 5, max_score: 10 },
      ],
      300,
      100,
    )
    expect(pts).toHaveLength(1)
  })
})

describe("objetivos de anotación", () => {
  const today = "2026-10-19"
  it("sin anotación", () => expect(endorsementObjective([], "en", today)).toBe("sin-anotacion"))
  it("usa la más reciente", () => {
    const l = [
      { language: "en" as const, level: 4, assessed_on: "2020-01-01" },
      { language: "en" as const, level: 5, assessed_on: "2026-05-01" },
    ]
    expect(latestEndorsement(l, "en")?.level).toBe(5)
    expect(endorsementObjective(l, "en", today)).toBe("vigente")
  })
  it("castellano exige nivel 6", () => {
    expect(endorsementObjective([{ language: "es", level: 5, assessed_on: "2026-05-01" }], "es", today)).toBe("nivel-insuficiente")
    expect(endorsementObjective([{ language: "es", level: 6, assessed_on: "2026-05-01" }], "es", today)).toBe("ilimitada")
  })
  it("inglés nivel 4 caducado", () =>
    expect(endorsementObjective([{ language: "en", level: 4, assessed_on: "2020-01-01" }], "en", today)).toBe("caducada"))
  it("no mezcla idiomas", () =>
    expect(endorsementObjective([{ language: "es", level: 6, assessed_on: "2026-05-01" }], "en", today)).toBe("sin-anotacion"))
})
