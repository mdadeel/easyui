import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "../../lib/cn";

type StaticClass<T extends ElementType> = Omit<ComponentPropsWithoutRef<T>, "className"> & {
  className?: string;
};

/**
 * Stacked, collapsible sections. Each item needs a unique `value`.
 * Keyboard support (arrows, Home, End, Enter, Space) comes from Base UI.
 *
 * @example
 * <Accordion>
 *   <AccordionItem value="billing">
 *     <AccordionTrigger>Billing</AccordionTrigger>
 *     <AccordionPanel>Invoices go to the owner.</AccordionPanel>
 *   </AccordionItem>
 * </Accordion>
 */
export function Accordion({ className, ...props }: StaticClass<typeof BaseAccordion.Root>) {
  return <BaseAccordion.Root className={cn("eui-accordion", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: StaticClass<typeof BaseAccordion.Item>) {
  return <BaseAccordion.Item className={cn("eui-accordion__item", className)} {...props} />;
}

/** The clickable heading. It wraps the trigger in a heading element for screen readers. */
export function AccordionTrigger({
  className,
  children,
  ...props
}: StaticClass<typeof BaseAccordion.Trigger>) {
  return (
    <BaseAccordion.Header className="eui-accordion__header">
      <BaseAccordion.Trigger className={cn("eui-accordion__trigger", className)} {...props}>
        {children}
        <svg
          className="eui-accordion__chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

export function AccordionPanel({ className, ...props }: StaticClass<typeof BaseAccordion.Panel>) {
  return <BaseAccordion.Panel className={cn("eui-accordion__panel", className)} {...props} />;
}
