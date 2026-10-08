import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";
import { useFieldContext } from "../field/field";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Search-as-you-type picker. Filtering, keyboard navigation, and screen-reader
 * announcements come from Base UI. Put it inside a <Field> for the label and error.
 *
 * @example
 * <Combobox items={teams} itemToStringLabel={(t) => t.label}>
 *   <Field label="Team">
 *     <ComboboxInput placeholder="Search teams" />
 *   </Field>
 *   <ComboboxContent>
 *     <ComboboxEmpty>No team matches that search.</ComboboxEmpty>
 *     <ComboboxList>
 *       {(team) => <ComboboxItem key={team.value} value={team}>{team.label}</ComboboxItem>}
 *     </ComboboxList>
 *   </ComboboxContent>
 * </Combobox>
 */
export const Combobox = BaseCombobox.Root;

export function ComboboxInput({ className, ...props }: StaticClass<typeof BaseCombobox.Input>) {
  const field = useFieldContext();
  return (
    <div className="eui-combobox__control">
      <BaseCombobox.Input
        id={field?.id}
        aria-invalid={field?.invalid || undefined}
        aria-describedby={
          [field?.descriptionId, field?.errorId].filter(Boolean).join(" ") || undefined
        }
        className={cn("eui-input", "eui-combobox__input", className)}
        {...props}
      />
      <BaseCombobox.Trigger className="eui-combobox__trigger" aria-label="Show options">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseCombobox.Trigger>
    </div>
  );
}

export function ComboboxContent({ className, children, ...props }: StaticClass<typeof BaseCombobox.Popup>) {
  const root = useEasyUIRoot();
  return (
    <BaseCombobox.Portal container={root ?? undefined}>
      <BaseCombobox.Positioner className="eui-popover__positioner" sideOffset={6}>
        <BaseCombobox.Popup className={cn("eui-combobox__popup", className)} {...props}>
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export function ComboboxList({ className, ...props }: StaticClass<typeof BaseCombobox.List>) {
  return <BaseCombobox.List className={cn("eui-combobox__list", className)} {...props} />;
}

export function ComboboxItem({ className, children, ...props }: StaticClass<typeof BaseCombobox.Item>) {
  return (
    <BaseCombobox.Item className={cn("eui-combobox__item", className)} {...props}>
      <span className="eui-combobox__item-label">{children}</span>
      <BaseCombobox.ItemIndicator className="eui-combobox__check">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

export function ComboboxEmpty({ className, ...props }: StaticClass<typeof BaseCombobox.Empty>) {
  return <BaseCombobox.Empty className={cn("eui-combobox__empty", className)} {...props} />;
}
