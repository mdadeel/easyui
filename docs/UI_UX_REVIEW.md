# UI/UX review — easyui

Reviewed against: Vercel web-interface-guidelines (command.md), anti-slop, impeccable,
taste-skill, emilkowalski/skills. Scope: `packages/react` (38 components, 36 stylesheets),
`apps/playground` (discovery gallery, playground, blocks), `packages/tokens`. The design
was not changed — findings are fixes to existing issues plus notes.

## Verdict

This codebase is well above the typical "template" baseline. Every token text pair passes
WCAG AA contrast (measured with the standard formula across both themes: fg on bg 15.7:1,
fg-muted 5.2–6.4:1, accent-fg on accent 7.3:1 light / 11.9:1 dark, danger 4.3–7.0:1).
Focus-visible rings with offset are universal, reduced-motion is honored in every
keyframe/motion rule, logical properties are used throughout (RTL-safe), toast/sheet
respect safe-area insets, and there are no `div onClick`, `transition: all`, or
label-less form controls. Remaining issues were small and are fixed below.

## Fixed

1. **Progress animated layout** — `packages/react/src/styles/progress.css`,
   `components/progress/progress.tsx`: the fill transitioned `width`, which is a layout
   property. Now animates `transform: scaleX` on the compositor (identical visuals),
   with an RTL-aware `transform-origin`. Value changes still read as the same 120–200ms
   fill; reduced-motion still disables it.

2. **Sheet viewport units + notches** — `packages/react/src/styles/sheet.css`:
   bottom sheet `max-height: 85vh` → `85dvh` (dialog.css already used `dvh`); side and
   bottom sheets now pad by `env(safe-area-inset-*)` on every edge they touch, so content
   clears the notch and home indicator. No change on devices without insets.

3. **Touch targets below 44px** (WCAG 2.2 target size):
   - `packages/react/src/styles/toggle.css`: `--sm` 32px and joined-group 30px → 40px
     under `@media (pointer: coarse)`, matching the existing button.css idiom.
   - `packages/react/src/styles/breadcrumb.css`: links 24px → 40px on coarse pointers.
   - `apps/playground/src/blocks.css`: `.nav__item` 40px, `.data__sort` 32px,
     `.page__nav-link` ~30px → 44px on coarse pointers.
   - `apps/playground/src/playground.css`: accent `.swatch` stays 28px visually; an
     invisible `::after` (inset −8px) extends the tap area to 44px (slider.css idiom).

4. **Placeholder typography** — `apps/playground/src/Gallery.tsx`,
   `examples/textarea.tsx`: placeholders ended in `...`; now `…` per the guidelines.

5. **Shortcut promised, shortcut missing** — `apps/playground/src/ComponentsDemo.tsx`
   shows `Press ⌘ K to search` on the playground page, which had no search and no
   handler (the hint is a working feature on the gallery page only). `App.tsx` now
   routes ⌘/Ctrl+K to the collection search (`/?focus=search`; the param is stripped
   after focusing), guarded so it never hijacks typing in a field. Hint and behavior
   now agree everywhere.

## Verified strong (no change needed)

- **Accessibility**: `aria-label` on icon-only buttons, `aria-pressed` on toggles/saved,
  `role="status"` toasts (not `role="alert"`), sr-only spinner labels, `aria-live` pager
  status, `aria-sort` sortable columns, sr-only table captions + labelled mobile card
  transform, Field label/description/error wiring with `role="alert"` + `noValidate`,
  h1→h2→h3 hierarchy, `<Kbd>` hints match real behavior on the gallery (`Ctrl / ⌘ K`).
- **Motion**: no `transition: all`; transform/opacity-only entrances via Base UI
  `data-starting-style`/`data-ending-style`; `eui-pulse` and the spinner degrade to
  static states under `prefers-reduced-motion`; smooth scroll is reduced-motion gated.
- **Forms**: correct `type`/`inputmode`/`autocomplete` on inputs, paste is never
  blocked, search is labelled, select has an sr-only label.
- **Layout**: `min-width: 0` on flex/grid children, `overflow-wrap` where needed,
  `tabular-nums` on progress/slider/pagination, `text-wrap: balance/pretty` on headings,
  `overscroll-behavior: contain` on modals, `scroll-margin-top` on anchored sections.
- **Theming**: token pipeline (DTCG → CSS vars) with derived accent palette; the
  contrast test suite (`packages/react/src/lib/token-contrast.test.ts`) locks the
  palette to AA. Slider's thumb hit area (20px visual, `::after` inset −12px, 44px
  coarse) is the model for small targets.

## Notes (deliberately not changed — would alter the design or scope)

1. `apps/playground/src/gallery.css:1` — `.view-toggle` / `.icon-button` rules
   (hover-reveal `opacity: 0`) are dead CSS; no element uses those classes. Remove on
   the next cleanup, or if they are ever used, gate the reveal behind
   `@media (hover: hover)` so touch users can always see them.
2. Demo copy uses `href="#"` links (`App.tsx`, `ComponentsDemo.tsx`, `blocks.tsx`) —
   they demonstrate Link/Breadcrumb and scroll to top when clicked. Fine for demos;
   use real destinations in production copy.
3. Build reports a 625 kB chunk (rolldown warning) — code-splitting `CodeViewer` would
   fix it; pre-existing, not a design issue.
4. Progress fill does not animate on first paint (value is set at first render) —
   same as before the fix.

Verification: `pnpm build`, `pnpm test` (127 library tests + 9 playground tests),
`pnpm lint`, `pnpm typecheck` all pass; live dev server smoke-checked. No headless
browser was available in this environment, so visuals were verified by code inspection
and the live preview.
