import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(await readFile(path.join(appDir, "src/catalog.json"), "utf8"));
const faq = JSON.parse(await readFile(path.join(appDir, "src/faq.json"), "utf8"));
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

/** SITE_URL must be the origin where this root-hosted build is deployed. */
export function normalizeSiteUrl(value) {
  if (!value) return null;
  let url;
  try { url = new URL(value); } catch { throw new Error("SITE_URL must be an absolute http(s) origin, e.g. https://example.com"); }
  if (!(["http:", "https:"].includes(url.protocol)) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an http(s) origin without credentials, a path, query, or fragment");
  }
  return url.origin;
}

function nav() {
  return '<nav aria-label="Main navigation"><a href="/">Discover</a> <a href="/getting-started/">Get started</a> <a href="/playground/">Playground</a> <a href="/blocks/">Blocks</a></nav>';
}

const pages = [
  { url: "/", title: "EasyUI — React UI components and patterns", description: "Explore interactive React UI components and interface patterns. Preview examples, inspect their source, and customize your theme with EasyUI.", kind: "home" },
  { url: "/getting-started/", title: "Get started with EasyUI — React component setup", description: "Set up the EasyUI workspace, import the React component styles, and explore themeable UI components.", kind: "guide" },
  { url: "/playground/", title: "Theme playground — EasyUI React components", description: "Try EasyUI React components with custom accent colors, corner radii, fonts, and light or dark themes.", kind: "playground" },
  { url: "/blocks/", title: "Workspace dashboard block — EasyUI", description: "Explore a responsive workspace dashboard example built with EasyUI React components.", kind: "blocks" },
  ...catalog.map((item) => ({ url: `/components/${item.id}/`, title: `${item.title} — EasyUI React ${item.category === "Patterns" ? "pattern" : "component"}`, description: `${item.description} Explore the ${item.title} React ${item.category === "Patterns" ? "pattern" : "component"}, usage notes, and example source with EasyUI.`, kind: "component", item })),
];

function seoHead(page, origin) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const canonical = origin ? `${origin}${page.url}` : null;
  const lines = [
    `<title>${title}</title>`, `<meta name="description" content="${description}" />`,
    '<meta name="robots" content="index, follow" />', '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="EasyUI" />', '<meta property="og:locale" content="en_US" />', `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`, `<meta name="twitter:card" content="${origin ? "summary_large_image" : "summary"}" />`,
    `<meta name="twitter:title" content="${title}" />`, `<meta name="twitter:description" content="${description}" />`,
  ];
  if (canonical) {
    const image = `${origin}/social-card.png`;
    lines.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`, `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
      `<meta property="og:image" content="${escapeHtml(image)}" />`, '<meta property="og:image:width" content="1200" />', '<meta property="og:image:height" content="630" />',
      '<meta property="og:image:alt" content="EasyUI: React components and interface patterns" />', `<meta name="twitter:image" content="${escapeHtml(image)}" />`);
    const graph = [{ "@type": "WebPage", "@id": canonical, url: canonical, name: page.title, description: page.description, isPartOf: { "@id": `${origin}/#website` } }];
    if (page.kind === "home") {
      graph.push({ "@type": "WebSite", "@id": `${origin}/#website`, url: `${origin}/`, name: "EasyUI", description: page.description });
      graph.push({ "@type": "SoftwareSourceCode", name: "EasyUI", description: page.description, url: "https://github.com/mdadeel/easyui", codeRepository: "https://github.com/mdadeel/easyui", programmingLanguage: "TypeScript", runtimePlatform: "React" });
    }
    if (page.kind === "component") graph.push({ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Discover", item: `${origin}/` }, { "@type": "ListItem", position: 2, name: page.item.title, item: canonical }] });
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }
  return `<!--seo:start-->\n    ${lines.join("\n    ")}\n    <!--seo:end-->`;
}

