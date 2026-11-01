import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { Gallery } from "./Gallery";
import { defaultPreviewTheme, readPreviewTheme, themeStorageKey } from "./previewTheme";

describe("shared preview theme", () => {
  beforeEach(() => { localStorage.clear(); window.history.replaceState(null, "", "/playground/"); });
  afterEach(() => { cleanup(); localStorage.clear(); window.history.replaceState(null, "", "/"); });

  it("saves playground choices, applies them on a component page, and can reset", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<App />);
    await user.click(screen.getByRole("button", { name: "Blue accent" }));
    await user.click(within(screen.getByRole("radiogroup", { name: "Mode" })).getByRole("radio", { name: "dark" }));
    await user.click(within(screen.getByRole("radiogroup", { name: "Corner radius" })).getByRole("radio", { name: "lg" }));
    expect(readPreviewTheme()).toMatchObject({ accent: "#2563eb", mode: "dark", radius: "lg" });
    unmount();
    window.history.replaceState(null, "", "/components/button/");
    const detail = render(<Gallery />);
    const preview = document.querySelector(".detail-example")!.closest(".eui-root")!;
    expect(preview).toHaveAttribute("data-theme", "dark");
    expect(preview).toHaveStyle({ "--eui-color-accent": "#2563eb" });
    detail.unmount();
    window.history.replaceState(null, "", "/playground/");
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Reset theme" }));
    expect(readPreviewTheme()).toEqual(defaultPreviewTheme);
  });

  it("ignores corrupt or invalid stored settings", () => {
    localStorage.setItem(themeStorageKey, "not-json");
    expect(readPreviewTheme()).toEqual(defaultPreviewTheme);
    localStorage.setItem(themeStorageKey, JSON.stringify({ accent: "invalid", radius: "huge", mode: "sepia", font: "unknown" }));
    expect(readPreviewTheme()).toEqual(defaultPreviewTheme);
  });
});
