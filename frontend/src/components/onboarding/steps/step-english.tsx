import type { StepProps } from "../types"
import { OptionList, StepFieldset } from "./step-fieldset"

const OPTIONS = [
  { value: "b1_o_menos", label: "B1 o inferior" },
  { value: "b2", label: "B2" },
  { value: "c1", label: "C1" },
  { value: "c2", label: "C2" },
]

export function StepEnglish({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Nivel de inglés">
      <OptionList name="english" options={OPTIONS} value={draft.english_level} onChange={(v) => set({ english_level: v })} />
    </StepFieldset>
  )
}
