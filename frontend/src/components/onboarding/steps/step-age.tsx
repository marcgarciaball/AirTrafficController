import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { StepProps } from "../types"
import { StepFieldset } from "./step-fieldset"

export function StepAge({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Edad" hint="Hay que tener entre 18 y 64 años en la fecha de fin del plazo de inscripción.">
      <div className="space-y-2">
        <Label htmlFor="birth_date">Fecha de nacimiento</Label>
        <Input id="birth_date" type="date" value={draft.birth_date} onChange={(e) => set({ birth_date: e.target.value })} required />
      </div>
    </StepFieldset>
  )
}
