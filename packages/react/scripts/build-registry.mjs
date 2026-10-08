// Builds a shadcn-style registry from src/ into registry/.
//
//   registry/r/<name>.json   one item per component, with every file inlined
//   registry/r/easyui-tokens.json  design tokens and base layer, a dependency of every item
//   registry/registry.json   an index of the items (names, types, dependencies)
//
// Each item carries the component, every local file it imports (provider, cn, Button,
// Field, ...), and its CSS. Files land under components/easyui/ with the same folder
// layout as src/, so the relative imports keep working in the consumer's project.
//
// Usage: `npx shadcn@latest add https://<host>/r/<name>.json`

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.join(here, "..");
const srcRoot = path.join(pkgRoot, "src");
const stylesRoot = path.join(srcRoot, "styles");
const outDir = path.join(pkgRoot, "registry");
const rDir = path.join(outDir, "r");
const TARGET_ROOT = "components/easyui";
const SCHEMA = "https://ui.shadcn.com/schema/registry-item.json";
const INDEX_SCHEMA = "https://ui.shadcn.com/schema/registry.json";

// Component folder -> stylesheet name, where the names differ.
const STYLE_FOR = { "alert-dialog": "dialog", "dropdown-menu": "menu" };

// Human copy for each item. Keep it short; it appears in the CLI prompt and the docs.
const META = {
  accordion: "A vertically stacked set of collapsible sections.",
  alert: "A short inline message with an optional icon, in four tones.",
  "alert-dialog": "A modal that asks the user to confirm an action before it runs.",
  "aspect-ratio": "Keeps content at a fixed width-to-height ratio.",
  avatar: "A user image with a text fallback.",
  badge: "A small status label.",
  breadcrumb: "A trail that shows where the current page sits in the app.",
  button: "A pressable action with primary, secondary, ghost, and danger variants.",
  card: "A surface for grouping related content.",
  choice: "Checkbox and switch controls with labels and descriptions.",
  collapsible: "A single block of content that can be shown or hidden.",
  combobox: "A text input that filters a list of options.",
  dialog: "A modal window with a title, description, and footer.",
  "dropdown-menu": "A menu of actions opened from a trigger.",
  empty: "A placeholder for a view with no content yet, with one next step.",
  field: "Wires a label, description, and error message to a form control.",
  input: "A single-line text field in two sizes.",
  kbd: "Shows a keyboard shortcut.",
  label: "A form label with an optional required marker.",
  link: "A text link with the accent color and a clear focus ring.",
  pagination: "Numbered pages with previous and next controls.",
  popover: "A floating panel anchored to a trigger.",
  progress: "A determinate progress bar with an optional label and value.",
  radio: "A group of radio buttons with labels and descriptions.",
  select: "A dropdown to choose one option from a list.",
  separator: "A thin divider, horizontal or vertical.",
  sheet: "A panel that slides in from an edge of the screen.",
  skeleton: "A pulsing placeholder for content that is loading.",
  slider: "Picks a number, or a range of numbers, on a track.",
  spinner: "An indeterminate loading indicator with an accessible label.",
  table: "A styled data table that scrolls sideways on small screens.",
  tabs: "Switches between panels of related content.",
  textarea: "A multi-line text field.",
  toast: "A short notification that appears and dismisses itself.",
  toggle: "A button that stays pressed, with a group variant for several options.",
  tooltip: "A short hint that appears on hover and focus.",
};

const IMPORT_RE = /(?:import|export)\s+(?:[^"';]*?\s+from\s+)?["'](\.{1,2}\/[^"']+)["']/g;

function resolveLocal(fromFile, spec) {
  const base = path.resolve(path.dirname(fromFile), spec);
  for (const candidate of [`${base}.tsx`, `${base}.ts`, path.join(base, "index.ts")]) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(`Unresolved import "${spec}" in ${path.relative(pkgRoot, fromFile)}`);
}

/** Collects the transitive closure of local source files starting from `entry`. */
function collect(entry, seen = new Map()) {
  if (seen.has(entry)) return seen;
  seen.set(entry, true);
  const text = readFileSync(entry, "utf8");
  for (const m of text.matchAll(IMPORT_RE)) {
    collect(resolveLocal(entry, m[1]), seen);
  }
  return seen;
}

function componentOf(file) {
  const rel = path.relative(path.join(srcRoot, "components"), file);
  if (rel.startsWith("..")) return null;
  return rel.split(path.sep)[0];
}

function targetOf(file) {
  return `${TARGET_ROOT}/${path.relative(srcRoot, file).split(path.sep).join("/")}`;
}

function styleTargetFor(dirName) {
  const stem = STYLE_FOR[dirName] ?? dirName;
  return path.join(stylesRoot, `${stem}.css`);
}

/** Adds a CSS import right after the last import line, so the file ships with its styles. */
function withStyleImport(text, cssRelFromFile) {
  const lines = text.split("\n");
  let last = -1;
  lines.forEach((l, i) => {
    if (/^import\s/.test(l) || /^\}\s*from\s/.test(l)) last = i;
  });
  lines.splice(last + 1, 0, `import "${cssRelFromFile}";`);
  return lines.join("\n");
}

