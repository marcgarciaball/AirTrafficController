import { describe, expect, it } from "vitest"
import { makeRng } from "./rng"
import { countTarget, generateAtencion } from "./atencion"
import { generateEspacial, isCongruent, isRotationOf, reflect, rotate90, normalize } from "./espacial"
import { applyRule, figKey, generateAbstracto } from "./abstracto"
import { checkMemoria, generateMemoria, parseDigits } from "./memoria"
import { checkCalculo, generateCalculo } from "./calculo"
import { generateMultitarea, multitaskScore, trackingFraction, trackingHit, trackingPosition } from "./multitarea"
import { KINDS, kindConfig, nextLevel, summarize } from "./kinds"
import { generateSet } from "./set"

const SEEDS = Array.from({ length: 60 }, (_, i) => i * 37 + 1)
const LEVELS = [1, 2, 3, 4, 5]

describe("rng", () => {
  it("es reproducible y está en [0,1)", () => {
    const a = makeRng(5)
    const b = makeRng(5)
    const xs = Array.from({ length: 20 }, () => a.next())
    expect(xs).toEqual(Array.from({ length: 20 }, () => b.next()))
    expect(xs.every((x) => x >= 0 && x < 1)).toBe(true)
    expect(makeRng(6).next()).not.toBe(makeRng(5).next())
  })
  it("int respeta el rango y shuffle conserva elementos", () => {
    const r = makeRng(9)
    for (let i = 0; i < 100; i++) {
      const n = r.int(3, 7)
      expect(n >= 3 && n <= 7).toBe(true)
    }
    expect(r.shuffle([1, 2, 3, 4, 5]).sort()).toEqual([1, 2, 3, 4, 5])
  })
})

describe("atencion", () => {
  it("la respuesta es el recuento real y es reproducible", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS) {
        const it1 = generateAtencion(lv, s)
        expect(it1.answer).toBe(countTarget(it1.grid, it1.target))
        expect(it1.answer).toBeGreaterThan(0)
        expect(generateAtencion(lv, s)).toEqual(it1)
      }
  })
  it("la cuadrícula crece con el nivel", () => {
    expect(generateAtencion(5, 1).grid.length).toBeGreaterThan(generateAtencion(1, 1).grid.length)
  })
})

describe("espacial", () => {
  it("rotar y reflejar se comportan", () => {
    const l = [[0, 0], [0, 1], [0, 2], [1, 2]] as [number, number][]
    expect(isRotationOf(l, rotate90(rotate90(rotate90(rotate90(l)))))).toBe(true)
    expect(isRotationOf(l, reflect(l))).toBe(false)
    expect(isCongruent(l, reflect(l))).toBe(true)
    expect(normalize([[3, 5], [4, 5]])).toEqual([[0, 0], [1, 0]])
  })
  it("una única opción es la figura rotada; el reflejo es distractor", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS) {
        const it1 = generateEspacial(lv, s)
        expect(it1.options).toHaveLength(4)
        const rots = it1.options.map((o) => isRotationOf(it1.base, o))
        expect(rots.filter(Boolean)).toHaveLength(1)
        expect(rots[it1.answerIndex]).toBe(true)
        expect(it1.options.some((o) => !isRotationOf(it1.base, o) && isRotationOf(reflect(it1.base), o))).toBe(true)
        expect(it1.options[it1.answerIndex]).not.toEqual(normalize(it1.base))
        for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) expect(JSON.stringify(it1.options[i])).not.toBe(JSON.stringify(it1.options[j]))
        expect(generateEspacial(lv, s)).toEqual(it1)
      }
  })
})

describe("abstracto", () => {
  it("la serie sigue la regla y solo una opción es correcta", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS) {
        const it1 = generateAbstracto(lv, s)
        expect(it1.options).toHaveLength(4)
        it1.series.forEach((t, i) => expect(figKey(t)).toBe(figKey(applyRule(it1.rule, i))))
        const expected = figKey(applyRule(it1.rule, it1.series.length))
        const hits = it1.options.filter((o) => figKey(o) === expected)
        expect(hits).toHaveLength(1)
        expect(figKey(it1.options[it1.answerIndex])).toBe(expected)
        expect(new Set(it1.options.map(figKey)).size).toBe(4)
        expect(generateAbstracto(lv, s)).toEqual(it1)
      }
  })
  it("hay series de números y de figuras", () => {
    const modes = new Set(SEEDS.map((s) => generateAbstracto(3, s).mode))
    expect(modes).toEqual(new Set(["numeros", "figuras"]))
  })
})