async function fallbackContent(page) {
  const header = `<header><a href="/" class="seo-brand">easyui.</a>${nav()}</header>`;
  let content;
  if (page.kind === "home") {
    const list = catalog.map((item) => `<li><a href="/components/${escapeHtml(item.id)}/">${escapeHtml(item.title)}</a><span>${escapeHtml(item.description)}</span></li>`).join("\n");
    const answers = faq.map((entry) => `<article><h3>${escapeHtml(entry.question)}</h3><p>${escapeHtml(entry.answer)}</p></article>`).join("\n");
    content = `<h1>React components, ready to make yours.</h1><p>Explore accessible building blocks and ready-to-use patterns. Try every example, inspect its code, and customize your theme.</p><h2>Discover components</h2><ul class="seo-list">${list}</ul><section><h2>Questions, answered.</h2>${answers}<p><a href="/getting-started/">Read the setup guide</a></p></section>`;
  } else if (page.kind === "component") {
    const item = page.item;
    const source = await readFile(path.join(appDir, "src/examples", `${item.id}.tsx`), "utf8");
    content = `<p><a href="/">Discover</a> / ${escapeHtml(item.category)}</p><h1>${escapeHtml(item.title)}</h1><p>${escapeHtml(item.description)}</p><h2>Usage notes</h2><p>${escapeHtml(item.guidance)}</p><p>Examples use <code>@easyui/react</code> and its stylesheet. <a href="/getting-started/">Read the setup guide</a>.</p><h2>Example source</h2><pre><code>${escapeHtml(source)}</code></pre><p><a href="/">Explore more components</a></p>`;
  } else if (page.kind === "guide") {
    content = '<h1>Get started with easyui.</h1><p>Everything you need to explore the library and use its components in this workspace.</p><h2>Run the workspace</h2><p>EasyUI is a pnpm monorepo. Clone the repository, install dependencies, and start the playground. Node 20.19 or newer is required.</p><pre><code>git clone https://github.com/mdadeel/easyui.git\ncd easyui\npnpm install\npnpm dev</code></pre><h2>Add components</h2><p>Import <code>@easyui/react/styles.css</code> and wrap your UI in <code>EasyUIProvider</code>. The repository documents workspace usage; check the package distribution before installing it externally.</p><p><a href="/">Explore components</a> · <a href="/playground/">Open playground</a></p>';
  } else if (page.kind === "playground") {
    content = '<h1>Theme playground</h1><p>Experiment with accent colors, corner radii, fonts, and light or dark themes on interactive EasyUI components.</p><p>JavaScript is required to use the live theme controls. <a href="/">Explore the component collection</a> or <a href="/getting-started/">get started</a>.</p>';
  } else {
    content = '<h1>Workspace dashboard block</h1><p>Explore a responsive dashboard example with projects, members, billing, and settings, built with EasyUI React components.</p><p>JavaScript is required to interact with this block. <a href="/">Explore the component collection</a>.</p>';
  }
  return `<div class="seo-fallback">${header}<main>${content}</main><footer>Built with EasyUI · <a href="https://github.com/mdadeel/easyui">View repository</a></footer></div>`;
}

const fallbackStyle = `<style>.seo-fallback{font:16px/1.65 system-ui,sans-serif;color:#19261f;max-width:1100px;margin:auto;padding:24px}.seo-fallback header{display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;border-bottom:1px solid #dfe6dd;padding-bottom:18px}.seo-fallback nav{display:flex;gap:16px;flex-wrap:wrap}.seo-fallback a{color:#315f49}.seo-brand{font-size:24px;font-weight:700;text-decoration:none}.seo-fallback main{padding:36px 0}.seo-fallback h1{font-size:clamp(30px,5vw,48px);line-height:1.1}.seo-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;list-style:none;padding:0}.seo-list li{border:1px solid #dfe6dd;border-radius:10px;padding:16px}.seo-list a,.seo-list span{display:block}.seo-list span{font-size:14px;color:#50625a}.seo-fallback pre{overflow:auto;background:#f1f5ef;padding:18px;border-radius:8px}.seo-fallback footer{border-top:1px solid #dfe6dd;padding-top:20px}</style>`;

export async function generateSeo({ distDir = path.join(appDir, "dist"), siteUrl = process.env.SITE_URL } = {}) {
  const origin = normalizeSiteUrl(siteUrl);
  const template = await readFile(path.join(distDir, "index.html"), "utf8");
  if (!template.includes("<!--seo:start-->") || !template.includes('<div id="root"></div>')) throw new Error("Built HTML does not contain SEO placeholders");
  for (const page of pages) {
    const output = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, seoHead(page, origin) + "\n    " + fallbackStyle)
      .replace('<div id="root"></div>', `<div id="root">${await fallbackContent(page)}</div>`);
    const dir = page.url === "/" ? distDir : path.join(distDir, page.url.slice(1));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, "index.html"), output);
  }
  const notFound = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>Page not found — EasyUI</title></head><body><main><h1>Page not found</h1><p>That page does not exist.</p><a href="/">Back to discover</a></main></body></html>';
  await writeFile(path.join(distDir, "404.html"), notFound);
  await writeFile(path.join(distDir, "robots.txt"), `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}/sitemap.xml\n` : ""}`);
  if (origin) {
    const urls = pages.map((page) => `  <url><loc>${escapeHtml(`${origin}${page.url}`)}</loc></url>`).join("\n");
    await writeFile(path.join(distDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  } else {
    await rm(path.join(distDir, "sitemap.xml"), { force: true });
    console.warn("SEO: SITE_URL is not set; canonical URLs and sitemap.xml were omitted.");
  }
  console.log(`SEO: generated ${pages.length} indexable pages${origin ? ` for ${origin}` : ""}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await generateSeo();
}
