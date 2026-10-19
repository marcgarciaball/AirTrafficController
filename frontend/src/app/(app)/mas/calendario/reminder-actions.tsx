"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteReminder, setReminderDone } from "./actions"

export function ReminderActions({ id, done }: { id: string; done: boolean }) {
  const router = useRouter()
  const [pending, start] = useTransition()
  const run = (fn: () => Promise<unknown>) => start(async () => { await fn(); router.refresh() })
  return (
    <div className="flex shrink-0 gap-2">
      <Button type="button" size="xs" variant="outline" disabled={pending} onClick={() => run(() => setReminderDone(id, !done))}>
        {done ? "Reabrir" : "Hecho"}
      </Button>
      <Button type="button" size="xs" variant="outline" disabled={pending} onClick={() => run(() => deleteReminder(id))}>
        Borrar
      </Button>
    </div>
  )
}
