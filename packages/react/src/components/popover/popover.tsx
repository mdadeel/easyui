import { Popover as BasePopover } from "@base-ui/react/popover";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Non-modal floating panel anchored to a trigger. Use it for short, optional
 * detail (filters, a color picker, a preview). Use Dialog when the user must act first.
 *
 * @example
 * <Popover>
 *   <PopoverTrigger render={<Button variant="secondary">Filters</Button>} />
 *   <PopoverContent>
 *     <PopoverTitle>Filter projects</PopoverTitle>
 *   </PopoverContent>
 * </Popover>
 */
export const Popover = BasePopover.Root;
export const PopoverTrigger = BasePopover.Trigger;
export const PopoverClose = BasePopover.Close;
export const PopoverTitle = BasePopover.Title;
export const PopoverDescription = BasePopover.Description;

export function PopoverContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  ...props
}: StaticClass<typeof BasePopover.Popup> & {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}) {
  const root = useEasyUIRoot();
  return (
    <BasePopover.Portal container={root ?? undefined}>
      <BasePopover.Positioner
        className="eui-popover__positioner"
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BasePopover.Popup className={cn("eui-popover", className)} {...props}>
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
