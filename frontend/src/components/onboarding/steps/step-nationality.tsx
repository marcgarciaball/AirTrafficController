import type { StepProps } from "../types"
import { OptionList, StepFieldset } from "./step-fieldset"

const OPTIONS = [
  { value: "espanola", label: "Española" },
  { value: "ue", label: "UE o libre circulación" },
  { value: "residente", label: "Extranjera con residencia legal en España" },
  { value: "ninguna", label: "Ninguna de las anteriores" },
]

export function StepNationality({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Nacionalidad o residencia">
      <OptionList name="nationality" options={OPTIONS} value={draft.nationality_status} onChange={(v) => set({ nationality_status: v })} />
    </StepFieldset>
  )
}
