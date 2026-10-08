import { Toggle as BaseToggle } from "@base-ui/react/toggle";
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

export type ToggleVariant = "default" | "outline";
export type ToggleSize = "sm" | "md";

export interface ToggleProps extends StaticClass<typeof BaseToggle> {
  variant?: ToggleVariant;
  size?: ToggleSize;
}

/**
 * A button that stays pressed. Use it for on/off formatting (bold, pinned) and
 * for filters. It exposes aria-pressed to assistive tech.
 */
export function Toggle({ variant = "default", size = "md", className, ...props }: ToggleProps) {
  return (
    <BaseToggle
      className={cn("eui-toggle", `eui-toggle--${variant}`, `eui-toggle--${size}`, className)}
      {...props}
    />
  );
}

export interface ToggleGroupProps extends StaticClass<typeof BaseToggleGroup> {
  /** Lays out the toggles in a joined bar. */
  joined?: boolean;
}

/** A set of toggles where one or many can be pressed. Arrow keys move between them. */
export function ToggleGroup({ joined = true, className, ...props }: ToggleGroupProps) {
  return (
    <BaseToggleGroup
      className={cn("eui-toggle-group", joined && "eui-toggle-group--joined", className)}
      {...props}
    />
  );
}
