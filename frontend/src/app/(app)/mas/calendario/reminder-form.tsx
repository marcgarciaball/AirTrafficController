"use client"

import { useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createReminder } from "./actions"

const CAP = "block text-xs uppercase tracking-wide text-cyan"

export function ReminderForm({ today }: { today: string }) {
  const router = useRouter()
  const ref = useRef<HTMLFormElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function submit(fd: FormData) {
    setError(null)
    const g = (k: string) => String(fd.get(k) ?? "")
    start(async () => {
      const r = await createReminder({ title: g("title"), day: g("day"), time: g("time") })
      if (r.error) setError(r.error)
      else {
        ref.current?.reset()
        router.refresh()
      }
    })
  }

  return (
    <form ref={ref} action={submit} className="space-y-3">
      <label className="block space-y-1">
        <span className={CAP}>Título</span>
        <Input name="title" required maxLength={200} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block space-y-1">
          <span className={CAP}>Día</span>
          <Input name="day" type="date" required defaultValue={today} />
        </label>
        <label className="block space-y-1">
          <span className={CAP}>Hora</span>
          <Input name="time" type="time" required defaultValue="09:00" />
        </label>
      </div>
      {error ? <p role="alert" className="text-sm text-red">{error}</p> : null}
      <Button type="submit" disabled={pending}>{pending ? "Guardando…" : "Añadir recordatorio"}</Button>
    </form>
  )
}
