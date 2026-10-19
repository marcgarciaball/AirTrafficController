"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CONTROL, FIELD_LABEL } from "@/components/ui-torre/field"
import { Button } from "@/components/ui/button"
import { startSession } from "./actions"

export type TaskOption = { id: string; title: string; topic_id: string | null }

export function StartPanel({ options, initialTaskId }: { options: TaskOption[]; initialTaskId: string | null }) {
  const router = useRouter()
  const [taskId, setTaskId] = useState(initialTaskId ?? "")
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()

  function go() {
    setError(null)
    start(async () => {
      const t = options.find((o) => o.id === taskId)
      const r = await startSession(t?.id ?? null, t?.topic_id ?? null)
      if ("error" in r) setError(r.error)
      else router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      <label className="block space-y-2">
        <span className={FIELD_LABEL}>Tarea vinculada</span>
        <select
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className={CONTROL}
        >
          <option value="">Sin tarea (sesión libre)</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.title}
            </option>
          ))}
        </select>
      </label>
      <Button type="button" size="lg" disabled={pending} onClick={go}>
        Empezar sesión
      </Button>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </div>
  )
}
