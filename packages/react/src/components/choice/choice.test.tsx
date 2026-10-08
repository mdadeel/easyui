import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Checkbox, Switch } from "./choice";

describe("Checkbox", () => {
  it("is a labelled checkbox that toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Email me updates" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole("checkbox", { name: "Email me updates" });
    expect(box).not.toBeChecked();
    await user.click(screen.getByText("Email me updates"));
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(box).toBeChecked();
  });

  it("toggles with the Space key", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    const box = screen.getByRole("checkbox", { name: "Accept terms" });
    box.focus();
    await user.keyboard(" ");
    expect(box).toBeChecked();
  });

  it("links the description for assistive tech", () => {
    render(<Checkbox label="Weekly digest" description="One email on Mondays." />);
    const box = screen.getByRole("checkbox", { name: "Weekly digest" });
    expect(box).toHaveAccessibleDescription("One email on Mondays.");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Locked" disabled />);
    await user.click(screen.getByRole("checkbox", { name: "Locked" }));
    expect(screen.getByRole("checkbox", { name: "Locked" })).not.toBeChecked();
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Checkbox label="Email me updates" description="Product news, roughly monthly." />,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});

describe("Switch", () => {
  it("exposes role=switch and toggles on click", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Dark mode" onCheckedChange={onCheckedChange} />);
    const sw = screen.getByRole("switch", { name: "Dark mode" });
    expect(sw).toHaveAttribute("aria-checked", "false");
    await user.click(sw);
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
    expect(sw).toHaveAttribute("aria-checked", "true");
  });

  it("respects a controlled checked prop", () => {
    render(<Switch label="Sync" checked onCheckedChange={() => {}} />);
    expect(screen.getByRole("switch", { name: "Sync" })).toHaveAttribute("aria-checked", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Switch label="Notifications" description="Push alerts." />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
