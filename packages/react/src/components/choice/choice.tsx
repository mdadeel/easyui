import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { useId, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Base UI props with a plain-string className (we merge classes ourselves). */
type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

interface ChoiceLabelProps {
  label?: ReactNode;
  description?: ReactNode;
  id: string;
  descriptionId: string;
}

function ChoiceText({ label, description, id, descriptionId }: ChoiceLabelProps) {
  if (!label && !description) return null;
  return (
    <div className="eui-choice__text">
      {label ? (
        <label htmlFor={id} className="eui-choice__label">
          {label}
        </label>
      ) : null}
      {description ? (
        <p id={descriptionId} className="eui-choice__description">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export interface CheckboxProps extends StaticClass<typeof BaseCheckbox.Root> {
  /** Text shown next to the box. Clicking it toggles the checkbox. */
  label?: ReactNode;
  /** Secondary text under the label. */
  description?: ReactNode;
}

/**
 * Checkbox with an optional label and description. Keyboard (Space) and
 * screen-reader behavior come from Base UI.
 */
export function Checkbox({ label, description, className, id, ...props }: CheckboxProps) {
  const generated = useId().replace(/:/g, "");
  const boxId = id ?? `eui-checkbox-${generated}`;
  const descriptionId = `${boxId}-description`;
  return (
    <div className={cn("eui-choice", className)}>
      <BaseCheckbox.Root
        id={boxId}
        className="eui-checkbox"
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <BaseCheckbox.Indicator className="eui-checkbox__indicator">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      <ChoiceText label={label} description={description} id={boxId} descriptionId={descriptionId} />
    </div>
  );
}

export interface SwitchProps extends StaticClass<typeof BaseSwitch.Root> {
  label?: ReactNode;
  description?: ReactNode;
}

/**
 * On/off switch. Role "switch" with the checked state exposed to assistive tech.
 * The thumb moves with transform only.
 */
export function Switch({ label, description, className, id, ...props }: SwitchProps) {
  const generated = useId().replace(/:/g, "");
  const switchId = id ?? `eui-switch-${generated}`;
  const descriptionId = `${switchId}-description`;
  return (
    <div className={cn("eui-choice", className)}>
      <BaseSwitch.Root
        id={switchId}
        className="eui-switch"
        aria-describedby={description ? descriptionId : undefined}
        {...props}
      >
        <BaseSwitch.Thumb className="eui-switch__thumb" />
      </BaseSwitch.Root>
      <ChoiceText label={label} description={description} id={switchId} descriptionId={descriptionId} />
    </div>
  );
}
