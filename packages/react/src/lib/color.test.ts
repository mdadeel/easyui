import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  getAccentPalette,
  isHexColor,
  parseHex,
  readableForeground,
  relativeLuminance,
  toHex,
} from "./color";

describe("parseHex / toHex", () => {
  it("parses 6-digit and 3-digit hex, with or without #", () => {
    expect(parseHex("#ff8000")).toEqual([255, 128, 0]);
    expect(parseHex("ff8000")).toEqual([255, 128, 0]);
    expect(parseHex("#f80")).toEqual([255, 136, 0]);
  });

  it("round-trips to normalized lowercase #rrggbb", () => {
    expect(toHex(parseHex("#ABC"))).toBe("#aabbcc");
  });

  it("rejects invalid input instead of guessing", () => {
    expect(() => parseHex("red")).toThrow(/not a valid hex color/);
    expect(() => parseHex("#12345")).toThrow();
    expect(isHexColor("#zzzzzz")).toBe(false);
    expect(isHexColor("#123456")).toBe(true);
  });
});

describe("contrast", () => {
  it("gives 21:1 for black on white and 1:1 for identical colors", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#777777", "#777777")).toBeCloseTo(1, 5);
  });

  it("matches the WCAG luminance of white", () => {
    expect(relativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
    expect(relativeLuminance([0, 0, 0])).toBe(0);
  });

  it("picks the more readable foreground for a background", () => {
    expect(readableForeground("#000000")).toBe("#ffffff");
    expect(readableForeground("#ffff00")).toBe("#0a0a0a");
  });
});

describe("getAccentPalette", () => {
  it("normalizes the accent and returns a foreground that meets WCAG AA", () => {
    const palette = getAccentPalette("#7C3AED");
    expect(palette.accent).toBe("#7c3aed");
    expect(palette.contrast).toBeGreaterThanOrEqual(4.5);
  });

  it("meets AA for a range of brand colors", () => {
    for (const color of ["#2563eb", "#16a34a", "#f59e0b", "#e11d48", "#14b8a6", "#64748b"]) {
      expect(getAccentPalette(color).contrast, color).toBeGreaterThanOrEqual(4.5);
    }
  });
});
