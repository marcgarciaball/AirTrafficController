"use client"

import { useId, useState, useTransition } from "react"
import { setTaskStatus } from "@/app/(app)/ruta/actions"
import type { TaskStatus } from "@/lib/roadmap/types"

const OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_curso", label: "En curso" },
  { value: "hecha", label: "Hecha" },
]

export function TaskStatusSelect({
  taskId,
  status,
  disabled = false,
  reason,
}: {
  taskId: string
  status: TaskStatus
  disabled?: boolean
  reason?: string
}) {
  const id = useId()
  const [value, setValue] = useState<TaskStatus>(status)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function onChange(next: TaskStatus) {
    const prev = value
    setValue(next)
    setError(null)
    startTransition(async () => {
      const res = await setTaskStatus(taskId, next)
      if (res?.error) {
        setValue(prev)
        setError(res.error)
      }
    })
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
          Estado
        </label>
        <select
          id={id}
          value={value}
          disabled={disabled || pending}
          aria-describedby={disabled && reason ? `${id}-reason` : error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value as TaskStatus)}
          className="h-8 rounded-sm border bg-muted/40 px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      {disabled && reason ? (
        <p id={`${id}-reason`} className="text-xs text-muted-foreground">
          Bloqueada: {reason}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  )
}
