import { makeRng } from "./rng"

export type CalculoTipo = "distancia" | "tiempo" | "rumbo" | "unidades"
export type CalculoItem = { tipo: CalculoTipo; prompt: string; answer: number; unit: string }

const MINUTES = [6, 10, 12, 15, 20, 30, 60]

/** Cálculo mental de ATC. Las constantes (1 NM = 1852 m, FL = cientos de pies) son definiciones. */
export function generateCalculo(level: number, seed: number): CalculoItem {
  const rng = makeRng(seed)
  const tipos: CalculoTipo[] = ["distancia", "tiempo", "rumbo", "unidades"]
  const tipo = rng.pick(level === 1 ? tipos.slice(0, 3) : tipos)
  if (tipo === "distancia") {
    for (;;) {
      const gs = rng.int(8, 14 + level * 4) * 10
      const min = rng.pick(MINUTES)
      if ((gs * min) % 60 === 0)
        return { tipo, prompt: `Velocidad respecto al suelo ${gs} kt durante ${min} min. ¿Distancia recorrida?`, answer: (gs * min) / 60, unit: "NM" }
    }
  }
  if (tipo === "tiempo") {
    for (;;) {
      const gs = rng.int(8, 14 + level * 4) * 10
      const nm = rng.int(2, 12 + level * 6) * 5
      if ((nm * 60) % gs === 0) return { tipo, prompt: `Velocidad respecto al suelo ${gs} kt. ¿Cuántos minutos para recorrer ${nm} NM?`, answer: (nm * 60) / gs, unit: "min" }
    }
  }
  if (tipo === "rumbo") {
    const h = rng.int(1, 36) * 10
    const d = rng.int(1, level >= 3 ? 18 : 9) * 10
    const right = rng.next() < 0.5
    const raw = (right ? h + d : h - d + 360) % 360
    return {
      tipo,
      prompt: `Rumbo ${h}°. Viras ${d}° a la ${right ? "derecha" : "izquierda"}. ¿Rumbo final?`,
      answer: raw === 0 ? 360 : raw,
      unit: "°",
    }
  }
  if (rng.next() < 0.5) {
    const fl = rng.int(3, 41 - (level < 3 ? 20 : 0)) * 10
    return { tipo, prompt: `FL${fl}. ¿Cuántos pies de altitud de presión?`, answer: fl * 100, unit: "ft" }
  }
  const nm = rng.int(2, 6 + level * 2)
  return { tipo, prompt: `${nm} NM (1 NM = 1852 m). ¿Cuántos metros?`, answer: nm * 1852, unit: "m" }
}

export function checkCalculo(item: CalculoItem, value: number): boolean {
  if (!Number.isFinite(value)) return false
  return item.tipo === "rumbo" ? ((value % 360) + 360) % 360 === item.answer % 360 : value === item.answer
}
