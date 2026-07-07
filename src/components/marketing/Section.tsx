import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Marketing-site Section wrapper (Step 2 of the redesign).
 * Wraps every page section in the 1200px container + 80-120px vertical
 * rhythm defined in Step 1 (.container-app / .section-y), with an
 * optional alternating background so pages get visual separation
 * without every component re-implementing spacing by hand.
 */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  background?: "default" | "muted" | "primary";
  /** Set false to opt a section out of the standard vertical rhythm. */
  spacing?: boolean;
  containerClassName?: string;
}

const backgroundClasses: Record<NonNullable<SectionProps["background"]>, string> = {
  default: "bg-background",
  muted: "bg-muted",
  primary: "soul-gradient-green text-primary-foreground",
};

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      as = "section",
      background = "default",
      spacing = true,
      className,
      containerClassName,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = as as React.ElementType;
    return (
      <Comp
        ref={ref}
        data-slot="marketing-section"
        className={cn(backgroundClasses[background], spacing && "section-y", className)}
        {...props}
      >
        <div className={cn("container-app", containerClassName)}>{children}</div>
      </Comp>
    );
  }
);
Section.displayName = "Section";

export { Section };
