import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/cn";

interface FieldContextValue {
  id: string;
  descriptionId: string | undefined;
  errorId: string | undefined;
  invalid: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

/** @internal Used by Input to wire label, description, and error ids. */
export function useFieldContext(): FieldContextValue | null {
  return useContext(FieldContext);
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  /** Visible label. Rendered as a real <label> bound to the control. */
  label?: ReactNode;
  /** Helper text shown under the control. Linked via aria-describedby. */
  description?: ReactNode;
  /** Error message. Shown in place of nothing; also marks the control invalid. */
  error?: ReactNode;
  /** Marks the control invalid even without an error message. */
  invalid?: boolean;
  /** Overrides the generated control id. */
  id?: string;
}

/**
 * Groups a label, control, description, and error so the accessibility wiring
 * (for/id, aria-describedby, aria-invalid) is correct by default.
 */
export function Field({
  label,
  description,
  error,
  invalid,
  id,
  className,
  children,
  ...rest
}: FieldProps) {
  const generated = useId();
  const baseId = id ?? `eui-field-${generated.replace(/:/g, "")}`;
  const hasError = error !== undefined && error !== null && error !== false && error !== "";
  const isInvalid = invalid ?? hasError;

  const value: FieldContextValue = {
    id: baseId,
    descriptionId: description ? `${baseId}-description` : undefined,
    errorId: hasError ? `${baseId}-error` : undefined,
    invalid: !!isInvalid,
  };

  return (
    <FieldContext.Provider value={value}>
      <div className={cn("eui-field", className)} {...rest}>
        {label ? (
          <label className="eui-field__label" htmlFor={baseId}>
            {label}
          </label>
        ) : null}
        {children}
        {description ? (
          <p id={value.descriptionId} className="eui-field__description">
            {description}
          </p>
        ) : null}
        {hasError ? (
          <p id={value.errorId} className="eui-field__error" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}
