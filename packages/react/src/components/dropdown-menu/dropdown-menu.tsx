import { Menu as BaseMenu } from "@base-ui/react/menu";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";
import { useEasyUIRoot } from "../../provider/easyui-provider";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Action menu opened from a button. Arrow keys move through items, Escape
 * closes it, and focus returns to the trigger. Use it for actions, not for
 * navigation or form values.
 *
 * @example
 * <DropdownMenu>
 *   <DropdownMenuTrigger render={<Button variant="secondary">More</Button>} />
 *   <DropdownMenuContent>
 *     <DropdownMenuGroup>
 *       <DropdownMenuItem>Rename</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem>Delete</DropdownMenuItem>
 *     </DropdownMenuGroup>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */
export const DropdownMenu = BaseMenu.Root;
export const DropdownMenuTrigger = BaseMenu.Trigger;

export function DropdownMenuContent({
  className,
  children,
  sideOffset = 6,
  align = "end",
  ...props
}: StaticClass<typeof BaseMenu.Popup> & { sideOffset?: number; align?: "start" | "center" | "end" }) {
  const root = useEasyUIRoot();
  return (
    <BaseMenu.Portal container={root ?? undefined}>
      <BaseMenu.Positioner className="eui-menu__positioner" sideOffset={sideOffset} align={align}>
        <BaseMenu.Popup className={cn("eui-menu", className)} {...props}>
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function DropdownMenuItem({ className, ...props }: StaticClass<typeof BaseMenu.Item>) {
  return <BaseMenu.Item className={cn("eui-menu__item", className)} {...props} />;
}

export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: StaticClass<typeof BaseMenu.CheckboxItem>) {
  return (
    <BaseMenu.CheckboxItem className={cn("eui-menu__item", "eui-menu__item--check", className)} {...props}>
      <span className="eui-menu__indicator">
        <BaseMenu.CheckboxItemIndicator>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </BaseMenu.CheckboxItemIndicator>
      </span>
      {children}
    </BaseMenu.CheckboxItem>
  );
}

export function DropdownMenuLabel({ className, ...props }: StaticClass<typeof BaseMenu.GroupLabel>) {
  return <BaseMenu.GroupLabel className={cn("eui-menu__label", className)} {...props} />;
}

export function DropdownMenuGroup({ className, ...props }: StaticClass<typeof BaseMenu.Group>) {
  return <BaseMenu.Group className={cn("eui-menu__group", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div role="separator" className={cn("eui-menu__separator", className)} {...props} />;
}
