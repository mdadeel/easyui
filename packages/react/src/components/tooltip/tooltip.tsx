import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
} from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

interface TooltipContextValue {
  popupId: string;
  open: boolean;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

type TooltipRootProps = ComponentPropsWithoutRef<typeof BaseTooltip.Root>;

/**
 * Short hint shown on hover and keyboard focus. Use it for supplementary
 * text only. Never put essential information or actions in a tooltip.
 *
 * Base UI handles open/close timing and positioning. This wrapper adds the
 * link a screen reader needs: the trigger is described by the popup while
 * the popup is open.
 *
 * @example
 * <Tooltip>
 *   <TooltipTrigger render={<Button variant="ghost" size="sm">Copy</Button>} />
 *   <TooltipContent>Copy invite link</TooltipContent>
 * </Tooltip>
 */
export function Tooltip({ onOpenChange, open: controlledOpen, defaultOpen, ...props }: TooltipRootProps) {
  const popupId = `eui-tooltip-${useId().replace(/:/g, "")}`;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen ?? false);
  const open = controlledOpen ?? uncontrolledOpen;

  return (
    <TooltipContext.Provider value={{ popupId, open }}>
      <BaseTooltip.Root
        {...props}
        open={controlledOpen}
        defaultOpen={defaultOpen}
        onOpenChange={(nextOpen, details) => {
          setUncontrolledOpen(nextOpen);
          onOpenChange?.(nextOpen, details);
        }}
      />
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger(props: StaticClass<typeof BaseTooltip.Trigger>) {
  const ctx = useContext(TooltipContext);
  return (
    <BaseTooltip.Trigger
      aria-describedby={ctx?.open ? ctx.popupId : undefined}
      {...props}
    />
  );
}

export function TooltipContent({
  className,
  sideOffset = 6,
  side,
  children,
  ...props
}: StaticClass<typeof BaseTooltip.Popup> & {
  sideOffset?: number;
  side?: "top" | "bottom" | "left" | "right";
}) {
  const root = useEasyUIRoot();
  const ctx = useContext(TooltipContext);
  return (
    <BaseTooltip.Portal container={root ?? undefined}>
      <BaseTooltip.Positioner className="eui-tooltip__positioner" sideOffset={sideOffset} side={side}>
        <BaseTooltip.Popup
          id={ctx?.popupId}
          role="tooltip"
          className={cn("eui-tooltip", className)}
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}
