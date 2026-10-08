import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export interface LabelProps extends ComponentPropsWithoutRef<"label"> {
  /** Shows a required marker. Pair it with `required` on the control. */
  required?: boolean;
}

/** Standalone label for controls that are not inside a <Field>. Use Field when you can. */
export function Label({ required, className, children, ...props }: LabelProps) {
  return (
    <label className={cn("eui-label", className)} {...props}>
      {children}
      {required ? (
        <span className="eui-label__required" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}
