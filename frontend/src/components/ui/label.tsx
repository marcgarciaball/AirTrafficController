"use client"

import * as React from "react"
import { cn } from "cn"

// Etiqueta de la MCDU: pequeña, en mayúsculas y en cyan.
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs leading-4 font-normal uppercase tracking-wide text-cyan select-none peer-disabled:cursor-not-allowed peer-disabled:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
