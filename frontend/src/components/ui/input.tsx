import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// Campo con borde completo de 1 px, radio de 8 px y 44 px de alto.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-11 w-full min-w-0 rounded-md border border-input bg-card px-3 text-base text-foreground shadow-sm transition-colors outline-none placeholder:text-muted-foreground hover:border-muted-foreground/60 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-60 aria-invalid:border-danger",
        className
      )}
      {...props}
    />
  )
}

export { Input }
