import { describe, expect, it } from "vitest";
import light from "../../../tokens/src/light.json";
import dark from "../../../tokens/src/dark.json";
import { contrastRatio } from "./color";

describe("default color tokens", () => {
  for (const [name, theme] of [["light", light], ["dark", dark]] as const) {
    it(`${name} has readable text, controls, and button states`, () => {
      const c = theme.color;
      for (const [foreground, background] of [
        [c.fg.$value, c.bg.$value], [c["fg-muted"].$value, c.bg.$value],
        [c["fg-muted"].$value, c.surface.$value], [c["accent-fg"].$value, c.accent.$value],
        [c["accent-fg"].$value, c["accent-hover"].$value], [c["danger-fg"].$value, c.danger.$value],
        [c["danger-fg"].$value, c["danger-hover"].$value], [c.danger.$value, c.bg.$value],
        [c.warning.$value, c.surface.$value],
      ]) expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5);
      for (const token of [c["border-strong"].$value, c.ring.$value]) {
        expect(contrastRatio(token, c.bg.$value)).toBeGreaterThanOrEqual(3);
      }
    });
  }
});
