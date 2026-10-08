/**
 * Color helpers for runtime theming.
 *
 * Accepts 3- or 6-digit hex colors (with or without "#"). Everything else
 * is rejected up front so theme values can't silently produce unreadable text.
 */

export type RGB = readonly [number, number, number];

const HEX = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isHexColor(value: string): boolean {
  return HEX.test(value.trim());
}

export function parseHex(value: string): RGB {
  const trimmed = value.trim();
  if (!HEX.test(trimmed)) {
    throw new Error(`easyui: "${value}" is not a valid hex color (use #rgb or #rrggbb).`);
  }
  let hex = trimmed.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function toHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

/** WCAG 2.x relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance(rgb: RGB): number {
  const [r, g, b] = rgb.map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

/** WCAG contrast ratio between two hex colors, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(parseHex(a));
  const lb = relativeLuminance(parseHex(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

const ON_ACCENT_CANDIDATES = ["#ffffff", "#0a0a0a"] as const;

/**
 * Picks the foreground (white or near-black) with the highest contrast
 * against the given background. Used for text on custom accent colors.
 */
export function readableForeground(background: string): string {
  let best: string = ON_ACCENT_CANDIDATES[0];
  let bestRatio = 0;
  for (const candidate of ON_ACCENT_CANDIDATES) {
    const ratio = contrastRatio(background, candidate);
    if (ratio > bestRatio) {
      best = candidate;
      bestRatio = ratio;
    }
  }
  return best;
}

export interface AccentPalette {
  /** Normalized #rrggbb accent. */
  accent: string;
  /** Foreground for text and icons on the accent. Meets WCAG AA for normal text. */
  accentForeground: string;
  /** Contrast ratio of accentForeground on accent. */
  contrast: number;
}

/** Derives the accent pair from one user-chosen color. */
export function getAccentPalette(input: string): AccentPalette {
  const accent = toHex(parseHex(input));
  const accentForeground = readableForeground(accent);
  return {
    accent,
    accentForeground,
    contrast: contrastRatio(accent, accentForeground),
  };
}
