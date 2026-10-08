import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Confirmation dialog for destructive or irreversible actions. Unlike Dialog,
 * a click on the backdrop does not dismiss it. The user must choose an action.
 * Styled like Dialog. Focus trap, Escape, and focus return come from Base UI.
 *
 * @example
 * <AlertDialog>
 *   <AlertDialogTrigger render={<Button variant="danger">Delete project</Button>} />
 *   <AlertDialogContent>
 *     <AlertDialogTitle>Delete this project?</AlertDialogTitle>
 *     <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
 *     <AlertDialogFooter>
 *       <AlertDialogClose render={<Button variant="ghost">Cancel</Button>} />
 *       <Button variant="danger">Delete</Button>
 *     </AlertDialogFooter>
 *   </AlertDialogContent>
 * </AlertDialog>
 */
export const AlertDialog = BaseAlertDialog.Root;
export const AlertDialogTrigger = BaseAlertDialog.Trigger;
export const AlertDialogClose = BaseAlertDialog.Close;

export function AlertDialogContent({ className, children, ...props }: StaticClass<typeof BaseAlertDialog.Popup>) {
  const root = useEasyUIRoot();
  return (
    <BaseAlertDialog.Portal container={root ?? undefined}>
      <BaseAlertDialog.Backdrop className="eui-dialog__backdrop" />
      <BaseAlertDialog.Popup
        role="alertdialog"
        className={cn("eui-dialog", className)}
        {...props}
      >
        {children}
      </BaseAlertDialog.Popup>
    </BaseAlertDialog.Portal>
  );
}

export function AlertDialogTitle({ className, ...props }: StaticClass<typeof BaseAlertDialog.Title>) {
  return <BaseAlertDialog.Title className={cn("eui-dialog__title", className)} {...props} />;
}

export function AlertDialogDescription({ className, ...props }: StaticClass<typeof BaseAlertDialog.Description>) {
  return <BaseAlertDialog.Description className={cn("eui-dialog__description", className)} {...props} />;
}

export function AlertDialogFooter({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-dialog__footer", className)} {...props} />;
}
