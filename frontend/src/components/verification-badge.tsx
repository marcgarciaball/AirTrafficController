import { Badge } from "@/components/ui/badge"

export function VerificationBadge({ verified }: { verified: boolean }) {
  if (verified) return null
  return <Badge variant="outline">Pendiente de verificar</Badge>
}