describe("memoria", () => {
  it("secuencia reproducible, sin repetidos seguidos, y se comprueba", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS) {
        const it1 = generateMemoria(lv, s)
        expect(it1.sequence.length).toBe(3 + lv)
        expect(it1.showSeconds).toBeGreaterThan(0)
        for (let i = 1; i < it1.sequence.length; i++) expect(it1.sequence[i]).not.toBe(it1.sequence[i - 1])
        expect(checkMemoria(it1, it1.sequence)).toBe(true)
        expect(checkMemoria(it1, [...it1.sequence].reverse().concat(0))).toBe(false)
        expect(generateMemoria(lv, s)).toEqual(it1)
      }
  })
  it("parseDigits ignora lo que no son dígitos", () => {
    expect(parseDigits("4 7-1")).toEqual([4, 7, 1])
  })
})

describe("calculo", () => {
  it("las respuestas son enteras, correctas y reproducibles", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS) {
        const it1 = generateCalculo(lv, s)
        expect(Number.isInteger(it1.answer)).toBe(true)
        expect(checkCalculo(it1, it1.answer)).toBe(true)
        expect(checkCalculo(it1, it1.answer + 1)).toBe(false)
        expect(generateCalculo(lv, s)).toEqual(it1)
      }
  })
  it("rumbos: módulo 360 y 360 equivale a 0", () => {
    const it1 = { tipo: "rumbo", prompt: "", answer: 360, unit: "°" } as const
    expect(checkCalculo(it1, 0)).toBe(true)
    const rumbos = SEEDS.map((s) => generateCalculo(4, s)).filter((i) => i.tipo === "rumbo")
    expect(rumbos.length).toBeGreaterThan(0)
    for (const r of rumbos) expect(r.answer >= 1 && r.answer <= 360).toBe(true)
  })
  it("incluye varios tipos", () => {
    expect(new Set(SEEDS.map((s) => generateCalculo(5, s).tipo)).size).toBeGreaterThanOrEqual(3)
  })
})

describe("multitarea", () => {
  it("la trayectoria es determinista y queda dentro del recuadro", () => {
    for (const lv of LEVELS)
      for (const s of SEEDS.slice(0, 10))
        for (let t = 0; t < 60000; t += 700) {
          const p = trackingPosition(s, lv, t)
          expect(p).toEqual(trackingPosition(s, lv, t))
          expect(p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1).toBe(true)
        }
    expect(trackingPosition(1, 1, 5000)).not.toEqual(trackingPosition(2, 1, 5000))
  })
  it("acierto, fracción y puntuación", () => {
    expect(trackingHit({ x: 0.5, y: 0.5 }, { x: 0.52, y: 0.5 }, 0.05)).toBe(true)
    expect(trackingHit({ x: 0.5, y: 0.5 }, { x: 0.7, y: 0.5 }, 0.05)).toBe(false)
    expect(trackingFraction(0, 0)).toBe(0)
    expect(trackingFraction(30, 60)).toBe(0.5)
    expect(multitaskScore(4, 8, 0.5)).toEqual({ score: 8, total: 16 })
  })
  it("genera cálculos reproducibles", () => {
    const m = generateMultitarea(3, 7)
    expect(m.calc.length).toBeGreaterThan(0)
    expect(generateMultitarea(3, 7)).toEqual(m)
  })
})

describe("niveles y conjuntos", () => {
  it("el nivel sube con ≥80 %, baja con <50 % y se queda entre 1 y 5", () => {
    expect(nextLevel(2, 9, 10)).toBe(3)
    expect(nextLevel(2, 6, 10)).toBe(2)
    expect(nextLevel(2, 4, 10)).toBe(1)
    expect(nextLevel(5, 10, 10)).toBe(5)
    expect(nextLevel(1, 0, 10)).toBe(1)
    expect(nextLevel(3, 0, 0)).toBe(3)
  })
  it("resumen: nivel actual y mejor marca por prueba", () => {
    const rows = [
      { kind: "atencion", level: 1, score: 9, total: 10, taken_at: "2026-10-01T10:00:00Z" },
      { kind: "atencion", level: 2, score: 5, total: 10, taken_at: "2026-10-02T10:00:00Z" },
    ]
    const s = summarize(rows)
    expect(s.atencion).toEqual({ level: 2, bestPct: 90, attempts: 2, lastPct: 50 })
    expect(s.memoria).toEqual({ level: 1, bestPct: null, attempts: 0, lastPct: null })
    expect(KINDS).toHaveLength(6)
  })
  it("el nivel actual es el siguiente tras el último intento", () => {
    const rows = [{ kind: "memoria", level: 3, score: 9, total: 10, taken_at: "2026-10-01T10:00:00Z" }]
    expect(summarize(rows).memoria.level).toBe(4)
  })
  it("generateSet es reproducible y respeta la configuración", () => {
    for (const k of KINDS) {
      const cfg = kindConfig(k, 3)
      const a = generateSet(k, 3, 99)
      expect(a).toEqual(generateSet(k, 3, 99))
      if (k !== "multitarea") expect(a).toHaveLength(cfg.count)
      expect(cfg.seconds).toBeGreaterThan(0)
    }
  })
})
