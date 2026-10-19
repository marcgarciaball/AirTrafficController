import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Botones con radio de 8 px y texto en mayúscula inicial. Todos los tamaños miden 44 px o más de alto.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-[15px] font-bold whitespace-nowrap transition-colors outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-danger [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        outline: "border-border bg-card text-foreground shadow-sm hover:bg-subtle",
        secondary: "border-transparent bg-subtle text-foreground hover:bg-line",
        ghost: "border-transparent text-foreground hover:bg-subtle",
        destructive: "border-danger/40 bg-card text-danger hover:bg-subtle",
        link: "h-auto border-transparent px-0 font-normal text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        xs: "h-11 px-2.5 text-sm font-normal",
        sm: "h-11 px-3 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
        "icon-xs": "size-11",
        "icon-sm": "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
