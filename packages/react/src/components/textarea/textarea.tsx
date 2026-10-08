import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { useFieldContext } from "../field/field";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Marks the textarea invalid. Inside a Field, this is inherited. */
  invalid?: boolean;
}

/**
 * Multi-line text input. Shares the Input look. Inside a <Field>, it gets its
 * id, description, and error wiring automatically.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, id, ...props },
  ref,
) {
  const field = useFieldContext();
  const isInvalid = invalid ?? field?.invalid ?? false;
  const describedBy =
    [props["aria-describedby"], field?.descriptionId, field?.errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <textarea
      ref={ref}
      id={id ?? field?.id}
      aria-invalid={isInvalid || undefined}
      aria-describedby={describedBy}
      className={cn("eui-input", "eui-textarea", className)}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
