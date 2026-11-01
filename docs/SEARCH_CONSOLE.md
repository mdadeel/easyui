# Google Search Console setup

## 1. Deploy the site with the correct production origin

The production site is **https://easyui.mdadeel125.workers.dev/**. In Cloudflare
Workers Builds, set the production **build environment variable**:

```text
SITE_URL=https://easyui.mdadeel125.workers.dev
```

Keep the build command `pnpm run build` and deploy command `npx wrangler deploy`.
Deploy the changes from this branch after they are merged into the branch Cloudflare
builds. This value is needed at **build time**, not just as a Worker runtime variable.
Without it, the build deliberately omits canonical URLs, absolute social image URLs,
and `sitemap.xml`. Use the preview origin, or omit `SITE_URL`, for preview deployments
so they do not claim to be the production site.

After deploying, check these URLs in a browser:

- https://easyui.mdadeel125.workers.dev/robots.txt — should reference the sitemap.
- https://easyui.mdadeel125.workers.dev/sitemap.xml — should return XML with HTTPS URLs on this host.
- https://easyui.mdadeel125.workers.dev/components/button/ — view source and check its canonical URL.

## 2. Verify ownership

In Search Console, add a **URL-prefix** property with this exact value:

```text
https://easyui.mdadeel125.workers.dev/
```

The repository includes this HTML tag in the homepage `<head>`:

```html
<meta name="google-site-verification" content="Yc5EANhdp0wcUR4ek6zZZTvXrQjpRQovQx6hYk4fWn4" />
```

After deployment, select **HTML tag** verification and click **Verify** *if the
HTML tag shown by Search Console contains that exact value*. The value supplied to us
was in DNS TXT form (`google-site-verification=...`), and Search Console can issue a
different token for a different verification method or property. If its HTML tag
contains a different value, replace the tag in `apps/playground/index.html` with the
exact one Search Console provides, redeploy, and verify. Keep the correct tag in place
after verification. Verification has not been performed by this repository.

For a **Domain property**, Google requires DNS verification. The supplied TXT value is:

```text
google-site-verification=Yc5EANhdp0wcUR4ek6zZZTvXrQjpRQovQx6hYk4fWn4
```

It must be added to DNS for the exact property in Search Console. This is a Cloudflare
`workers.dev` hostname; you may not control DNS records for it. Do not add a TXT record
to an unrelated zone. Use URL-prefix verification instead, or use a custom domain you
control and follow Search Console's DNS instructions.

### HTML file verification (provided file)

For the URL-prefix property above, choose **HTML file**. The file you supplied is
included in `apps/playground/public/google7ecf99f475b9e5b2.html`. After merging and
deploying, check this exact URL before clicking Verify:

```text
https://easyui.mdadeel125.workers.dev/google7ecf99f475b9e5b2.html
```

It must return HTTP 200 without redirecting, with the exact content
`google-site-verification: google7ecf99f475b9e5b2.html`. The Worker routes only this
URL through `apps/playground/worker.mjs` so Cloudflare's HTML pretty-URL behavior
does not redirect it. Leave the verification file and route in place after verification.
If Google supplies a different file, add that exact file and update both the Worker
route and Wrangler's `assets.run_worker_first` pattern; merely placing an `.html`
file in `public/` causes Cloudflare to redirect its URL under the current configuration.
A DNS token alone does not determine an HTML verification filename or content.

## 3. Submit the sitemap

After verification and deployment, open **Sitemaps** in Search Console and submit:

```text
https://easyui.mdadeel125.workers.dev/sitemap.xml
```

You submit the URL; you do **not** upload the sitemap to Search Console. The site build
generates and serves `sitemap.xml` and `robots.txt` automatically when `SITE_URL` is
set. Inspect the homepage and a few component URLs using **URL inspection**, and monitor
Page indexing and Performance. Google decides whether and when to crawl or index pages;
verification and sitemap submission do not guarantee rankings or indexing.

References: [ownership verification](https://support.google.com/webmasters/answer/9008080),
[Search Console overview](https://developers.google.com/search/docs/monitor-debug/search-console-start),
[submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
