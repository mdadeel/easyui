import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

export type SkeletonProps = ComponentPropsWithoutRef<"span">;

/**
 * Placeholder for loading content. Decorative, so it is hidden from assistive
 * tech. Put aria-busy on the region and announce loading elsewhere.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return <span aria-hidden="true" className={cn("eui-skeleton", className)} {...props} />;
}
