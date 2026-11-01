# easyui

A production-grade, accessible React UI library with a Geist-inspired design system.
Customize the accent color, radius, and font at runtime; components update automatically.

## Repository layout

```
packages/tokens   Source design tokens (JSON) -> CSS custom properties
packages/react    @easyui/react: components, provider, color helpers, styles
apps/playground   Component gallery, interactive patterns, blocks, and theming playground
docs/PLAN.md      Research findings, stack decisions, and phased roadmap
```

## Explore the collection

Run `pnpm dev` to browse live primitives and composed patterns. The preview dialog shows the exact TSX source used by each example; pattern interactions are local demos and do not send data or make purchases. The playground lets you experiment with the theme, and Blocks contains a workspace example.

## Commands

```bash
pnpm install
pnpm dev         # build the library, then start the playground
pnpm build       # build tokens, library (ESM/CJS/types/CSS), and playground
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

Fonts are not bundled. Load your own (the playground uses `@fontsource-variable/geist`)
and pass `fontFamily` to `EasyUIProvider` if you want to override the default.
