import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Link } from "./link";

describe("Link", () => {
  it("renders an anchor with the underline mode class", () => {
    render(
      <Link href="/pricing" underline="hover">
        Pricing
      </Link>,
    );
    const link = screen.getByRole("link", { name: "Pricing" });
    expect(link).toHaveAttribute("href", "/pricing");
    expect(link).toHaveClass("eui-link", "eui-link--hover");
  });
});
