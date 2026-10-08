import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../../lib/cn";

/** Wraps the table so wide content scrolls sideways on small screens instead of breaking the layout. */
export function Table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="eui-table-wrap">
      <table className={cn("eui-table", className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: ComponentPropsWithoutRef<"thead">) {
  return <thead className={cn("eui-table__head", className)} {...props} />;
}

export function TableBody({ className, ...props }: ComponentPropsWithoutRef<"tbody">) {
  return <tbody className={cn("eui-table__body", className)} {...props} />;
}

export function TableFooter({ className, ...props }: ComponentPropsWithoutRef<"tfoot">) {
  return <tfoot className={cn("eui-table__footer", className)} {...props} />;
}

export function TableRow({ className, ...props }: ComponentPropsWithoutRef<"tr">) {
  return <tr className={cn("eui-table__row", className)} {...props} />;
}

export function TableHead({ className, ...props }: ComponentPropsWithoutRef<"th">) {
  return <th scope="col" className={cn("eui-table__th", className)} {...props} />;
}

export function TableCell({ className, ...props }: ComponentPropsWithoutRef<"td">) {
  return <td className={cn("eui-table__td", className)} {...props} />;
}

export function TableCaption({ className, ...props }: ComponentPropsWithoutRef<"caption">) {
  return <caption className={cn("eui-table__caption", className)} {...props} />;
}
