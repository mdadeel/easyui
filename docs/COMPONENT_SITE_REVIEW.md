# Component site review

## Benchmark

- [21st.dev's marketplace](https://www.shadcn.io/template/serafimcloud-21st) makes discovery visual: categories and search lead to interactive previews and source/install paths.
- [Radix Dialog documentation](https://www.radix-ui.com/primitives/docs/components/dialog) pairs a live example with component anatomy, API and accessibility/keyboard guidance.
- [shadcn/ui component galleries](https://shadcnuikit.com/components) group examples by use case and pair the preview with usable code and setup instructions.

## Before this change

EasyUI's original playground grouped many controls together, so individual components were hard to find or compare. The initial discovery redesign improved browsing but showed only nine examples. Several previews were custom mockups rather than the component being advertised, and the code was a different, incomplete example. Community/popularity labels implied data that the site did not have. There was no direct component URL, setup guide, persistent favorites, or site-level interaction testing.

## Changes made

- A searchable, categorized gallery of real EasyUI examples; preview and copyable code are generated from the same checked-in TSX file.
- Shareable component detail URLs, usage notes, source links, and workspace setup instructions.
- Honest example counts and labels, visible preview/code controls, mobile-accessible saved examples, persistent favorites, empty states, and clipboard failure feedback.
- Site tests covering search, favorites, deep links, example interaction, and copying. Existing library tests cover many keyboard and accessibility behaviors.

## Remaining work before claiming production parity

- Cover the remaining exports (such as toast and breadcrumb) with dedicated examples and complete per-component API/variant documentation.
- Verify the published distribution and document external installation once a release is available; the guide intentionally describes repository workspace setup only.
- Add browser-based end-to-end, responsive, keyboard, and screen-reader testing, plus automated contrast checks. The jsdom tests do not substitute for real-browser accessibility verification.
- Add release/version documentation, a changelog, SEO-friendly server-rendered routes, and a deployment/observability strategy. The current hash URLs are shareable but not individually server-rendered.
- Profile and split the client bundle as the catalog grows. Vite currently warns about a large JavaScript chunk.

## Component and visual audit

The gallery was overriding actual component sizes (and removing card padding), so its previews did not represent the library accurately. Fixed those overrides, made buttons and cards handle long text, constrained picker popups, improved coarse-pointer targets, and prevented mobile input zoom. Table overflow is keyboard-focusable. Choice controls now retain both caller-supplied and built-in descriptions.

The visual direction now uses forest ink, warm paper, soft botanical surfaces, and a copper accent. Both default themes have automated contrast checks for text, control boundaries, warning/danger, and button hover states. Custom accent foregrounds fall back to black when white and near-black do not meet AA. Checkbox/switch outlines and radio marks remain visible with light custom accents.

Further validation: test layouts, forced colors, and screen readers in real browsers. Custom accent text contrast is checked, but arbitrary custom accent colors may still have insufficient contrast on non-text indicators such as progress fills; this needs theme-aware treatment and browser verification rather than an unsupported blanket accessibility claim.
