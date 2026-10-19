import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionLabel({
  children,
  as: Tag = "p",
  className,
  id,
}: {
  children: ReactNode
  as?: "p" | "span" | "h2" | "div"
  className?: string
  id?: string
}) {
  return (
    <Tag
      id={id}
      className={cn("font-mono text-[11px] leading-4 font-normal uppercase tracking-[0.14em] text-muted-foreground", className)}
    >
      {children}
    </Tag>
  )
}
