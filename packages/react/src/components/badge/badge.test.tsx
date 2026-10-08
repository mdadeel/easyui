import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders the variant class and text", () => {
    render(<Badge variant="accent">New</Badge>);
    expect(screen.getByText("New")).toHaveClass("eui-badge", "eui-badge--accent");
  });

  it("defaults to neutral", () => {
    render(<Badge>Draft</Badge>);
    expect(screen.getByText("Draft")).toHaveClass("eui-badge--neutral");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Badge variant="danger">Failed</Badge>);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
