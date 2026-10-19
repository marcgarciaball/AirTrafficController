export function VerificationBadge({ verified }: { verified: boolean }) {
  if (verified) return null
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-sm border border-warning/40 bg-warning/15 px-1.5 py-0.5 font-mono text-[10px] leading-4 font-medium uppercase tracking-[0.1em] text-[color-mix(in_oklch,var(--warning)_78%,black)] dark:text-warning">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      Pendiente de verificar
    </span>
  )
}
