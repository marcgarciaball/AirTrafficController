"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { startSession } from "../sesion/actions"

export function StartButton({ taskId, topicId }: { taskId: string; topicId: string | null }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [pending, start] = useTransition()
  return (
    <div className="space-y-3">
      <Button
        type="button"
        size="lg"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setError(null)
            const r = await startSession(taskId, topicId)
            if ("error" in r) setError(r.error)
            else router.push("/sesion")
          })
        }
      >
        Empezar sesión
      </Button>
      {error ? <p role="alert" className="text-danger">{error}</p> : null}
    </div>
  )
}
