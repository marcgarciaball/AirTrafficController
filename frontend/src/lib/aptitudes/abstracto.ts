import { makeRng, type Rng } from "./rng"

export type Shape = "triangulo" | "cuadrado" | "circulo" | "cruz"
export type Fig = { shape: Shape; rot: number; dots: number }
export type Term = number | Fig

export type Rule =
  | { kind: "aritmetica"; start: number; step: number }
  | { kind: "creciente"; start: number; step: number }
  | { kind: "geometrica"; start: number; factor: number }
  | { kind: "alternancia-num"; a: number; stepA: number; b: number; stepB: number }
  | { kind: "rotacion"; shape: Shape; dots: number; start: number; step: number }
  | { kind: "conteo"; shape: Shape; rot: number; start: number }
  | { kind: "alternancia-fig"; shapes: [Shape, Shape]; rot: number; dots: number }

export type AbstractoItem = {
  mode: "numeros" | "figuras"
  rule: Rule
  /** Descripción de la regla, para la revisión. */
  explanation: string
  series: Term[]
  options: Term[]
  answerIndex: number
}

const SHAPES: Shape[] = ["triangulo", "cuadrado", "circulo", "cruz"]

export const figKey = (t: Term) => (typeof t === "number" ? `n${t}` : `${t.shape}|${t.rot}|${t.dots}`)

/** Término i (desde 0) de la serie definida por la regla. */
export function applyRule(rule: Rule, i: number): Term {
  switch (rule.kind) {
    case "aritmetica":
      return rule.start + rule.step * i
    case "creciente":
      // diferencias step, step+1, step+2...
      return rule.start + rule.step * i + (i * (i - 1)) / 2
    case "geometrica":
      return rule.start * rule.factor ** i
    case "alternancia-num":
      return i % 2 === 0 ? rule.a + rule.stepA * (i / 2) : rule.b + rule.stepB * ((i - 1) / 2)
    case "rotacion":
      return { shape: rule.shape, rot: (rule.start + rule.step * i) % 360, dots: rule.dots }
    case "conteo":
      return { shape: rule.shape, rot: rule.rot, dots: rule.start + i }
    case "alternancia-fig":
      return { shape: rule.shapes[i % 2], rot: rule.rot, dots: rule.dots }
  }
}

function makeRule(level: number, mode: "numeros" | "figuras", rng: Rng): { rule: Rule; explanation: string } {
  if (mode === "numeros") {
    const kinds = ["aritmetica", "creciente", "alternancia-num", "geometrica"].slice(0, Math.min(4, 1 + Math.ceil(level / 1.5)))
    const kind = rng.pick(kinds)
    if (kind === "aritmetica") {
      const step = rng.int(2, 3 + level)
      return { rule: { kind, start: rng.int(1, 20), step }, explanation: `Cada término suma ${step} al anterior.` }
    }
    if (kind === "creciente") {
      const step = rng.int(1, 3)
      return { rule: { kind, start: rng.int(1, 10), step }, explanation: `Las diferencias crecen de 1 en 1, empezando en ${step}.` }
    }
    if (kind === "alternancia-num") {
      const stepA = rng.int(1, 4)
      const stepB = rng.int(2, 6)
      return {
        rule: { kind, a: rng.int(1, 15), stepA, b: rng.int(20, 40), stepB },
        explanation: `Dos series entrelazadas: los lugares impares suman ${stepA} y los pares suman ${stepB}.`,
      }
    }
    const factor = rng.pick([2, 3])
    return { rule: { kind: "geometrica", start: rng.int(1, 3), factor }, explanation: `Cada término se multiplica por ${factor}.` }
  }
  // Solo el triángulo cambia de aspecto al girar: el resto de figuras va siempre con rot 0.
  const shape = rng.pick(SHAPES)
  const kinds = ["rotacion", "conteo", "alternancia-fig"].slice(0, level >= 2 ? 3 : 2)
  const kind = rng.pick(kinds)
  if (kind === "rotacion") {
    const step = rng.pick([45, 90])
    return {
      rule: { kind, shape: "triangulo", dots: rng.int(0, 2), start: rng.pick([0, 45, 90]), step },
      explanation: `La figura gira ${step}° en cada paso.`,
    }
  }
  if (kind === "conteo") {
    return { rule: { kind, shape, rot: 0, start: rng.int(1, 2) }, explanation: "Se añade un punto en cada paso." }
  }
  const [a, b] = rng.shuffle(SHAPES)
  return {
    rule: { kind: "alternancia-fig", shapes: [a, b], rot: 0, dots: rng.int(0, 2) },
    explanation: "Las dos formas se alternan.",
  }
}

function distractors(answer: Term, mode: "numeros" | "figuras", step: number, rng: Rng): Term[] {
  const seen = new Set([figKey(answer)])
  const out: Term[] = []
  let guard = 0
  while (out.length < 3 && guard++ < 200) {
    let c: Term
    if (typeof answer === "number") {
      c = answer + rng.pick([-1, 1]) * rng.int(1, Math.max(3, Math.abs(step) + 2))
    } else {
      const which = answer.shape === "triangulo" ? rng.int(0, 2) : rng.int(1, 2)
      c =
        which === 0
          ? { ...answer, rot: (answer.rot + rng.pick([45, 90, 180, 270])) % 360 }
          : which === 1
            ? { ...answer, dots: Math.max(0, answer.dots + rng.pick([-1, 1, 2])) }
            : { ...answer, shape: rng.pick(SHAPES) }
    }
    if (mode === "numeros" && (c as number) < 0) continue
    const k = figKey(c)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(c)
  }
  return out
}

/** Serie de figuras o de números con regla oculta; 4 opciones para el siguiente término. */
export function generateAbstracto(level: number, seed: number): AbstractoItem {
  const rng = makeRng(seed)
  const mode: "numeros" | "figuras" = rng.next() < 0.5 ? "numeros" : "figuras"
  const { rule, explanation } = makeRule(level, mode, rng)
  const len = rule.kind === "alternancia-num" ? 6 : level >= 4 ? 5 : 4
  const series = Array.from({ length: len }, (_, i) => applyRule(rule, i))
  const answer = applyRule(rule, len)
  const stepHint = typeof answer === "number" ? answer - (series[len - 1] as number) : 0
  const options = [answer, ...distractors(answer, mode, stepHint, rng)]
  const order = rng.shuffle(options.map((_, i) => i))
  return { mode, rule, explanation, series, options: order.map((i) => options[i]), answerIndex: order.indexOf(0) }
}
