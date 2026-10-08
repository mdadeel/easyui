import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export interface LinkProps extends ComponentPropsWithoutRef<"a"> {
  /** When the underline shows. "hover" keeps body text calm. */
  underline?: "always" | "hover" | "none";
}

/**
 * Inline link. Uses the accent for color and an offset underline, so the
 * text stays readable on any brand color.
 */
export function Link({ underline = "always", className, children, ...props }: LinkProps) {
  return (
    <a className={cn("eui-link", `eui-link--${underline}`, className)} {...props}>
      {children}
    </a>
  );
}
