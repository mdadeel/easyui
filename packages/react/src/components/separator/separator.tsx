import { Separator as BaseSeparator } from "@base-ui/react/separator";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/** Hairline divider. Decorative by default, so it is not announced to screen readers. */
export function Separator({ className, ...props }: StaticClass<typeof BaseSeparator>) {
  return <BaseSeparator className={cn("eui-separator", className)} {...props} />;
}
