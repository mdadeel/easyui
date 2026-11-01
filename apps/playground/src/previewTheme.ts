import { isHexColor, type EasyUIRadius, type EasyUITheme } from "@easyui/react";

export type PreviewTheme = { accent?: string; radius: EasyUIRadius; font: "geist" | "system"; mode: EasyUITheme };
export const defaultPreviewTheme: PreviewTheme = { radius: "md", font: "geist", mode: "light" };
export const themeStorageKey = "easyui-preview-theme";
export const systemFont = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export function readPreviewTheme(): PreviewTheme {
  try {
    const saved = JSON.parse(localStorage.getItem(themeStorageKey) || "null");
    if (!saved || typeof saved !== "object") return { ...defaultPreviewTheme };
    return {
      accent: typeof saved.accent === "string" && isHexColor(saved.accent) ? saved.accent : undefined,
      radius: ["none", "sm", "md", "lg", "full"].includes(saved.radius) ? saved.radius : "md",
      font: saved.font === "system" ? "system" : "geist",
      mode: saved.mode === "dark" ? "dark" : "light",
    };
  } catch { return { ...defaultPreviewTheme }; }
}

export function savePreviewTheme(theme: PreviewTheme) {
  try { localStorage.setItem(themeStorageKey, JSON.stringify(theme)); } catch { /* Preview still works without storage. */ }
}
