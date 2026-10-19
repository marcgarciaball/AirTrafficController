import { generateAbstracto, type AbstractoItem } from "./abstracto"
import { generateAtencion, type AtencionItem } from "./atencion"
import { generateCalculo, type CalculoItem } from "./calculo"
import { generateEspacial, type EspacialItem } from "./espacial"
import { kindConfig, type Kind } from "./kinds"
import { generateMemoria, type MemoriaItem } from "./memoria"
import { generateMultitarea, type MultitareaItem } from "./multitarea"

export type AptItem =
  | { kind: "atencion"; item: AtencionItem }
  | { kind: "espacial"; item: EspacialItem }
  | { kind: "abstracto"; item: AbstractoItem }
  | { kind: "memoria"; item: MemoriaItem }
  | { kind: "calculo"; item: CalculoItem }
  | { kind: "multitarea"; item: MultitareaItem }

/** Conjunto reproducible de ejercicios: cada elemento usa una subsemilla derivada. */
export function generateSet(kind: Kind, level: number, seed: number): AptItem[] {
  if (kind === "multitarea") return [{ kind, item: generateMultitarea(level, seed) }]
  const { count } = kindConfig(kind, level)
  return Array.from({ length: count }, (_, i): AptItem => {
    const s = seed + i * 104729
    switch (kind) {
      case "atencion":
        return { kind, item: generateAtencion(level, s) }
      case "espacial":
        return { kind, item: generateEspacial(level, s) }
      case "abstracto":
        return { kind, item: generateAbstracto(level, s) }
      case "memoria":
        return { kind, item: generateMemoria(level, s) }
      case "calculo":
        return { kind, item: generateCalculo(level, s) }
    }
  })
}
