import { StatusChip } from "./status-chip"

// Etiquetas de contenido: siempre en minúsculas y con el mismo texto en toda la app.
export function OwnTip({ className }: { className?: string }) {
  return <StatusChip tone="muted" className={className}>consejo propio · no oficial</StatusChip>
}

export function OwnContent({ reviewed = false, className }: { reviewed?: boolean; className?: string }) {
  return reviewed ? (
    <StatusChip tone="success" className={className}>contenido propio · revisado</StatusChip>
  ) : (
    <StatusChip tone="warning" className={className}>contenido propio · sin revisar</StatusChip>
  )
}

export function PendingCheck({ className }: { className?: string }) {
  return <StatusChip tone="warning" className={className}>pendiente de verificar</StatusChip>
}
