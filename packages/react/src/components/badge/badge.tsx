import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "neutral" | "accent" | "outline" | "danger";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
  variant?: BadgeVariant;
}

/** Small status or count label. Keep the text short: one or two words. */
export function Badge({ variant = "neutral", className, ...props }: BadgeProps) {
  return <span className={cn("eui-badge", `eui-badge--${variant}`, className)} {...props} />;
}
