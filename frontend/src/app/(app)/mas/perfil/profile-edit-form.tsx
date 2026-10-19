"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveOnboarding } from "@/app/bienvenida/actions"
import { onboardingSchema, type OnboardingAnswers } from "@/lib/onboarding/schema"

export function ProfileEditForm({ answers }: { answers: OnboardingAnswers }) {
  const [hours, setHours] = useState(String(answers.weekly_hours))
  const [date, setDate] = useState(answers.target_date)
  const [tz, setTz] = useState(answers.timezone)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = onboardingSchema.safeParse({
      ...answers,
      weekly_hours: Number(hours.replace(",", ".")),
      target_date: date,
      timezone: tz,
    })
    if (!parsed.success) return setError("Revisa las horas, la fecha y la zona horaria.")
    setError(null)
    startTransition(async () => {
      const res = await saveOnboarding(parsed.data)
      if (res?.error) setError(res.error)
    })
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="space-y-4">
        <legend className="sr-only">Editar plan</legend>
        <div className="space-y-1">
          <Label htmlFor="weekly_hours">Horas por semana</Label>
          <Input id="weekly_hours" type="number" inputMode="decimal" min={0.5} max={80} step={0.5} value={hours} onChange={(e) => setHours(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="target_date">Fecha objetivo</Label>
          <Input id="target_date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="space-y-1">
          <Label htmlFor="timezone">Zona horaria</Label>
          <Input id="timezone" value={tz} onChange={(e) => setTz(e.target.value)} required />
        </div>
      </fieldset>
      {error && <p role="alert" className="text-sm text-red">{error}</p>}
      <Button type="submit" disabled={pending}>{pending ? "Guardando…" : "Guardar cambios"}</Button>
    </form>
  )
}
