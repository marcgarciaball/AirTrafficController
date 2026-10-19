"use client"

import * as React from "react"
import { cn } from "cn"

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-[15px] leading-5 font-bold text-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Label }
