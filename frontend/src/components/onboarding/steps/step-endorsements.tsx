import type { Draft, StepProps } from "../types"
import { OptionList, StepFieldset } from "./step-fieldset"

const OPTIONS = [
  { value: "ninguna", label: "Ninguna" },
  { value: "ingles", label: "Inglés" },
  { value: "castellano", label: "Castellano" },
]

// Fuera del cuestionario hasta el incremento 6: `endorsement` ya no está en Draft.
type EndorsementProps = { draft: Draft & { endorsement: string }; set: (p: { endorsement: string }) => void }

export function StepEndorsements({ draft, set }: EndorsementProps) {
  return (
    <StepFieldset
      legend="Anotaciones lingüísticas OACI"
      hint="De momento no se guarda: el detalle de nivel y fecha llega con el módulo de inglés."
    >
      <OptionList name="endorsement" options={OPTIONS} value={draft.endorsement} onChange={(v) => set({ endorsement: v })} />
    </StepFieldset>
  )
}
