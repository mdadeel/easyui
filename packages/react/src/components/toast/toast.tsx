import { Toast as BaseToast } from "@base-ui/react/toast";
import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

export type ToastType = "default" | "success" | "error";

export interface ToastData {
  title: ReactNode;
  description?: ReactNode;
  type?: ToastType;
}

/** Shared store. The provider reads from it, and `toast()` writes to it from anywhere. */
const manager = BaseToast.createToastManager<ToastData>();

/**
 * Show a short, non-blocking message. Returns the toast id.
 *
 * @example
 * toast({ title: "Invite sent", description: "maya@company.com has 48 hours to join." });
 */
export function toast(options: ToastData & { timeout?: number }): string {
  return manager.add(options);
}

toast.close = (id?: string) => manager.close(id);

/** Access the live toast list from inside a component. */
export const useToast = BaseToast.useToastManager<ToastData>;

/**
 * Renders the toast viewport. Mount `ToastProvider` once near the root of the
 * app, inside an EasyUIProvider so toasts pick up the theme.
 */
export function ToastProvider({
  children,
  timeout = 5000,
  limit = 3,
}: {
  children?: ReactNode;
  timeout?: number;
  limit?: number;
}) {
  return (
    <BaseToast.Provider toastManager={manager} timeout={timeout} limit={limit}>
      {children}
      <Toaster />
    </BaseToast.Provider>
  );
}

function Toaster() {
  const { toasts } = BaseToast.useToastManager<ToastData>();
  const root = useEasyUIRoot();
  return (
    <BaseToast.Portal container={root ?? undefined}>
      <BaseToast.Viewport className="eui-toast-viewport">
        {toasts.map((item) => (
          <BaseToast.Root
            key={item.id}
            toast={item}
            // A toast is a non-blocking status message, not a dialog. Base UI defaults to
            // role="dialog", which would make screen readers switch into dialog mode.
            role="status"
            className={cn("eui-toast", `eui-toast--${item.type ?? "default"}`)}
          >
            <BaseToast.Content className="eui-toast__content">
              <BaseToast.Title className="eui-toast__title" />
              {item.description ? (
                <BaseToast.Description className="eui-toast__description" />
              ) : null}
            </BaseToast.Content>
            {/* Base UI hides the close button while the stack is collapsed, which would
                hide the only dismiss control from screen readers. Keep it announced. */}
            <BaseToast.Close
              className="eui-toast__close"
              aria-label="Dismiss notification"
              aria-hidden={false}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </BaseToast.Close>
          </BaseToast.Root>
        ))}
      </BaseToast.Viewport>
    </BaseToast.Portal>
  );
}
