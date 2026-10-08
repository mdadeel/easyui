import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "../../lib/cn";

/** Surface for grouping related content. A hairline ring instead of a heavy shadow. */
export function Card({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-card", className)} {...props} />;
}

export function CardHeader({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-card__header", className)} {...props} />;
}

export function CardTitle({
  className,
  as: Heading = "h3",
  ...props
}: ComponentPropsWithoutRef<"h3"> & { as?: ElementType }) {
  return <Heading className={cn("eui-card__title", className)} {...props} />;
}

export function CardDescription({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p className={cn("eui-card__description", className)} {...props} />;
}

export function CardContent({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("eui-card__content", className)} {...props} />;
}

export function CardFooter({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { children?: ReactNode }) {
  return (
    <div className={cn("eui-card__footer", className)} {...props}>
      {children}
    </div>
  );
}
