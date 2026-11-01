import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { SiteHeader } from "./SiteHeader";

afterEach(() => cleanup());

describe("shared navigation", () => {
  for (const [hash, label] of [["#playground", "Playground"], ["#blocks", "Blocks"], ["#component/button", "Discover"], ["#getting-started", "Get started"]]) {
    it(`marks ${label} as current at ${hash}`, () => {
      window.location.hash = hash!;
      render(<SiteHeader />);
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    });
  }
});
