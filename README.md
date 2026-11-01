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

## SEO and deployment

The playground build generates static HTML with page-specific titles, descriptions,
Open Graph metadata, and meaningful content for the collection, each component, the
setup guide, playground, and blocks. Search engines can follow normal links to these
pages without executing JavaScript; the interactive site loads on top. Existing
`#component/...`, `#getting-started`, `#playground`, and `#blocks` bookmarks redirect
in the browser to their new paths.

For production, build with the public site origin (no path or trailing route):

```bash
SITE_URL=https://your-domain.example pnpm build
```

Publish `apps/playground/dist` at the **root of that origin**. `SITE_URL` supplies
canonical URLs, Open Graph URLs, structured data, and `sitemap.xml`; point search
engines to `/sitemap.xml` or use the reference in `/robots.txt`. Do not use the
example domain above in a real deployment. Builds without `SITE_URL` work locally
but intentionally omit canonical/absolute social URLs, structured data, and the
sitemap. Rebuild with the correct origin whenever the public domain changes.

Configure the host to serve the generated directory indexes (for example,
`/components/button/` from `components/button/index.html`) and assets directly.
Redirect directory URLs without trailing slashes to the trailing-slash version.
Serve `404.html` with HTTP status 404 for unknown paths; do **not** rewrite all
unknown requests to `index.html`, which produces soft 404s. Configure the host's
HTTPS and preferred-domain redirects consistently with `SITE_URL`. Vite's dev and
preview servers use SPA fallbacks and are not a substitute for testing the production
host's status codes or redirect rules. Actual indexing and ranking depend on search
engines and the deployed site's configuration.
