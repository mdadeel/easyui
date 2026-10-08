import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Tabs with arrow-key navigation and roving focus from Base UI.
 *
 * @example
 * <Tabs defaultValue="overview">
 *   <TabsList aria-label="Project sections">
 *     <TabsTab value="overview">Overview</TabsTab>
 *     <TabsTab value="members">Members</TabsTab>
 *   </TabsList>
 *   <TabsPanel value="overview">…</TabsPanel>
 *   <TabsPanel value="members">…</TabsPanel>
 * </Tabs>
 */
export const Tabs = BaseTabs.Root;

export function TabsList({ className, ...props }: StaticClass<typeof BaseTabs.List>) {
  return <BaseTabs.List className={cn("eui-tabs__list", className)} {...props} />;
}

export function TabsTab({ className, ...props }: StaticClass<typeof BaseTabs.Tab>) {
  return <BaseTabs.Tab className={cn("eui-tabs__tab", className)} {...props} />;
}

export function TabsPanel({ className, ...props }: StaticClass<typeof BaseTabs.Panel>) {
  return <BaseTabs.Panel className={cn("eui-tabs__panel", className)} {...props} />;
}
