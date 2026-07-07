import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Marketing-site Button primitive (Step 2 of the redesign).
 *
 * Kept separate from src/components/ui/button.tsx (the shadcn/base-ui
 * primitive used by the admin dashboard) so the public-facing redesign
 * never risks breaking admin screens. Built on the Step 1 tokens:
 * --primary (forest green), --accent (gold), --radius (16px base).
 */
const buttonVariants = cva(
  [
    "btn-lift inline-flex items-center justify-center gap-2",
    "rounded-2xl text-sm font-medium whitespace-nowrap",
    "transition-colors outline-none select-none",
    "focus-visible:ring-3 focus-visible:ring-ring/40",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary: solid forest green fill, per redesign brief
        primary:
          "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),black_10%)] soul-shadow-card",
        // Secondary: white bg, green border + text (brief explicitly
        // moved this off the old solid-brown fill)
        secondary:
          "bg-secondary text-secondary-foreground border-2 border-primary hover:bg-primary hover:text-primary-foreground",
        // Gold: reserved for standout / highlight CTAs only
        gold:
          "bg-accent text-accent-foreground hover:bg-[color-mix(in_oklch,var(--accent),black_10%)] soul-shadow-card",
        // Ghost: quiet, for tertiary actions inside busy layouts
        ghost:
          "bg-transparent text-foreground hover:bg-muted",
        // Link: text-only, underline on hover
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto rounded-none",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-[50px] px-6 text-base",
        lg: "h-[58px] px-8 text-base",
        icon: "size-[50px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-slot="marketing-button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
