import { Annunciator } from "@/components/cockpit/annunciator"

export function VerificationBadge({ verified }: { verified: boolean }) {
  if (verified) return null
  return <Annunciator tone="amber">Pdte verificar</Annunciator>
}
