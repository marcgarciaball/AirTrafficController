export type StepKey =
  | "objetivos" | "previa" | "idea" | "explicacion" | "ejemplo"
  | "trampa" | "consejo" | "mnemotecnia" | "comprobacion" | "fuente"

type BlockLike = { example_md: string | null; mnemonic_md: string | null } & Record<string, unknown>

const has = (v: unknown) => typeof v === "string" && v.trim() !== ""

export function visibleSteps(block: BlockLike): StepKey[] {
  const all: StepKey[] = [
    "objetivos", "previa", "idea", "explicacion", "ejemplo",
    "trampa", "consejo", "mnemotecnia", "comprobacion", "fuente",
  ]
  return all.filter((k) => {
    if (k === "ejemplo") return has(block.example_md)
    if (k === "mnemotecnia") return has(block.mnemonic_md)
    return true
  })
}
