import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Marketing-site Card primitive (Step 2 of the redesign).
 * White surface, soft shadow, thin border, generous padding, gentle
 * hover-lift — matches the "premium corporate SaaS" reference language
 * without touching the admin dashboard's shadcn Card.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="marketing-card"
        className={cn(
          "rounded-3xl border border-border bg-card p-8",
          "soul-shadow-card",
          hoverable && "hover-lift hover:soul-shadow-lg",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="marketing-card-header"
    className={cn("mb-4 flex flex-col gap-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    data-slot="marketing-card-title"
    className={cn("font-heading text-xl font-semibold leading-snug text-foreground", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    data-slot="marketing-card-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="marketing-card-content"
    className={cn("text-foreground", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="marketing-card-footer"
    className={cn("mt-6 flex items-center gap-3 border-t border-border pt-6", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
