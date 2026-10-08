import { createContext, useContext, useMemo, useState, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { getAccentPalette, isHexColor } from "../lib/color";

export type EasyUIRadius = "none" | "sm" | "md" | "lg" | "full";
export type EasyUITheme = "light" | "dark";

export interface EasyUIProviderProps extends Omit<HTMLAttributes<HTMLDivElement>, "style"> {
  /**
   * Brand color, as hex. Accent text color and hover shade are derived from it,
   * and every component using the accent updates. Defaults to the neutral ink
   * from the theme.
   */
  accent?: string;
  /** Corner radius for components that use the base radius. */
  radius?: EasyUIRadius;
  /** CSS font-family for sans-serif UI text. Load the font yourself. */
  fontFamily?: string;
  /** Force light or dark for this subtree. Omit to inherit from the page. */
  theme?: EasyUITheme;
  /** Extra inline styles. Merged after the theme variables, so they win. */
  style?: CSSProperties;
  children?: ReactNode;
}

const RADIUS: Record<EasyUIRadius, string> = {
  none: "var(--eui-radius-none)",
  sm: "var(--eui-radius-sm)",
  md: "var(--eui-radius-md)",
  lg: "var(--eui-radius-lg)",
  full: "var(--eui-radius-full)",
};

const EasyUIRootContext = createContext<HTMLElement | null>(null);

/**
 * The element of the nearest EasyUIProvider, or null outside one.
 * Portaled components (Dialog, Select) mount here so they inherit the theme.
 * @internal
 */
export function useEasyUIRoot(): HTMLElement | null {
  return useContext(EasyUIRootContext);
}

/**
 * Scopes theme customization to a subtree. Wrap your app (or a section of it)
 * once; everything inside picks up the chosen accent, radius, and font.
 * Portaled overlays (dialogs, selects) are mounted inside the provider too,
 * so they keep the same theme.
 */
export function EasyUIProvider({
  accent,
  radius,
  fontFamily,
  theme,
  className,
  style,
  children,
  ...rest
}: EasyUIProviderProps) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  const vars = useMemo(() => {
    const v: Record<string, string> = {};
    if (accent !== undefined) {
      if (!isHexColor(accent)) {
        throw new Error(`EasyUIProvider: accent "${accent}" must be a hex color (#rgb or #rrggbb).`);
      }
      const palette = getAccentPalette(accent);
      v["--eui-color-accent"] = palette.accent;
      v["--eui-color-accent-fg"] = palette.accentForeground;
      v["--eui-color-accent-hover"] = palette.accentHover;
    }
    if (radius !== undefined) {
      v["--eui-radius-base"] = RADIUS[radius];
    }
    if (fontFamily !== undefined) {
      v["--eui-font-sans"] = fontFamily;
    }
    return v;
  }, [accent, radius, fontFamily]);

  return (
    <EasyUIRootContext.Provider value={root}>
      <div
        {...rest}
        ref={setRoot}
        className={cn("eui-root", className)}
        data-theme={theme}
        style={{ ...vars, ...style } as CSSProperties}
      >
        {children}
      </div>
    </EasyUIRootContext.Provider>
  );
}
