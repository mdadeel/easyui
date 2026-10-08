// Concatenates the generated design tokens and component styles into one
// stylesheet: dist/styles.css. Consumers import it once:
//
//   import "@easyui/react/styles.css";

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(here, "..");

const parts = [
  path.join(pkgRoot, "..", "tokens", "dist", "tokens.css"),
  path.join(pkgRoot, "src", "styles", "base.css"),
  path.join(pkgRoot, "src", "styles", "button.css"),
];

const css = parts
  .map((p) => `/* ${path.relative(pkgRoot, p)} */\n${readFileSync(p, "utf8").trim()}\n`)
  .join("\n");

mkdirSync(path.join(pkgRoot, "dist"), { recursive: true });
writeFileSync(path.join(pkgRoot, "dist", "styles.css"), css);
console.log(`styles: wrote dist/styles.css (${css.length} bytes)`);
