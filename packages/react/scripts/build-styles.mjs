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
  path.join(pkgRoot, "src", "styles", "field.css"),
  path.join(pkgRoot, "src", "styles", "input.css"),
  path.join(pkgRoot, "src", "styles", "dialog.css"),
  path.join(pkgRoot, "src", "styles", "select.css"),
  path.join(pkgRoot, "src", "styles", "textarea.css"),
  path.join(pkgRoot, "src", "styles", "choice.css"),
  path.join(pkgRoot, "src", "styles", "tabs.css"),
  path.join(pkgRoot, "src", "styles", "tooltip.css"),
  path.join(pkgRoot, "src", "styles", "card.css"),
  path.join(pkgRoot, "src", "styles", "radio.css"),
  path.join(pkgRoot, "src", "styles", "accordion.css"),
  path.join(pkgRoot, "src", "styles", "avatar.css"),
  path.join(pkgRoot, "src", "styles", "badge.css"),
  path.join(pkgRoot, "src", "styles", "link.css"),
  path.join(pkgRoot, "src", "styles", "separator.css"),
  path.join(pkgRoot, "src", "styles", "skeleton.css"),
  path.join(pkgRoot, "src", "styles", "combobox.css"),
  path.join(pkgRoot, "src", "styles", "popover.css"),
  path.join(pkgRoot, "src", "styles", "menu.css"),
  path.join(pkgRoot, "src", "styles", "sheet.css"),
  path.join(pkgRoot, "src", "styles", "toast.css"),
];

const css = parts
  .map((p) => `/* ${path.relative(pkgRoot, p)} */\n${readFileSync(p, "utf8").trim()}\n`)
  .join("\n");

mkdirSync(path.join(pkgRoot, "dist"), { recursive: true });
writeFileSync(path.join(pkgRoot, "dist", "styles.css"), css);
console.log(`styles: wrote dist/styles.css (${css.length} bytes)`);
