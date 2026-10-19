import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { StepProps } from "../types"
import { StepFieldset } from "./step-fieldset"

export function StepHours({ draft, set }: StepProps) {
  return (
    <StepFieldset legend="Horas por semana" hint="Cuántas horas puedes dedicar al estudio cada semana.">
      <div className="space-y-1">
        <Label htmlFor="weekly_hours">Horas semanales</Label>
        <Input id="weekly_hours" type="number" inputMode="decimal" min={0.5} max={80} step={0.5} value={draft.weekly_hours} onChange={(e) => set({ weekly_hours: e.target.value })} required />
      </div>
      <div className="flex flex-wrap gap-2">
        {[5, 10, 20, 30].map((h) => (
          <Button
            key={h}
            type="button"
            variant="outline"
            aria-pressed={draft.weekly_hours === String(h)}
            className={draft.weekly_hours === String(h) ? "border-primary text-primary" : undefined}
            onClick={() => set({ weekly_hours: String(h) })}
          >
            {h} H
          </Button>
        ))}
      </div>
    </StepFieldset>
  )
}
