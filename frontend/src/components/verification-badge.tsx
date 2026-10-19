import { StatusChip } from "@/components/ui-torre/status-chip"

export function VerificationBadge({ verified }: { verified: boolean }) {
  if (verified) return null
  return <StatusChip tone="warning">pendiente de verificar</StatusChip>
}
