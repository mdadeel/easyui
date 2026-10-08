import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { Radio as BaseRadio } from "@base-ui/react/radio";
import { useId, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Group of radios where exactly one value is chosen. Arrow keys move the
 * selection, as the ARIA radio pattern requires.
 */
export function RadioGroup({ className, ...props }: StaticClass<typeof BaseRadioGroup>) {
  return <BaseRadioGroup className={cn("eui-radio-group", className)} {...props} />;
}

export interface RadioProps extends StaticClass<typeof BaseRadio.Root> {
  label?: ReactNode;
  description?: ReactNode;
}

/** One option inside a RadioGroup. Give each one a unique `value`. */
export function Radio({ label, description, className, id, ...props }: RadioProps) {
  const generated = useId().replace(/:/g, "");
  const radioId = id ?? `eui-radio-${generated}`;
  const descriptionId = `${radioId}-description`;
  return (
    <div className="eui-choice">
      <BaseRadio.Root
        id={radioId}
        className={cn("eui-radio", className)}
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <BaseRadio.Indicator className="eui-radio__indicator" />
      </BaseRadio.Root>
      {label || description ? (
        <div className="eui-choice__text">
          {label ? (
            <label htmlFor={radioId} className="eui-choice__label">
              {label}
            </label>
          ) : null}
          {description ? (
            <p id={descriptionId} className="eui-choice__description">
              {description}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
