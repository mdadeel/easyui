import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface EmptyProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Optional icon or illustration shown above the title. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Usually a Button that fixes the empty state, such as "Create project". */
  action?: ReactNode;
}

/** Placeholder for a view with no content yet. Give it one clear next step. */
export function Empty({ icon, title, description, action, className, ...props }: EmptyProps) {
  return (
    <div className={cn("eui-empty", className)} {...props}>
      {icon ? <div className="eui-empty__icon">{icon}</div> : null}
      <p className="eui-empty__title">{title}</p>
      {description ? <p className="eui-empty__description">{description}</p> : null}
      {action ? <div className="eui-empty__action">{action}</div> : null}
    </div>
  );
}
