import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "./easyui-provider";
import { getAccentPalette } from "../lib/color";

describe("EasyUIProvider accent variables", () => {
  it("sets accent, accent text, and the hover shade from one color", () => {
    const { container } = render(<EasyUIProvider accent="#f59e0b" />);
    const root = container.firstElementChild as HTMLElement;
    const palette = getAccentPalette("#f59e0b");
    expect(root.style.getPropertyValue("--eui-color-accent")).toBe(palette.accent);
    expect(root.style.getPropertyValue("--eui-color-accent-fg")).toBe(palette.accentForeground);
    expect(root.style.getPropertyValue("--eui-color-accent-hover")).toBe(palette.accentHover);
  });

  it("does not set accent variables when no accent is given", () => {
    const { container } = render(<EasyUIProvider />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--eui-color-accent-hover")).toBe("");
  });
});
