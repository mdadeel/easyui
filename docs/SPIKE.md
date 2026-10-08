# Primitive spike: Base UI vs Radix

Goal: pick the headless primitive layer for Dialog and Select (PLAN.md, decision 2).

## Method

Built the same Dialog (title, description, cancel) and Select (3 options) on both
libraries, then tested them the same way:

- **Real browser** (headless Chromium, driven by Puppeteer): open, Tab trap, Escape, focus return, keyboard select, mouse select, axe on the open dialog.
- **jsdom** (Vitest): same behaviors. Used for regression tests only, because jsdom can't check focus trapping faithfully.

Versions tested: `@base-ui/react` 1.8.0, `@radix-ui/react-dialog` 1.2.0, `@radix-ui/react-select` 2.3.8.

## Results

| Check | Base UI | Radix |
|---|---|---|
| Dialog opens, labelled by title | pass | pass |
| Escape closes, focus returns to trigger | pass | pass |
| Tab stays inside dialog (real browser, 6 presses) | pass | pass |
| axe on open dialog (0 violations) | pass | pass |
| Select opens with keyboard and click | pass | pass |
| Select keyboard selection (arrows + Enter) | pass | pass |
| Select mouse selection | pass | pass |
| axe on open select | pass | pass |
| Console errors | none | none |
| Gzipped size, Dialog + Select (esbuild, minified, react external) | ~49.8 KB | ~33.3 KB |

### Notes on the results

- **Tab trap in jsdom vs browser.** In jsdom, Base UI's focus guards let focus escape to `<body>` after the first Tab. In a real browser it stays trapped. jsdom doesn't fully emulate the focus-guard mechanism, so the browser result is the one that counts. Our jsdom suite doesn't assert the trap for this reason. Browser coverage is in the e2e script.
- **Base UI keeps the popup mounted but hidden** (`hidden`, `data-closed`, `aria-expanded="false"`) after closing. Any test that queries `[role="listbox"]` will find it. Query for `:not([hidden])` or check `aria-expanded`. An early spike run had this wrong and looked like a failure.
- **Radix passed every check on the first run**, and the Base UI failures were harness bugs, not library defects. Both libraries behave correctly.

## Decision: Base UI

Base UI is the primitive layer. Reasons:

1. **Same behavior, both pass.** The accessibility checks don't separate them, so the decision comes down to other factors.
2. **Direction of travel.** Base UI v1 shipped on Dec 11, 2025, from the team behind Radix, Floating UI, and MUI, with a stated long-term maintenance commitment. [Base UI announcement](https://x.com/base_ui/status/1999154611123257522). Sources disagree on Radix's current maintenance status, so we don't rely on it.
3. **Ecosystem.** shadcn/ui is moving to Base UI as its default. Not verified against the official docs yet.

**Cost:** about 16 KB more gzipped for the Dialog + Select pair. Both are tree-shakeable, and Dialog and Select are lazy-loadable.

**Fallback:** if bundle size becomes the binding constraint, switching to Radix means changing the `components/dialog` and `components/select` wrappers only. Consumers use our exports and never import the primitive directly, so the switch doesn't break the public API.

## What was built on top

- `Dialog` (centered on desktop, bottom sheet under 640px), with `DialogTrigger`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogFooter`, and `DialogClose`. Enter and exit animate only opacity and transform.
- `Select` with `SelectTrigger`, `SelectValue`, `SelectContent`, and `SelectItem`. Pass `items` to the root so the trigger shows the selected label.
- `Field` and `Input`. `Field` wires the label, description, and error ids and sets `aria-invalid`. `Input` reads that context automatically.
- `EasyUIProvider` now mounts portals inside itself, so dialogs and selects inherit the theme. Before this change they rendered on `<body>` and lost the theme.

## Verification

- Vitest: 36 tests passing across 6 files.
- Browser e2e (headless Chromium): field validation, select selection, dialog focus trap, Escape and focus return, axe on dialog and full page, and a mobile bottom sheet with no horizontal overflow. All passed.
