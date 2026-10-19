import type { StepProps } from "../types"
import { OptionList, StepFieldset } from "./step-fieldset"

const OPTIONS = [
  { value: "bachiller", label: "Bachiller" },
  { value: "tecnico_superior", label: "Técnico Superior" },
  { value: "grado", label: "Grado universitario" },
  { value: "extranjero", label: "Título extranjero" },
  { value: "ninguna", label: "Ninguna" },
]

export function StepDegree({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Titulación">
      <OptionList name="degree" options={OPTIONS} value={draft.degree} onChange={(v) => set({ degree: v })} />
    </StepFieldset>
  )
}
