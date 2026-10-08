import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

/** Base UI props with a plain-string className (we merge classes ourselves). */
type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Modal dialog. Focus is trapped while open, Escape closes it, and focus
 * returns to the trigger. Built on Base UI for the accessibility behavior.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger render={<Button variant="secondary">Delete</Button>} />
 *   <DialogContent>
 *     <DialogTitle>Delete project?</DialogTitle>
 *     <DialogDescription>This cannot be undone.</DialogDescription>
 *     <DialogFooter>
 *       <DialogClose render={<Button variant="ghost">Cancel</Button>} />
 *       <Button variant="danger">Delete</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 */
export const Dialog = BaseDialog.Root;
export const DialogTrigger = BaseDialog.Trigger;
export const DialogClose = BaseDialog.Close;

export function DialogContent({
  className,
  children,
  ...props
}: StaticClass<typeof BaseDialog.Popup>) {
  const root = useEasyUIRoot();
  return (
    <BaseDialog.Portal container={root ?? undefined}>
      <BaseDialog.Backdrop className="eui-dialog__backdrop" />
      <BaseDialog.Popup className={cn("eui-dialog", className)} {...props}>
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

export function DialogTitle({
  className,
  ...props
}: StaticClass<typeof BaseDialog.Title>) {
  return <BaseDialog.Title className={cn("eui-dialog__title", className)} {...props} />;
}

export function DialogDescription({
  className,
  ...props
}: StaticClass<typeof BaseDialog.Description>) {
  return (
    <BaseDialog.Description className={cn("eui-dialog__description", className)} {...props} />
  );
}

export function DialogFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-dialog__footer", className)} {...props} />;
}
