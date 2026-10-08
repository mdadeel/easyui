# easyui — Research & Project Plan

> Status: **Draft for review.** Nothing is built yet. This document captures (1) what production-grade UI looks like today, (2) a proposed stack and architecture, and (3) a phased plan to get from an empty repo to a usable v0.1.

---

## 1. Goal

Build a **production-grade, fully responsive React UI library** that:

- Feels as polished as **shadcn/ui** (clean, minimal, copy-paste-friendly, owned by the user).
- Is **better than shadcn** in the areas that matter: stronger visual craft ("human-made" rather than template-made), easier theming, and more complete responsive patterns.
- Has **smooth but light animation** — motion that clarifies state changes and never costs frame budget or accessibility.
- Is **customizable**: colors, fonts, radii, borders, shadows, spacing, density, and motion can be changed from a single theme source without touching component code.

---

## 2. Research findings

### 2.1 How shadcn/ui is built (the baseline to beat)

- shadcn/ui is **not an npm dependency**. Components are copied into the user's project by a CLI, so users own the source. Components are built on **Radix UI primitives** (accessibility/behavior) and styled with **Tailwind** utilities. Theming uses **CSS variables** in the global stylesheet. ([designrevision](https://designrevision.com/blog/shadcn-ui-guide))
- `components.json` controls the setup, including `baseColor` and `cssVariables`. Those choices are locked after init, which is a constraint worth designing around. ([shadcn docs](https://ui.shadcn.com/docs/components-json))
- Distribution is a **JSON registry**. Items declare `type`, `registryDependencies`, `dependencies`, `files`, and `cssVars`, so a custom library can be installed with the same CLI. ([registry-item.json](https://ui.shadcn.com/docs/registry/registry-item-json))

**Takeaway:** the copy-paste + CSS-variables + registry model is the right distribution pattern for this project. The gaps to close are visual craft and theming ergonomics, not architecture.

### 2.2 Headless primitives: Radix vs Base UI

- **Base UI** reached v1.0 on **Dec 11, 2025** with 35 unstyled components, from the Radix, Floating UI, and MUI teams. ([Base UI on X](https://x.com/base_ui/status/1999154611123257522)). Reports say it is now the default in the shadcn CLI, with Radix still supported. ([shadcndeck](https://www.shadcndeck.com/blog/radix-vs-base-ui))
- **Radix Primitives** is mature and widely used. Its components are unstyled and WAI-ARIA compliant, handling focus, keyboard navigation, and ARIA. ([codingdunia](https://codingdunia.com/ui-components/radix-ui/))
- Sources disagree on maintainer and momentum details. **Verify on the official sites before committing** (see Open Questions).

**Takeaway:** never hand-roll Dialog, Popover, Select, Tooltip, Menu, or Combobox. Build on a headless primitive layer and own only the styling.

### 2.3 Design tokens (the foundation of customizability)

- The **W3C DTCG format 2025.10** became the first stable spec on Oct 28, 2025. Tokens have `$value` and `$type`, and can reference other tokens by path. Figma, Style Dictionary, and Tokens Studio all read or write it. ([CODERCOPS](https://blog.codercops.com/blog/design-tokens-2026-w3c-format-guide))
- Mature systems use **three layers**: primitive (raw `blue-500`), semantic (`action-primary`), and component (`button-bg`). Application code should not reference primitives directly. ([UXPilot](https://uxpilot.ai/blogs/design-system-best-practices))
- **Tailwind CSS v4** uses CSS-first config with `@theme`. Tokens become utilities and runtime CSS variables from one source. ([MironSoft](https://www.mironsoft.de/en/blog/tailwind-css-v4-new-features-explained))

**Takeaway:** source tokens in DTCG JSON, compile them to CSS variables, and expose a small semantic API to components. Users change one theme file to rebrand.

### 2.4 Accessibility (non-negotiable baseline)

- Treat **WCAG 2.2 AA** as the minimum bar. Contrast: **4.5:1** for normal text, **3:1** for large text and UI components. Minimum target size: **24×24 px**. Don't rely on color alone for state. ([inhaq](https://inhaq.com/blog/accessibility-for-design-engineers-building-inclusive-uis.html), [Montana B](https://montanab.com/2025/03/accessible-design-systems-building-components-for-everyone/))
- Don't hide or override focus outlines. Make them visible. Trap focus inside modals and return it on close. ([Montana B](https://montanab.com/2025/03/accessible-design-systems-building-components-for-everyone/))
- **Testing:** lint JSX with `eslint-plugin-jsx-a11y`, test components with axe-core + Testing Library, scan full pages with `@axe-core/playwright`, and do manual keyboard and screen-reader checks. Automated tools catch only part of the issues. ([a11yflow](https://www.a11yflow.dev/blog/react-accessibility-testing-guide))

### 2.5 Motion: smooth, not heavy

- **Animate only `transform` and `opacity`.** Those run on the compositor. Animating `width`, `height`, `top`, `left`, `margin`, or `box-shadow` forces layout every frame. ([GreadMe](https://www.greadme.com/blog/performance/optimize-animated-content-for-speed-complete-guide))
- Budget the motion. Each animation needs a reason: state change, spatial relationship, feedback, or delight. Real devices (mid-tier Android in battery saver) can drop well below 60 fps. ([72Technologies](https://www.72technologies.com/blog/motion-budget-ui-animation-ratios))
- **Reduced motion is a parallel design, not zero duration.** Keep opacity transitions and remove transforms when `prefers-reduced-motion: reduce` is set. ([72Technologies](https://www.72technologies.com/blog/motion-budget-ui-animation-ratios))
- Motion library cost: the full `motion` component is ~34 KB gzipped. `LazyMotion` + `m` drops the initial cost to ~4.6–6 KB. ([LogRocket](https://blog.logrocket.com/creating-react-animations-with-motion/), [agent-skills](https://agent-skills.md/skills/kvngrf/flowsterix/motion))
- Avoid scroll-driven animation loops. Trigger reveals once with IntersectionObserver. ([72Technologies](https://www.72technologies.com/blog/motion-budget-ui-animation-ratios))

**Takeaway:** use CSS transitions for most component states (zero JS cost). Reserve the Motion library for a few orchestrated pieces (dialog, sheet, list enter/exit) loaded via `LazyMotion`.

### 2.6 What makes UI look "human-made" vs template-made

Common findings across the sources:

- **Typography does most of the work.** Choose one expressive display face and one body face. Use weight, size, and tracking to create hierarchy. Negative tracking on large headings and tight leading on display text give a designed look. Avoid default-looking defaults (Inter/Roboto/system stacks used with no adjustment). ([Medium/getalai](https://getalai.com/blog/make-ai-slides-look-designer-made), [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website))
- **Restrained color with one deliberate accent.** Geist-style systems use neutrals and treat accent as punctuation. ([designsystems.one](https://www.designsystems.one/design-systems/vercel-geist))
- **Borders and depth done with intent.** Vercel's system uses `box-shadow: 0 0 0 1px` as a border, plus a layered elevation shadow. Shadows are consistent and subtle, not generic `0.1` opacity. ([Open Design](https://open-design.ai/plugins/design-system-vercel/), [getalai](https://getalai.com/blog/make-ai-slides-look-designer-made))
- **Real content, not lorem ipsum.** Design around real copy. Break perfect symmetry where it helps. ([recodehive discussion](https://github.com/orgs/recodehive/discussions/971))
- **Avoid the "AI template" tells:** purple gradients on white, identical icon-in-box feature grids, rounded-everything, uniform card patterns, and "clean and modern" as the only design direction. ([gendesigns](https://gendesigns.ai/blog/ai-generated-ui-mistakes-how-to-fix), [prg.sh](https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website))
- **Spacing rhythm.** Use one spacing scale (for example, 4 px base) and apply it consistently. ([gendesigns](https://gendesigns.ai/blog/ai-generated-ui-mistakes-how-to-fix))

**Caveat:** "human-made" is a judgment, not a metric. The plan includes a design review step with real people, not just automated checks.

### 2.7 Reference points

- **Geist** (Vercel): open-source Geist Sans and Geist Mono, restrained neutrals, tabular numerals, and developer-tool polish. Good reference for type and restraint. ([Basement](https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web))
- **shadcn/ui**: reference for API ergonomics and distribution model.
- **Base UI / Radix**: reference for behavior and accessibility.

---

## 3. Proposed stack

| Concern | Proposal | Why | Alternatives |
|---|---|---|---|
| Framework | React 19 + TypeScript (strict) | Largest ecosystem; shadcn-compatible | Vue/Svelte later |
| Headless primitives | **Base UI** (verify), fallback Radix | Accessibility and behavior handled | Ariakit, React Aria |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) + CSS variables | Tokens in CSS, runtime theming | Vanilla CSS with layers |
| Variants | `class-variance-authority` + `clsx` + `tailwind-merge` | Typed variants, safe class merging | Hand-rolled |
| Tokens | DTCG JSON → Style Dictionary (or a small custom script) → CSS vars + TS types | Portable, single source of truth | Hand-written CSS only |
| Motion | CSS transitions by default; `motion` with `LazyMotion` for orchestration | Lowest cost, smooth where it matters | GSAP (heavier) |
| Icons | Lucide (or similar tree-shakeable set) | Consistent, small | Custom set later |
| Build | Vite library mode or `tsup`, ESM + types, `sideEffects: false` | Tree-shaking | Rollup |
| Versioning | Changesets | Clean semver and changelogs | Manual |
| Docs / playground | Storybook 8 first; docs site later | Stories double as tests | Next.js or Astro docs |
| Unit/component tests | Vitest + Testing Library + jest-axe / axe-core | Fast, accessible-first | Jest |
| E2E / visual | Playwright (+ screenshot tests); Chromatic later | Real browser, theme and viewport matrix | Percy |
| Lint | ESLint + `eslint-plugin-jsx-a11y` + Prettier | Catches a11y errors at authoring time | Biome |
| Distribution | (a) npm package (b) shadcn-compatible registry JSON for `npx shadcn add` | Covers both usage styles | Only one |

---

## 4. Architecture

```
easyui/
├─ packages/
│  ├─ tokens/          # DTCG JSON sources (primitive → semantic → component)
│  │                   # build → CSS variables, TS types, theme presets
│  ├─ react/           # @easyui/react — components (styled primitives)
│  │  ├─ src/components/   button/, input/, dialog/, ...
│  │  ├─ src/lib/          cn(), cva helpers, motion presets
│  │  └─ src/styles/       base layer, reset, theme entry
│  ├─ registry/        # shadcn-compatible registry.json + generated items
│  └─ cli/             # (later) theme generator / init helper
├─ apps/
│  ├─ docs/            # Storybook (phase 1) → docs site (phase 5)
│  └─ playground/      # theme editor and live preview (phase 5)
├─ docs/PLAN.md        # this file
└─ .github/workflows/  # CI: lint, typecheck, test, a11y, visual, size budget
```

### Layering rules (enforced by lint)

1. **Tokens** define values. Nothing else hard-codes colors, radii, or durations.
2. **Components** consume **semantic** tokens only (for example `--color-action`, not `--blue-600`).
3. **Consumers** customize through a theme file (or CSS variables). They never edit component internals to rebrand.
4. Components are **copy-pasteable** and also importable from the npm package.

### Theming API (draft)

```ts
// easyui.theme.ts
export const theme = {
  font: { sans: "Geist", display: "Your Display Face", mono: "Geist Mono" },
  color: { accent: "oklch(0.62 0.19 255)", neutral: "zinc", radius: "0.5rem" },
  border: { width: "1px", style: "ring" },        // ring = box-shadow border
  density: "comfortable",                          // compact | comfortable | roomy
  motion: { preset: "subtle" },                    // none | subtle | expressive
  dark: { mode: "system" },
};
```

This compiles to CSS variables on `:root` and `[data-theme="dark"]`, so runtime switching does not need a rebuild.

---

## 5. Component quality bar ("definition of done")

Every component ships only when it has:

- [ ] All states: default, hover, `focus-visible`, active, disabled, loading, error (where relevant)
- [ ] Keyboard behavior and screen-reader labels verified (axe clean + manual check)
- [ ] Reduced-motion fallback (opacity only, or none)
- [ ] Responsive at 320 px, 768 px, and 1280 px; touch targets ≥ 24×24 px (aim for 40+ on touch)
- [ ] Light and dark themes, with contrast ≥ 4.5:1 for text
- [ ] Theme-variable overrides verified (colors, radius, font, border)
- [ ] Storybook stories for every state and variant
- [ ] Unit tests and axe test
- [ ] Bundle size within budget (set per component in CI)
- [ ] Usage docs with real example copy, not placeholder text

---

## 6. Phased plan

### Phase 0 — Decisions (1–2 days)
- Confirm the open questions in §8 (framework, primitives, distribution, names, scope).
- Verify Base UI vs Radix on the official sites and pick one. Run a 1-hour spike with a Dialog and Select to compare the API.
- Write a one-page **visual direction** brief: type pairing, accent, radius, border, shadow, density, motion feel. Use 3–5 reference sites that you like, and list what makes each work.

### Phase 1 — Foundations (about 1 week)
- Monorepo scaffold (pnpm workspaces, TypeScript strict, ESLint, Prettier, Vitest, Storybook).
- Token pipeline: DTCG JSON → CSS variables + TS types. Primitive, semantic, and component layers.
- Color scales in OKLCH. Generate neutrals and one accent scale. Check every semantic pair against WCAG AA in CI.
- Typography scale (fluid with `clamp()`), weights (400/500/600), heading tracking, and mono for code.
- Radius, spacing (one scale), border (ring), elevation (two or three shadows), and motion tokens (durations 120–300 ms, one or two easings).
- Light and dark themes. Base layer (reset, focus ring, selection, scrollbars).

### Phase 2 — Core components (2–3 weeks)
Build in this order, because later components depend on earlier ones:

1. Button, Link, Badge, Separator, Skeleton
2. Input, Textarea, Label, Field (label + description + error), Checkbox, Radio, Switch
3. Select, Combobox, Tooltip, Popover, DropdownMenu
4. Dialog, Sheet (side drawer), AlertDialog
5. Tabs, Accordion, Card, Avatar, Toast (Sonner-style)

Each component follows the quality bar in §5.

### Phase 3 — Responsive patterns & blocks (2 weeks)
- App shell: responsive sidebar that becomes a sheet on mobile, sticky header, container-query-aware content.
- Forms: login, signup, settings, multi-step.
- Data: table with sort, filter, pagination, and a mobile card layout.
- Feedback: empty states, loading skeletons, error pages.
- Marketing: hero, feature section, pricing, footer. Use real copy and intentional layout variety to avoid the template look.

### Phase 4 — Quality gates (ongoing, set up in Phase 1)
- CI: lint, typecheck, unit, axe (component and page), Playwright visual snapshots across light/dark and three viewports.
- Bundle-size budget per component (for example, Button under 1 KB gzipped without motion).
- Performance check: no layout-triggering animations (lint rule or review checklist).
- Manual: keyboard-only pass and VoiceOver/NVDA pass per release.

### Phase 5 — Distribution & docs (2 weeks)
- npm package `@easyui/react` with ESM, types, and tree-shaking.
- shadcn-compatible registry: a `registry.json` plus generated item files, so `npx shadcn add <name>` works.
- Docs site: install, theming guide, component pages with live examples, accessibility notes.
- Theme playground: change tokens and see every component update live. Export the theme file.

### Phase 6 — "Human-made" polish & release (1–2 weeks)
- Design review pass on every page of the docs and blocks. Remove generic patterns. Vary layout where it serves content.
- Copy review: real, specific microcopy, not lorem ipsum.
- Feedback from 5+ developers and designers. Track what they call "generic" and fix it.
- Tag v0.1.0, publish, and write a changelog.

---

## 7. Differentiators vs shadcn/ui

| Area | shadcn/ui | easyui goal |
|---|---|---|
| Rebranding | Edit CSS variables by hand | One theme file → tokens → all components; theme presets and playground |
| Typography | Mostly Inter/system defaults | Opinionated type pairing with fluid scale and tuned tracking |
| Motion | Minimal | Named motion presets with a reduced-motion parallel design |
| Density | Fixed | `compact` / `comfortable` / `roomy` modes via tokens |
| Responsive | Per-component | Shell, sidebar-to-sheet, and container-query patterns as first-class blocks |
| Visual character | Neutral, very consistent | Deliberate, human-reviewed variety in blocks and marketing sections |

---

## 8. Decisions log

Confirmed by the project owner:

| # | Question | Decision |
|---|---|---|
| 1 | Platform for v1 | **React only** |
| 2 | Headless primitive layer | **Spike both** Base UI and Radix (about 1 hour each on Dialog and Select), then pick one |
| 3 | Distribution | **Both:** npm package and shadcn-style registry |
| 4 | Visual direction | **Calm and minimal, Geist-like** (neutral palette, restrained color, developer-tool feel) |

## 8a. Open questions (still to confirm)

1. **Name:** Is `easyui` / `@easyui/react` final?
2. **Accent color:** Any brand color preference, or should the default accent be a neutral ink color (Geist-style)?
3. **Typeface:** Geist Sans + Geist Mono (open source, recommended for the calm direction), or another face?

---

## 8b. Phase 1 progress (current)

Decisions applied: React only; Geist-like calm theme; npm + registry distribution; user-selectable accent.

Built so far:
- pnpm monorepo: `packages/tokens`, `packages/react`, `apps/playground`
- Token pipeline: JSON (DTCG-style `$value`/`$type`) -> CSS custom properties, with light, dark, and system-dark modes and `{alias}` references
- `@easyui/react`: `Button` (primary, secondary, ghost, danger; sm/md/lg; loading; fullWidth), `EasyUIProvider` (accent, radius, font, theme), and color helpers (`getAccentPalette` picks a WCAG-readable foreground for any brand color)
- Tests: 22 passing (color math, provider, Button, axe checks per variant)
- CI workflow: typecheck, lint, test, build
- Playground with live accent, radius, font, and dark-mode controls

Deliberate deviations from §3:
- **Styling is plain CSS with `--eui-*` variables, not Tailwind.** Library consumers don't need Tailwind, and the shipped CSS can't be broken by a consumer's Tailwind config. Revisit if the registry flow needs it.
- **Tokens are consolidated under `packages/tokens`**, with the CSS build feeding `@easyui/react/styles.css`.
- **Storybook is deferred.** Playground plus tests cover the components for now.

### Phase 2 progress (complete)

All components in the Phase 2 list are built, each with unit and axe tests, a CSS file, and a playground demo.

- Foundations: Button, Link, Badge, Separator, Skeleton.
- Forms: Input, Textarea, Field (label, description, error wiring), Checkbox, Radio (RadioGroup), Switch, Combobox.
- Overlays: Tooltip, Popover, DropdownMenu, Dialog, AlertDialog, Sheet (left, right, and bottom), Select.
- Content: Tabs, Accordion, Card, Avatar, Toast (`toast()` helper and `ToastProvider`).

Decisions and deviations made in this phase:
- **Base UI over Radix** (see [SPIKE.md](./SPIKE.md)).
- **Accent contrast covers the hover shade.** The provider sets `--eui-color-accent-hover` from the same palette. Before this fix, hover dropped below WCAG AA for several presets. Now every preset passes 4.5:1 at rest and on hover, in light and dark mode.
- **Tooltip** adds `role="tooltip"` and `aria-describedby` on the trigger, because Base UI 1.8 omits them.
- **Toast** uses `role="status"`, because Base UI defaults to `role="dialog"`. The close button also overrides Base UI's `aria-hidden` while the stack is collapsed, so the only dismiss control stays announced.
- **Touch targets.** Checkbox, Radio, and Switch keep their visual size and widen the hit area to 28px or more.

Tests: 98 unit and accessibility tests across 25 files. Typecheck and lint are clean.

### Phase 3 progress (partial)

Built as playground blocks (`apps/playground/src/blocks.tsx`, open with `#blocks`):
- **App shell.** A sticky header with a sidebar from 900px up. Below 900px, the sidebar becomes a left sheet opened from the header, and it closes after a choice.
- **Projects table.** Search, sortable columns with `aria-sort`, pagination, and a loading state with `aria-busy`. Below 640px, the table turns into labelled cards, and the header row is kept for screen readers.
- **Forms.** Login with validation on submit, a Keep me signed in checkbox, and a full-width submit button.
- **Feedback.** Empty state, error page with retry, and skeleton loading.

Not yet built: the multi-step form, the settings form, and the marketing sections (hero, feature grid, pricing, footer).

### Phase 4 progress (partial)

- Responsive audit run in headless Chromium at 320, 768, and 1280 px on both pages. Results: no horizontal overflow at any width. No interactive targets under 24px, except one inline text link, which WCAG 2.5.8 exempts. No console errors after the dev server's dependency cache warmed up.
- Not yet in CI: the audit script, Playwright visual snapshots, and per-component bundle budgets. The audit script is a one-off in the sandbox and is not committed.

### Phase 5 progress (distribution and docs, mostly done)

- **npm package.** `@easyui/react` 0.1.0 is prepared: `files` lists dist, README, and CHANGELOG; repository, keywords, and `publishConfig` are set. It is **not published**. See the open items below.
- **Registry.** `packages/react/scripts/build-registry.mjs` writes `packages/react/registry/r/<name>.json` (36 components plus `easyui-tokens`) and an index, `registry.json`. Each item inlines every local file it imports, and the CSS import is added to the component file. A scratch project compiles all 37 component files under `strict` TypeScript. **Not tested with the shadcn CLI end to end**, because the registry is not hosted yet.
- **Docs site.** `apps/docs` is a Vite app with hash routes: Home, Get started, Components (38 pages, each with a live example, code, and notes), Theming (a sandbox that changes only its preview), Registry, and Changelog. Built and checked in the browser.
- **Gap analysis.** `docs/GAP-ANALYSIS.md`. easyui covers 37 of the 64 entries on shadcn's list. 27 are missing, in P0, P1, and P2 tiers.

Decisions made in this phase:
- Registry items inline their dependencies, instead of depending on a shared `lib` item. Each file keeps its folder layout, so the relative imports still work.
- The docs chrome never uses the theme sandbox provider. Only the preview is wrapped, so changing the controls leaves the page unchanged.
- Component CSS is loaded by the registry item's import, not by the package. The package still ships one `styles.css`.

### Phase 6 progress (release prep, partial)

- Changelog: `packages/react/CHANGELOG.md`, starting at 0.1.0 (unreleased), with the known gaps listed.
- Human review: **not done.** Phase 6 needs a design review pass and feedback from 5 or more developers and designers. This session cannot do that.
- Publishing and tagging: **not done.** No npm publish, and no `v0.1.0` tag, until the owner confirms.
- Open items before the tag:
  1. Add a LICENSE file. `package.json` says MIT, but the repo has no license text.
  2. Make the contrast audit for accent presets a committed test. Right now it is a one-off.
  3. Host the registry (for example, copy `packages/react/registry/r` to a static host), then run `npx shadcn@latest add <url>` against it.
  4. Run the Phase 4 responsive audit on the docs site.

## 9. Immediate next steps (once the questions are answered)

1. Scaffold the monorepo and CI skeleton (Phase 1, first half).
2. Write the DTCG token files for the default theme and generate CSS variables.
3. Build Button end-to-end (tokens → component → stories → tests → docs). Use it as the reference that all other components follow.
4. Review Button together and lock the visual direction before building the rest.

---

## Sources

- shadcn/ui components.json: https://ui.shadcn.com/docs/components-json
- shadcn/ui registry-item.json: https://ui.shadcn.com/docs/registry/registry-item-json
- shadcn/ui guide (designrevision): https://designrevision.com/blog/shadcn-ui-guide
- Base UI v1 announcement: https://x.com/base_ui/status/1999154611123257522
- Base UI vs Radix (shadcndeck): https://www.shadcndeck.com/blog/radix-vs-base-ui
- Radix guide (codingdunia): https://codingdunia.com/ui-components/radix-ui/
- DTCG format (CODERCOPS): https://blog.codercops.com/blog/design-tokens-2026-w3c-format-guide
- Design system best practices (UXPilot): https://uxpilot.ai/blogs/design-system-best-practices
- Tailwind v4 @theme (MironSoft): https://www.mironsoft.de/en/blog/tailwind-css-v4-new-features-explained
- Accessibility for design engineers (inhaq): https://inhaq.com/blog/accessibility-for-design-engineers-building-inclusive-uis.html
- Accessible design systems (Montana B): https://montanab.com/2025/03/accessible-design-systems-building-components-for-everyone/
- React accessibility testing (a11yflow): https://www.a11yflow.dev/blog/react-accessibility-testing-guide
- Storybook 8.5: https://storybook.js.org/blog/storybook-8-5/
- Animation performance (GreadMe): https://www.greadme.com/blog/performance/optimize-animated-content-for-speed-complete-guide
- Motion budget (72Technologies): https://www.72technologies.com/blog/motion-budget-ui-animation-ratios
- Motion bundle size (LogRocket): https://blog.logrocket.com/creating-react-animations-with-motion/
- Motion LazyMotion (agent-skills): https://agent-skills.md/skills/kvngrf/flowsterix/motion
- Vercel Geist (designsystems.one): https://www.designsystems.one/design-systems/vercel-geist
- Geist typeface (Basement): https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web
- Vercel-inspired tokens (Open Design): https://open-design.ai/plugins/design-system-vercel/
- Human-made UI discussion (recodehive): https://github.com/orgs/recodehive/discussions/971
- AI-generated UI mistakes (gendesigns): https://gendesigns.ai/blog/ai-generated-ui-mistakes-how-to-fix
- AI purple-gradient trap (prg.sh): https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- Designing for designer-made slides (getalai): https://getalai.com/blog/make-ai-slides-look-designer-made
- shadcn registry template: https://github.com/shadcn-ui/registry-template

> Note: several sources are secondary blog posts. Version numbers, maintainer details, and the Base UI default status should be checked against official docs before the stack is locked.
