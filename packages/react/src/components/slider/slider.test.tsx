import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "./slider";

describe("Slider", () => {
  it("moves with the arrow keys and reports the new value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider label="Volume" defaultValue={50} min={0} max={100} onValueChange={onValueChange} />);
    const thumb = screen.getByRole("slider", { name: "Volume" });
    thumb.focus();
    await user.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenLastCalledWith(51, expect.anything());
  });

  it("has no axe violations", async () => {
    const { container } = render(<Slider label="Brightness" defaultValue={30} />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
