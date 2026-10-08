import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. `primary` uses the theme accent. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner, disables the button, and sets aria-busy. Label stays in place. */
  loading?: boolean;
  /** Stretches to the full width of its container. */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    type = "button",
    className,
    children,
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-variant={variant}
      data-size={size}
      data-loading={loading || undefined}
      className={cn(
        "eui-button",
        `eui-button--${variant}`,
        `eui-button--${size}`,
        fullWidth && "eui-button--full",
        className,
      )}
      {...props}
    >
      {loading ? <span className="eui-button__spinner" aria-hidden="true" /> : null}
      <span className="eui-button__label">{children}</span>
    </button>
  );
});

Button.displayName = "Button";
