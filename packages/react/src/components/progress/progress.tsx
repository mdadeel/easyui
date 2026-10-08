import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

export interface ProgressProps extends StaticClass<typeof BaseProgress.Root> {
  /** Visible label above the bar, and the accessible name. */
  label?: string;
  /** Show the percentage on the right of the label. */
  showValue?: boolean;
}

/** Determinate progress bar. Pass `value` from 0 to 100, or leave it out for indeterminate. */
export function Progress({ label, showValue = false, className, value, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root value={value} className={cn("eui-progress", className)} {...props}>
      {label || showValue ? (
        <div className="eui-progress__meta">
          {label ? <BaseProgress.Label className="eui-progress__label">{label}</BaseProgress.Label> : null}
          {showValue ? <BaseProgress.Value className="eui-progress__value" /> : null}
        </div>
      ) : null}
      <BaseProgress.Track className="eui-progress__track">
        <BaseProgress.Indicator className="eui-progress__indicator" />
      </BaseProgress.Track>
    </BaseProgress.Root>
  );
}
