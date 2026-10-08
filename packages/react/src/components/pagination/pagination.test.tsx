import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { buildRange, Pagination } from "./pagination";

describe("Pagination", () => {
  it("builds ranges with gaps and keeps first and last pages", () => {
    expect(buildRange(1, 10, 1)).toEqual([1, 2, "…", 10]);
    expect(buildRange(5, 10, 1)).toEqual([1, "…", 4, 5, 6, "…", 10]);
    expect(buildRange(1, 1, 1)).toEqual([1]);
  });

  it("moves to the chosen page and disables Previous on the first page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={4} onPageChange={onPageChange} />);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("has no axe violations", async () => {
    const { container } = render(<Pagination page={2} pageCount={5} onPageChange={() => {}} />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
