import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export interface SpinnerProps extends ComponentPropsWithoutRef<"span"> {
  /** Announced to screen readers while the work is in progress. */
  label?: string;
}

/**
 * Indeterminate loading indicator. Rotates with transform only. With reduced
 * motion, it shows as a static arc.
 */
export function Spinner({ label = "Loading", className, ...props }: SpinnerProps) {
  return (
    <span role="status" className={cn("eui-spinner", className)} {...props}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="eui-spinner__svg">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2.5" />
        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="eui-spinner__label">{label}</span>
    </span>
  );
}
