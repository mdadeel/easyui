import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Shows and hides one block of content. Use it for "show more" areas and
 * disclosure sections. For a list of related sections, use Accordion.
 */
export const Collapsible = BaseCollapsible.Root;

export function CollapsibleTrigger({ className, ...props }: StaticClass<typeof BaseCollapsible.Trigger>) {
  return <BaseCollapsible.Trigger className={cn("eui-collapsible__trigger", className)} {...props} />;
}

export function CollapsiblePanel({ className, ...props }: StaticClass<typeof BaseCollapsible.Panel>) {
  return <BaseCollapsible.Panel className={cn("eui-collapsible__panel", className)} {...props} />;
}
