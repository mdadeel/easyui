import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "./easyui-provider";

describe("EasyUIProvider", () => {
  it("wraps children in the eui-root scope", () => {
    const { container } = render(
      <EasyUIProvider>
        <span>child</span>
      </EasyUIProvider>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("eui-root");
    expect(root.textContent).toBe("child");
  });

  it("derives accent and accent-foreground from a hex accent", () => {
    const { container } = render(<EasyUIProvider accent="#2563EB" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--eui-color-accent")).toBe("#2563eb");
    expect(root.style.getPropertyValue("--eui-color-accent-fg")).toMatch(/^#(ffffff|0a0a0a)$/);
  });

  it("maps radius and font to variables", () => {
    const { container } = render(<EasyUIProvider radius="lg" fontFamily="Inter, sans-serif" />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--eui-radius-base")).toBe("var(--eui-radius-lg)");
    expect(root.style.getPropertyValue("--eui-font-sans")).toBe("Inter, sans-serif");
  });

  it("sets data-theme only when theme is provided", () => {
    const { container, rerender } = render(<EasyUIProvider />);
    expect((container.firstElementChild as HTMLElement).hasAttribute("data-theme")).toBe(false);

    rerender(<EasyUIProvider theme="dark" />);
    expect((container.firstElementChild as HTMLElement).getAttribute("data-theme")).toBe("dark");
  });

  it("lets consumer inline styles override derived variables", () => {
    const { container } = render(
      <EasyUIProvider accent="#2563eb" style={{ "--eui-color-accent": "#ff0000" } as never} />,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--eui-color-accent")).toBe("#ff0000");
  });

  it("throws on a non-hex accent instead of producing unreadable text", () => {
    expect(() => render(<EasyUIProvider accent="blue" />)).toThrow(/must be a hex color/);
  });
});