function relImport(fromFile, toFile) {
  let r = path.relative(path.dirname(fromFile), toFile).split(path.sep).join("/");
  if (!r.startsWith(".")) r = `./${r}`;
  return r.replace(/\.css$/, ".css");
}

function buildComponentItem(dirName) {
  const entry = path.join(srcRoot, "components", dirName, `${dirName}.tsx`);
  const files = collect(entry);
  const outFiles = [];
  const usesBaseUi = new Set();
  const cssRequired = new Set();

  for (const file of files.keys()) {
    const comp = componentOf(file);
    let text = readFileSync(file, "utf8");
    if (comp) {
      cssRequired.add(comp);
    }
    for (const m of text.matchAll(/from\s+["'](@base-ui\/react[^"']*)["']/g)) {
      usesBaseUi.add("@base-ui/react");
    }
    outFiles.push({ file, text });
  }

  // Inject the component stylesheet next to the component module that owns it.
  for (const f of outFiles) {
    const comp = componentOf(f.file);
    if (!comp || !f.file.endsWith(`${comp}.tsx`)) continue;
    const css = styleTargetFor(comp);
    f.text = withStyleImport(f.text, relImport(f.file, css));
  }

  const files2 = outFiles.map(({ file, text }) => ({
    path: path.relative(pkgRoot, file).split(path.sep).join("/"),
    type: "registry:file",
    target: targetOf(file),
    content: text,
  }));

  for (const comp of cssRequired) {
    const css = styleTargetFor(comp);
    if (!existsSync(css)) continue;
    files2.push({
      path: path.relative(pkgRoot, css).split(path.sep).join("/"),
      type: "registry:file",
      target: targetOf(css),
      content: readFileSync(css, "utf8"),
    });
  }

  // De-duplicate by target (a CSS file can be reached twice).
  const byTarget = new Map(files2.map((f) => [f.target, f]));

  return {
    $schema: SCHEMA,
    name: dirName,
    type: "registry:ui",
    title: titleCase(dirName),
    description: META[dirName] ?? "",
    dependencies: [...usesBaseUi],
    registryDependencies: ["easyui-tokens"],
    files: [...byTarget.values()],
  };
}

function buildTokensItem() {
  const tokens = path.join(pkgRoot, "..", "tokens", "dist", "tokens.css");
  const base = path.join(stylesRoot, "base.css");
  if (!existsSync(tokens)) throw new Error("Run the tokens build first: packages/tokens/dist/tokens.css is missing.");
  return {
    $schema: SCHEMA,
    name: "easyui-tokens",
    type: "registry:file",
    title: "easyui tokens",
    description: "Design tokens (CSS variables) and the base layer. Load once, before any component.",
    dependencies: [],
    registryDependencies: [],
    files: [
      {
        path: "../tokens/dist/tokens.css",
        type: "registry:file",
        target: `${TARGET_ROOT}/styles/tokens.css`,
        content: readFileSync(tokens, "utf8"),
      },
      {
        path: "src/styles/base.css",
        type: "registry:file",
        target: `${TARGET_ROOT}/styles/base.css`,
        content: readFileSync(base, "utf8"),
      },
    ],
  };
}

function titleCase(s) {
  return s
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

// --- run ---------------------------------------------------------------------

const componentsDir = path.join(srcRoot, "components");
const dirs = readdirSync(componentsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(path.join(componentsDir, d.name, `${d.name}.tsx`)))
  .map((d) => d.name)
  .sort();

rmSync(rDir, { recursive: true, force: true });
mkdirSync(rDir, { recursive: true });

const items = [buildTokensItem(), ...dirs.map(buildComponentItem)];
for (const item of items) {
  writeFileSync(path.join(rDir, `${item.name}.json`), `${JSON.stringify(item, null, 2)}\n`);
}

const index = {
  $schema: INDEX_SCHEMA,
  name: "easyui",
  homepage: "https://github.com/mdadeel/easyui",
  items: items.map((i) => ({
    name: i.name,
    type: i.type,
    title: i.title,
    description: i.description,
    dependencies: i.dependencies,
    registryDependencies: i.registryDependencies,
    url: `r/${i.name}.json`,
  })),
};
writeFileSync(path.join(outDir, "registry.json"), `${JSON.stringify(index, null, 2)}\n`);
console.log(`registry: wrote ${items.length} items to registry/r/ (${dirs.length} components + tokens)`);
