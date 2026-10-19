"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteSession } from "../../sesion/actions"

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [confirm, setConfirm] = useState(false)
  const [pending, start] = useTransition()
  if (!confirm) {
    return (
      <Button type="button" size="xs" variant="outline" onClick={() => setConfirm(true)}>
        Borrar
      </Button>
    )
  }
  return (
    <Button
      type="button"
      size="xs"
      variant="destructive"
      disabled={pending}
      onClick={() => start(async () => { await deleteSession(id); router.refresh() })}
    >
      Confirmar
    </Button>
  )
}
