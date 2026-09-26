import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "rounded-md bg-foreground text-background hover:bg-foreground/90",
        ghost: "rounded-md hover:bg-white/5",
        heroSecondary: "liquid-glass rounded-full text-foreground hover:bg-white/[0.06]",
      },
      size: {
        default: "h-10 px-4 py-2",
        none: "",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";
