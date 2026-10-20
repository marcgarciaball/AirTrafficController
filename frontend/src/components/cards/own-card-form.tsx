"use client"

import { useRef, useState, useTransition } from "react"
import { TEXTAREA, FIELD_LABEL } from "@/components/ui-torre/field"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createOwnCard } from "@/app/(app)/estudio/[n]/b/actions"

export function OwnCardForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  const [pending, start] = useTransition()
  return (
    <form
      ref={ref}
      className="max-w-prose space-y-4"
      action={(fd) =>
        start(async () => {
          const r = await createOwnCard(String(fd.get("front") ?? ""), String(fd.get("back") ?? ""))
          setMsg(r.error ? { ok: false, text: r.error } : { ok: true, text: "Tarjeta guardada." })
          if (!r.error) ref.current?.reset()
        })
      }
    >
      <label className="block space-y-2">
        <span className={FIELD_LABEL}>Anverso</span>
        <Input name="front" required maxLength={500} />
      </label>
      <label className="block space-y-2">
        <span className={FIELD_LABEL}>Reverso</span>
        <textarea name="back" required maxLength={2000} rows={3} className={TEXTAREA} />
      </label>
      <Button type="submit" size="lg" disabled={pending}>Guardar tarjeta</Button>
      {msg ? <p role={msg.ok ? "status" : "alert"} className={msg.ok ? "text-success" : "text-danger"}>{msg.text}</p> : null}
    </form>
  )
}
