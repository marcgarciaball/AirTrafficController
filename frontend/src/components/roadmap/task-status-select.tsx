"use client"

import { useId, useState, useTransition } from "react"
import { setTaskStatus } from "@/app/(app)/ruta/actions"
import { cn } from "@/lib/utils"
import type { TaskStatus } from "@/lib/roadmap/types"

const OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_curso", label: "En curso" },
  { value: "hecha", label: "Hecha" },
]

/** Selector de la MCDU: tres opciones en línea; la seleccionada va recuadrada en cyan. */
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

  const off = disabled || pending
  return (
    <div className="space-y-1.5">
      <fieldset
        disabled={off}
        aria-describedby={disabled && reason ? `${id}-reason` : error ? `${id}-error` : undefined}
        className="flex flex-wrap items-center gap-x-3 gap-y-2"
      >
        <legend className="float-left mr-1 text-xs uppercase tracking-wide text-foreground">Estado</legend>
        <div className="flex gap-1">
          {OPTIONS.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex h-8 cursor-pointer items-center border px-2.5 font-mono text-xs uppercase tracking-wide has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-cyan",
                value === o.value ? "border-cyan text-cyan" : "border-transparent text-muted-foreground hover:text-foreground",
                off && "cursor-not-allowed hover:text-muted-foreground"
              )}
            >
              <input
                type="radio"
                name={`${id}-status`}
                value={o.value}
                checked={value === o.value}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      {disabled && reason ? (
        <p id={`${id}-reason`} className="text-sm text-amber">
          Bloqueada: {reason}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-red">
          {error}
        </p>
      ) : null}
    </div>
  )
}
