import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("gallery previews allow page scroll chaining at their boundaries", async () => {
  // This guards the CSS setting; wheel and touch behavior need a real browser.
  const css = await readFile(new URL("../src/gallery.css", import.meta.url), "utf8");
  const declaration = css.match(/\.discovery\s+\.stage-content\s*\{([^}]*)\}/)?.[1];
  assert.ok(declaration, "the gallery preview rule should exist");
  assert.match(declaration, /(?:^|;)\s*overflow:\s*auto\s*;/);
  assert.match(declaration, /(?:^|;)\s*overscroll-behavior:\s*auto\s*;/);
});
