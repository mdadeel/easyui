import { Slider as BaseSlider } from "@base-ui/react/slider";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

export interface SliderProps extends StaticClass<typeof BaseSlider.Root> {
  /** Visible label and accessible name for the slider thumb. */
  label?: string;
  /** Show the current value next to the label. */
  showValue?: boolean;
}

/**
 * Pick a number inside a range. Arrow keys, Page Up/Down, Home, and End work on
 * the thumb. Pass `value` and `onValueChange` to control it.
 */
export function Slider({ label, showValue = false, className, ...props }: SliderProps) {
  return (
    <BaseSlider.Root className={cn("eui-slider", className)} {...props}>
      {label || showValue ? (
        <div className="eui-slider__meta">
          {label ? (
            <BaseSlider.Label className="eui-slider__label">
              {label}
            </BaseSlider.Label>
          ) : null}
          {showValue ? <BaseSlider.Value className="eui-slider__value" /> : null}
        </div>
      ) : null}
      <BaseSlider.Control className="eui-slider__control">
        <BaseSlider.Track className="eui-slider__track">
          <BaseSlider.Indicator className="eui-slider__indicator" />
        </BaseSlider.Track>
        <BaseSlider.Thumb className="eui-slider__thumb" aria-label={label} />
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
