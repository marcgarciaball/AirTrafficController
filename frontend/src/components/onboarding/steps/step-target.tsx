import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SourceLink } from "@/components/source-link"
import { VerificationBadge } from "@/components/verification-badge"
import { todayISO } from "@/lib/onboarding/schema"
import { formatDate } from "@/lib/format"
import { CUSTOM, callTargetDate, type ExamCallOption, type StepProps } from "../types"
import { OptionList, StepFieldset, type Option } from "./step-fieldset"

function nextDay(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + 1)
  return d.toISOString().slice(0, 10)
}

const STATUS = { esperada: "Esperada", publicada: "Publicada", cerrada: "Cerrada" }

export function StepTarget({ draft, set, calls }: StepProps & { calls: ExamCallOption[] }) {
  const today = todayISO()
  const options: Option[] = calls.filter((c) => c.status !== "cerrada").map((c) => {
    const phase1 = c.events.find((e) => e.kind === "fase1")
    const date = callTargetDate(c)
    const estimate = phase1 ? phase1.is_estimate : true
    return {
      value: c.id,
      label: `${c.title} (${STATUS[c.status]})`,
      disabled: !date || date <= today,
      extra: (
        <span className="block space-y-1 text-sm text-muted-foreground">
          <span className="block">
            {date ? `Fase 1: ${formatDate(date)}${estimate ? " (estimación)" : ""}` : "Sin fecha conocida"}
          </span>
          <VerificationBadge verified={c.verified} />
          {c.source ? <span className="block"><SourceLink source={c.source} /></span> : null}
        </span>
      ),
    }
  })
  options.push({ value: CUSTOM, label: "Fecha concreta" })
  return (
    <StepFieldset legend="Convocatoria objetivo">
      <OptionList name="target" options={options} value={draft.target_choice} onChange={(v) => set({ target_choice: v })} />
      {draft.target_choice === CUSTOM ? (
        <div className="space-y-1">
          <Label htmlFor="target_date">Fecha del examen</Label>
          <Input id="target_date" type="date" min={nextDay(today)} value={draft.target_date} onChange={(e) => set({ target_date: e.target.value })} required />
        </div>
      ) : null}
    </StepFieldset>
  )
}
