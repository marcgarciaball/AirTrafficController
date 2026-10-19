import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "cn"

// Campo de la MCDU: una línea con borde inferior; el valor introducido va en white.
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 border-0 border-b border-line bg-transparent px-0 py-1 font-mono text-base text-foreground tabular-nums outline-none [color-scheme:dark] placeholder:text-muted-foreground hover:border-muted-foreground focus-visible:border-cyan disabled:cursor-not-allowed disabled:text-muted-foreground aria-invalid:border-red",
        className
      )}
      {...props}
    />
  )
}

export { Input }
