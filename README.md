# easyui

A themeable React UI component library with interactive examples and interface patterns.
Explore the collection, inspect the example source, and customize the accent color,
radius, font, and theme at runtime.

**[Explore the live site](https://easyui.mdadeel125.workers.dev/)** ·
[Component example: Button](https://easyui.mdadeel125.workers.dev/components/button/) ·
[Getting started](https://easyui.mdadeel125.workers.dev/getting-started/) ·
[Theme playground](https://easyui.mdadeel125.workers.dev/playground/)

## Repository layout

```
packages/tokens   Source design tokens (JSON) -> CSS custom properties
packages/react    @easyui/react: components, provider, color helpers, styles
apps/playground   Component gallery, interactive patterns, blocks, and theming playground
docs/PLAN.md      Research findings, stack decisions, and phased roadmap
```

## Explore the collection

Run `pnpm dev` to browse live primitives and composed patterns. The preview dialog shows the exact TSX source used by each example; pattern interactions are local demos and do not send data or make purchases. The playground lets you experiment with the theme; your choices are saved on this device and applied to collection and component previews. Reset them in the playground. Blocks contains a workspace dashboard example. Component pages link to related examples; selected components include verified API and accessibility notes, while other pages link to their implementation for the complete reference.

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
SITE_URL=https://easyui.mdadeel125.workers.dev pnpm build
```

Publish `apps/playground/dist` at the **root of that origin**. `SITE_URL` supplies
canonical URLs, Open Graph URLs, structured data, and `sitemap.xml`; point search
engines to `/sitemap.xml` or use the reference in `/robots.txt`. The current production
origin is `https://easyui.mdadeel125.workers.dev`. Builds without `SITE_URL` work locally
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

### Cloudflare Workers Builds

For a Cloudflare **Worker with static assets**, keep the project root at the
repository root and configure the build command as `pnpm run build` and the
deploy command as `npx wrangler deploy`. For branch preview builds, use the
preview deploy command `npx wrangler preview`; `wrangler.json` includes the required
`previews` block. The root `wrangler.json` explicitly
points Wrangler at `apps/playground/dist`, avoiding automatic framework detection
at the monorepo root. A small Worker routes the Google verification file without a
redirect; other requests continue to use the static asset routing. Its `name` is
`easyui`: change it to match the existing Worker's exact name in the Cloudflare
dashboard before deploying if different.
Use Node 22 or newer for current Wrangler releases.

Set `SITE_URL` in the Cloudflare **build environment variables** to the final
production origin `https://easyui.mdadeel125.workers.dev`; do not include a path.
Use the appropriate preview origin or omit `SITE_URL` for preview builds so they
are not mistakenly canonicalized to the production domain. The assets settings
serve generated HTML routes and the generated `404.html` with a 404 status rather
than falling back to the home page. Verify the domain and routing settings in your
Cloudflare account after deployment. This configuration targets Workers Builds,
not the separate Cloudflare Pages build pipeline.


### Search Console and discovery

See [Search Console setup](docs/SEARCH_CONSOLE.md) for the exact URL-prefix
property, ownership verification, production build settings, and sitemap submission.
The repository also includes an [ethical discovery and backlink plan](docs/DISCOVERY.md).
Neither setup guarantees indexing, rankings, backlinks, or inclusion in AI answers.
