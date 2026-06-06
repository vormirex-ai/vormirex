import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary-gradient text-[#031B1A] font-semibold rounded-2xl shadow-primary-glow hover:brightness-105 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",
        secondary:
          "bg-card border border-border text-foreground font-semibold rounded-2xl hover:bg-muted transition-all duration-300 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300",

        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground border border-primary",

        ghost:
          "hover:bg-muted hover:text-foreground",

        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 rounded-2xl",

        link:
          "text-primary underline-offset-4 hover:underline",
      },

      size: {
        default:
          "h-10 px-5 text-sm",

        xs:
          "h-7 px-3 text-xs",

        sm:
          "h-9 px-5 text-sm",

        lg:
          "h-14 px-10 text-lg",

        icon:
          "size-10",

        "icon-xs":
          "size-7",

        "icon-sm":
          "size-8",

        "icon-lg":
          "size-12",
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
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }