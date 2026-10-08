# Gap analysis: easyui vs. the component libraries it is compared with

Status: first pass, written in Phase 6 prep. Counts were checked against the sources listed at the end, on 2026-10-09.
Method: take each library's published component list, match names against `packages/react/src/components/`, and group what is missing by how often real apps need it. This is a catalog comparison, not a usage study, so the priorities are judgment calls and are marked as such.

## 1. Where things stand

| Library | What it publishes | Source |
|---|---|---|
| shadcn/ui | 64 entries on its "All Components" page | [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components) |
| Mantine v8 | "More than 120 customizable components" and 70+ hooks | [v8.mantine.dev](https://v8.mantine.dev/) |
| HeroUI v3 | 75+ web components, plus 47 Pro components (Command, Sidebar, DataGrid, Charts, and others) | [HeroUI v3 release notes](https://heroui.pro/docs/react/releases/v3-0-0), [InfoQ, July 2026](https://www.infoq.com/news/2026/07/heroui-v3-rewrite/) |
| Untitled UI React | Free base components (Badges, Buttons, Inputs, Sliders, Toggles, Tooltips, and others), plus application sections such as Modals (46 variants), Paginations (14), and Tables (12) | [untitledui.com/react](https://www.untitledui.com/react), [application UI](https://www.untitledui.com/react/application-ui) |
| Base UI v1 | 35 components (the primitive layer easyui builds on) | [Base UI v1 announcement](https://x.com/base_ui/status/1999154611123257522) |
| **easyui (this repo)** | **38 documented components** (37 shadcn-list entries, plus Link) | `packages/react/src/index.ts` |

Against the shadcn list, easyui covers **37 of 64** entries. That list is the closest like-for-like comparison, because it is the set most React teams already know, and easyui's registry is shadcn-format.

## 2. Missing from the shadcn list (27 entries)

Sorted by priority. Priority reflects how often a typical product UI needs the component, not how hard it is.

### P0: needed by most data-heavy or app-shell products

| Component | Why it matters | Size (rough) |
|---|---|---|
| Data Table | Sorting, filtering, and selection on top of Table. Without it, every app rebuilds this. | L |
| Date Picker | Dates appear in almost every form. Needs a locale-aware calendar. | L |
| Calendar | Shared by Date Picker and scheduling views. Build it first. | M |
| Command | ⌘K palette. Keyboard-first apps expect it. | M |
| Sidebar | Collapsible app navigation with mobile sheet fallback. easyui already has the sheet pattern in Phase 3 blocks. | M |
| Navigation Menu | Site-level menus with hover and keyboard support. Needed for marketing sites. | M |
| Input OTP | Verification codes. Needs paste support and per-slot focus. | S |
| Scroll Area | Styled scrollbars with consistent behavior across platforms. | S |

### P1: common, smaller scope

| Component | Why it matters | Size (rough) |
|---|---|---|
| Native Select | Plain `<select>` for mobile and long forms, styled to match. | S |
| Input Group | Input with prefix and suffix (currency, units, icons). | S |
| Button Group | Joined buttons. Toggle Group covers the pressed case, not the action case. | S |
| Context Menu | Right-click menu. Shares the menu CSS from Dropdown Menu. | S |
| Hover Card | Preview on hover for a user or link. | S |
| Drawer | Bottom sheet for mobile. Sheet covers this today, so this is a convenience, not a gap in capability. | S |
| Resizable | Split panes. Needed for IDE-like tools. | M |
| Form | React Hook Form integration with Field. Field already wires ARIA, so this is mostly glue. | S |
| Direction | RTL provider. Needed before any Arabic or Hebrew launch. Check CSS logical properties first. | M |
| Typography | Heading, text, and list primitives with the type scale. | S |

### P2: specialized

| Component | Why it matters | Size (rough) |
|---|---|---|
| Chart | Wraps a charting library. Pick the underlying library first. | L |
| Carousel | Image and card rows. Needs keyboard and reduced-motion handling. | M |
| Menubar | Desktop-style top menu. Lower demand on the web. | M |
| Item | List row with media, title, and actions. Mostly a layout pattern. | S |
| Marker | Highlighted text. | S |
| Message, Message Scroller, Bubble | Chat UI. Only if easyui targets AI or messaging products. | M |
| Attachment | File chip with preview and remove. | S |
| Questionnaire | Multi-step survey. Better as a block than a component. | M |

## 3. Missing from shadcn but found in the other libraries

These show up in Mantine, HeroUI, or Untitled UI. They are not on shadcn's list, so they are not counted above.

| Component | Seen in | Note |
|---|---|---|
| Number Field | Mantine, HeroUI | Stepper input. Common for quantities and prices. |
| Rating | Untitled UI | Stars with half values. |
| Stepper / Progress Steps | Untitled UI (18 variants) | Multi-step flows. Pairs with the multi-step form block, which is not built yet. |
| File Uploader / Dropzone | Mantine, Untitled UI (5 variants) | Needs drag-and-drop with a keyboard fallback. |
| Color Picker | HeroUI, Untitled UI (13 variants) | Large scope. Lower priority. |
| Tree View | Untitled UI (4 variants), HeroUI Pro (File Tree) | Needed for file browsers. |
| Date Range Picker | Mantine, HeroUI | Builds on Date Picker. |
| Carousel, Video Player | Untitled UI | Video player is a wrapper, not a primitive. |
| Avatar Group, Badge Group | Untitled UI | Small layout helpers. |
| Metrics, Activity Feed | Untitled UI | Dashboard patterns, closer to blocks than components. |

## 4. What easyui has that the lists do not show

- **Motion budget.** Animation uses transform and opacity only, and reduced motion turns every animation off. No other library in this list documents a motion budget.
- **Accent contrast.** The provider derives the text and hover shades from one accent color, and the audit found every preset passes 4.5:1 at rest and on hover. This is a one-off audit; it is not yet a committed test (see section 6).
- **Plain CSS variables.** No Tailwind required, so the stylesheet cannot be broken by a consumer's Tailwind config.

## 5. Recommended next components (order)

1. Calendar, then Date Picker (the Date Picker depends on Calendar, and most forms need dates).
2. Command, because it reuses Combobox and Dialog.
3. Data Table. It depends on Table and needs a sorting and selection model.
4. Sidebar, using the Phase 3 shell as the reference.
5. Input OTP, Scroll Area, Native Select, Input Group, Button Group (all small).
6. Navigation Menu, Context Menu, Hover Card, Menubar.
7. Form (React Hook Form glue) and Direction (RTL).
8. Resizable, Carousel, Chart, Drawer, and the P2 list.

## 6. Open gaps in easyui itself (not components)

These are not in any component list, but they affect whether the library is production-ready.

- **Contrast audit is not in CI.** The hover contrast check for accent presets was run once in the sandbox. It should become a test before v0.1.0 is tagged.
- **No Storybook.** The docs site and playground cover examples. Visual regression testing is still missing.
- **Bundle budgets.** No per-component size budget is enforced yet.
- **Design review and external feedback** (Phase 6). Not done yet. It needs 5 or more developers and designers, and no one has been asked.
- **Publishing.** Not published to npm. See the release notes in `packages/react/CHANGELOG.md`.

## Sources

- shadcn/ui components: https://ui.shadcn.com/docs/components
- Mantine v8: https://v8.mantine.dev/
- HeroUI v3 release notes: https://heroui.pro/docs/react/releases/v3-0-0
- InfoQ, HeroUI v3 rewrite (July 2026): https://www.infoq.com/news/2026/07/heroui-v3-rewrite/
- Untitled UI React: https://www.untitledui.com/react
- Untitled UI React application UI: https://www.untitledui.com/react/application-ui
- Base UI v1 announcement: https://x.com/base_ui/status/1999154611123257522
