import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AlertVariant = "default" | "success" | "warning" | "danger";

export interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  variant?: AlertVariant;
  /** Optional icon shown at the start. Decorative, so give it aria-hidden. */
  icon?: ReactNode;
}

/**
 * Inline message that stays on the page (unlike a Toast, which disappears).
 * Use `role="alert"` only for errors the user must notice right away.
 */
export function Alert({ variant = "default", icon, className, children, ...props }: AlertProps) {
  return (
    <div className={cn("eui-alert", `eui-alert--${variant}`, className)} {...props}>
      {icon ? <span className="eui-alert__icon">{icon}</span> : null}
      <div className="eui-alert__body">{children}</div>
    </div>
  );
}

export function AlertTitle({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("eui-alert__title", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-alert__description", className)} {...props} />;
}
