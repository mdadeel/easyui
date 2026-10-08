import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useFieldContext } from "../field/field";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Visual size. Matches Button sizes. */
  size?: InputSize;
  /** Marks the input invalid (red ring, aria-invalid). Inside a Field, this is inherited. */
  invalid?: boolean;
}

/**
 * Text input. Inside a <Field>, it gets its id, description, and error
 * wiring automatically. Outside one, it works as a plain input.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid, className, id, ...props },
  ref,
) {
  const field = useFieldContext();

  const isInvalid = invalid ?? field?.invalid ?? false;
  const describedBy =
    [props["aria-describedby"], field?.descriptionId, field?.errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <input
      ref={ref}
      id={id ?? field?.id}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy}
      data-size={size}
      className={cn("eui-input", `eui-input--${size}`, className)}
      {...props}
    />
  );
});

Input.displayName = "Input";
