import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Location trail. Mark the last item with `BreadcrumbCurrent` so it is announced as the current page. */
export function Breadcrumb({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="Breadcrumb" className={cn("eui-breadcrumb", className)} {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return <ol className={cn("eui-breadcrumb__list", className)} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("eui-breadcrumb__item", className)} {...props} />;
}

export function BreadcrumbLink({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return <a className={cn("eui-breadcrumb__link", className)} {...props} />;
}

export function BreadcrumbCurrent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"span"> & { children?: ReactNode }) {
  return (
    <span aria-current="page" className={cn("eui-breadcrumb__current", className)} {...props}>
      {children}
    </span>
  );
}

/** Decorative divider between items. Hidden from assistive tech. */
export function BreadcrumbSeparator() {
  return (
    <span className="eui-breadcrumb__separator" aria-hidden="true">
      /
    </span>
  );
}
