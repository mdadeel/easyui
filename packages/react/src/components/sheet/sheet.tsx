import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * A modal panel that slides in from an edge. Same focus trap, Escape, and focus
 * return as Dialog. Use `side="left"` for navigation drawers on mobile.
 *
 * @example
 * <Sheet>
 *   <SheetTrigger render={<Button variant="ghost">Menu</Button>} />
 *   <SheetContent side="left">
 *     <SheetTitle>Navigation</SheetTitle>
 *   </SheetContent>
 * </Sheet>
 */
export const Sheet = BaseDialog.Root;
export const SheetTrigger = BaseDialog.Trigger;
export const SheetClose = BaseDialog.Close;
export const SheetTitle = BaseDialog.Title;
export const SheetDescription = BaseDialog.Description;

export function SheetContent({
  side = "right",
  className,
  children,
  ...props
}: StaticClass<typeof BaseDialog.Popup> & { side?: "left" | "right" | "bottom" }) {
  const root = useEasyUIRoot();
  return (
    <BaseDialog.Portal container={root ?? undefined}>
      <BaseDialog.Backdrop className="eui-sheet__backdrop" />
      <BaseDialog.Popup className={cn("eui-sheet", `eui-sheet--${side}`, className)} {...props}>
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}
