import { Select as BaseSelect } from "@base-ui/react/select";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

/** Base UI props with a plain-string className (we merge classes ourselves). */
type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Single-value select. Keyboard, typeahead, and screen-reader behavior come from Base UI.
 * Pass `items` to the root so the trigger can show the selected label.
 *
 * @example
 * <Select items={regions} value={region} onValueChange={setRegion}>
 *   <SelectTrigger aria-label="Region">
 *     <SelectValue placeholder="Choose a region" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     {regions.map((r) => (
 *       <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
 *     ))}
 *   </SelectContent>
 * </Select>
 */
export const Select = BaseSelect.Root;
export const SelectValue = BaseSelect.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: StaticClass<typeof BaseSelect.Trigger>) {
  return (
    <BaseSelect.Trigger className={cn("eui-select__trigger", className)} {...props}>
      {children}
      <svg
        className="eui-select__chevron"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path d="M4.5 6.25 8 9.75l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </BaseSelect.Trigger>
  );
}

export function SelectContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: StaticClass<typeof BaseSelect.Popup> & { sideOffset?: number }) {
  const root = useEasyUIRoot();
  return (
    <BaseSelect.Portal container={root ?? undefined}>
      <BaseSelect.Positioner className="eui-select__positioner" sideOffset={sideOffset}>
        <BaseSelect.Popup className={cn("eui-select__popup", className)} {...props}>
          {children}
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: StaticClass<typeof BaseSelect.Item>) {
  return (
    <BaseSelect.Item className={cn("eui-select__item", className)} {...props}>
      <BaseSelect.ItemText className="eui-select__item-text">{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="eui-select__indicator">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
