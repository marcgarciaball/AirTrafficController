import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { StepProps } from "../types"
import { StepFieldset } from "./step-fieldset"

export function StepTimezone({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Zona horaria" hint="Se detecta desde tu navegador; puedes cambiarla. Marca el corte de días y semanas.">
      <Label htmlFor="timezone">Zona horaria (por ejemplo Europe/Madrid)</Label>
      <Input id="timezone" value={draft.timezone} onChange={(e) => set({ timezone: e.target.value })} required />
    </StepFieldset>
  )
}
