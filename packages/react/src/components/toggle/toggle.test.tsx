import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Toggle, ToggleGroup } from "./toggle";

describe("Toggle", () => {
  it("toggles aria-pressed on click", async () => {
    const user = userEvent.setup();
    const onPressedChange = vi.fn();
    render(<Toggle aria-label="Bold" onPressedChange={onPressedChange} />);
    const btn = screen.getByRole("button", { name: "Bold" });
    expect(btn).toHaveAttribute("aria-pressed", "false");
    await user.click(btn);
    expect(onPressedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(btn).toHaveAttribute("aria-pressed", "true");
  });
});

describe("ToggleGroup", () => {
  it("allows several items to be pressed and has no axe violations", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ToggleGroup aria-label="Text style" multiple>
        <Toggle value="bold" aria-label="Bold">B</Toggle>
        <Toggle value="italic" aria-label="Italic">I</Toggle>
      </ToggleGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Bold" }));
    await user.click(screen.getByRole("button", { name: "Italic" }));
    expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Italic" })).toHaveAttribute("aria-pressed", "true");
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
