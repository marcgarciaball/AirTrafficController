import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { StepProps } from "../types"
import { OptionList, StepFieldset } from "./step-fieldset"

const OPTIONS = [
  { value: "sin_cita", label: "No, ni cita" },
  { value: "cita", label: "Tengo cita" },
  { value: "vigente", label: "Sí, en vigor" },
  { value: "otra_clase", label: "Tengo otra clase" },
]

export function StepMedical({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Médico de Clase 3">
      <OptionList name="medical" options={OPTIONS} value={draft.medical_status} onChange={(v) => set({ medical_status: v })} />
      {draft.medical_status === "vigente" ? (
        <div className="space-y-2">
          <Label htmlFor="medical_valid_until">Válido hasta</Label>
          <Input id="medical_valid_until" type="date" value={draft.medical_valid_until} onChange={(e) => set({ medical_valid_until: e.target.value })} required />
        </div>
      ) : null}
    </StepFieldset>
  )
}
