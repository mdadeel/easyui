# easyui

A production-grade, accessible React UI library with a Geist-inspired design system.
Customize the accent color, radius, and font at runtime; components update automatically.

## Repository layout

```
packages/tokens   Source design tokens (JSON) -> CSS custom properties
packages/react    @easyui/react: components, provider, color helpers, styles
apps/playground   Live theming playground (run with `pnpm dev`)
apps/docs        Docs site: get started, theming, registry, and a page per component
docs/PLAN.md     Research findings, stack decisions, and phased roadmap
docs/GAP-ANALYSIS.md  Missing components compared with shadcn/ui, Mantine, HeroUI, and Untitled UI
```

## Commands

```bash
pnpm install
pnpm dev         # build the library, then start the playground (port 5173)
pnpm --filter @easyui/docs dev   # docs site (port 5174)
pnpm build       # tokens, library (ESM/CJS/types/CSS/registry), playground, and docs
pnpm test        # unit and accessibility tests
pnpm lint
pnpm typecheck
```

## Usage

```tsx
import "@easyui/react/styles.css";
import { EasyUIProvider, Button } from "@easyui/react";

export function App() {
  return (
    <EasyUIProvider accent="#2563eb" radius="md">
      <Button>Get started</Button>
      <Button variant="secondary">Read docs</Button>
    </EasyUIProvider>
  );
}
```

Components can also be copied into a project from the shadcn-format registry in
`packages/react/registry/`. The docs site's Registry page lists them.

Fonts are not bundled. Load your own (the playground uses `@fontsource-variable/geist`)
and pass `fontFamily` to `EasyUIProvider` if you want to override the default.
