import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** Keyboard key hint, such as ⌘K. Decorative text, so it is read as plain text. */
export function Kbd({ className, ...props }: ComponentPropsWithoutRef<"kbd">) {
  return <kbd className={cn("eui-kbd", className)} {...props} />;
}
