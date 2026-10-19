import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Teclas de la MCDU: rectangulares, trazo de 1 px y texto en mayúsculas.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border font-mono text-sm uppercase tracking-wide whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:border-line disabled:text-muted-foreground aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-cyan bg-transparent text-cyan hover:bg-surface",
        outline: "border-line bg-transparent text-foreground hover:bg-surface",
        secondary: "border-line bg-surface text-foreground hover:border-muted-foreground",
        ghost: "border-transparent text-foreground hover:bg-surface",
        destructive: "border-red bg-transparent text-red hover:bg-surface",
        link: "border-transparent px-0 text-cyan normal-case tracking-normal underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3",
        xs: "h-6 px-2 text-xs",
        sm: "h-7 px-2.5 text-xs",
        lg: "h-11 px-4",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/** Corchetes de la MCDU para la acción principal: [ ENTRAR ]. */
function Brackets({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span aria-hidden="true">[</span>
      {children}
      <span aria-hidden="true">]</span>
    </>
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {variant === "default" && !size?.startsWith("icon") ? <Brackets>{children as React.ReactNode}</Brackets> : children}
    </ButtonPrimitive>
  )
}

export { Brackets, Button, buttonVariants }
