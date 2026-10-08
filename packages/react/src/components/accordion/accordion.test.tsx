import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "./accordion";

function Faq() {
  return (
    <Accordion>
      <AccordionItem value="billing">
        <AccordionTrigger>Billing</AccordionTrigger>
        <AccordionPanel>Invoices go to the owner.</AccordionPanel>
      </AccordionItem>
      <AccordionItem value="seats">
        <AccordionTrigger>Seats</AccordionTrigger>
        <AccordionPanel>Each seat is one person.</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

describe("Accordion", () => {
  it("opens a panel on click and reports it as expanded", async () => {
    const user = userEvent.setup();
    render(<Faq />);
    const trigger = screen.getByRole("button", { name: "Billing" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Invoices go to the owner.")).toBeVisible();
  });

  it("puts each trigger in a heading", () => {
    render(<Faq />);
    expect(screen.getByRole("heading", { name: "Billing" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Faq />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
