import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./radio";

function Plan({ onValueChange }: { onValueChange?: (v: unknown) => void }) {
  return (
    <RadioGroup aria-label="Plan" defaultValue="free" onValueChange={onValueChange}>
      <Radio value="free" label="Free" description="For personal projects." />
      <Radio value="pro" label="Pro" description="For teams." />
    </RadioGroup>
  );
}

describe("Radio", () => {
  it("selects one option at a time by click", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Plan onValueChange={onValueChange} />);
    expect(screen.getByRole("radio", { name: "Free" })).toBeChecked();
    await user.click(screen.getByText("Pro"));
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Free" })).not.toBeChecked();
    expect(onValueChange).toHaveBeenCalledWith("pro", expect.anything());
  });

  it("moves selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Plan />);
    screen.getByRole("radio", { name: "Free" }).focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Pro" })).toBeChecked();
  });

  it("links the description", () => {
    render(<Plan />);
    expect(screen.getByRole("radio", { name: "Pro" })).toHaveAccessibleDescription("For teams.");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Plan />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
