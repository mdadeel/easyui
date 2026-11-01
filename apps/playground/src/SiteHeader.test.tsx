import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";

afterEach(() => { cleanup(); window.history.replaceState(null, "", "/"); });

describe("shared navigation", () => {
  for (const [hash, label] of [["#playground", "Playground"], ["#blocks", "Blocks"], ["#component/button", "Discover"], ["#getting-started", "Get started"]]) {
    it(`marks ${label} as current at ${hash}`, () => {
      window.history.replaceState(null, "", `/`);
      window.location.hash = hash!;
      render(<SiteHeader />);
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    });
  }
  it("uses crawlable navigation and marks clean routes current", () => {
    window.history.replaceState(null, "", "/playground/");
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Playground" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Get started" })).toHaveAttribute("href", "/getting-started/");
  });
});
