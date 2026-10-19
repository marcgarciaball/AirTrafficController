import { cn } from "@/lib/utils"

/** Torre de control en trazo simple: fanal acristalado, fuste y dos ondas de radio. */
export function TowerMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={cn("size-6", className)}>
      <path d="M8 9h8l-1.2 4H9.2L8 9Z" />
      <path d="M10 13v8M14 13v8M8.5 21h7" />
      <path d="M12 9V6.5" />
      <path d="M8.6 4.4a4.8 4.8 0 0 1 6.8 0" className="text-guide" stroke="currentColor" />
      <path d="M6.5 2.6a7.8 7.8 0 0 1 11 0" className="text-guide" stroke="currentColor" opacity="0.55" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-lg font-bold text-foreground", className)}>
      <TowerMark className="text-primary" />
      Torre
    </span>
  )
}
