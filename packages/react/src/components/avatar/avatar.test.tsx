import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

describe("Avatar", () => {
  it("shows the fallback when there is no image", () => {
    render(
      <Avatar size="lg">
        <AvatarImage src="/does-not-exist.png" alt="Maya Rahman" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>,
    );
    expect(screen.getByText("MR")).toHaveClass("eui-avatar__fallback");
    expect(document.querySelector(".eui-avatar")).toHaveClass("eui-avatar--lg");
  });

  it("defaults to the md size", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    expect(document.querySelector(".eui-avatar")).toHaveClass("eui-avatar--md");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
