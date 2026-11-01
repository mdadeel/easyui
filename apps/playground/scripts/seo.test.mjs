import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { generateSeo, normalizeSiteUrl } from "./seo.mjs";

const template = '<!doctype html><html lang="en"><head><!--seo:start--><title>Default</title><!--seo:end--></head><body><div id="root"></div><script type="module" src="/assets/app.js"></script></body></html>';
async function fixture() {
  const dir = await mkdtemp(path.join(os.tmpdir(), "easyui-seo-"));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), template);
  return dir;
}

test("generates crawlable, unique pages and an absolute sitemap for a configured origin", async () => {
  const dir = await fixture();
  try {
    await generateSeo({ distDir: dir, siteUrl: "https://ui.example.com/" });
    const home = await readFile(path.join(dir, "index.html"), "utf8");
    const button = await readFile(path.join(dir, "components/button/index.html"), "utf8");
    const guide = await readFile(path.join(dir, "getting-started/index.html"), "utf8");
    const sitemap = await readFile(path.join(dir, "sitemap.xml"), "utf8");
    const robots = await readFile(path.join(dir, "robots.txt"), "utf8");
    assert.match(home, /href="\/components\/button\/"/);
    assert.match(home, /<h1>React components, ready to make yours\.<\/h1>/);
    assert.match(home, /accessible building blocks and ready-to-use patterns/);
    assert.match(home, /Profile &amp; connect/);
    assert.match(home, /What is EasyUI\?/);
    assert.match(home, /How do I get started with EasyUI\?/);
    assert.match(home, /property="og:image" content="https:\/\/ui\.example\.com\/social-card\.png"/);
    assert.match(home, /name="twitter:card" content="summary_large_image"/);
    const graph = JSON.parse(home.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.ok(graph["@graph"].some((entry) => entry["@type"] === "SoftwareSourceCode" && entry.codeRepository === "https://github.com/mdadeel/easyui"));
    assert.match(button, /<title>Button — EasyUI React component<\/title>/);
    assert.match(button, /<h1>Button<\/h1>/);
    assert.match(button, /import \{ Button \} from/);
    assert.match(button, /<link rel="canonical" href="https:\/\/ui\.example\.com\/components\/button\/"/);
    assert.match(button, /"@type":"BreadcrumbList"/);
    assert.match(guide, /git clone https:\/\/github\.com\/mdadeel\/easyui\.git/);
    const catalog = JSON.parse(await readFile(new URL("../src/catalog.json", import.meta.url), "utf8"));
    assert.equal((sitemap.match(/<url>/g) ?? []).length, catalog.length + 4);
    for (const item of catalog) {
      const html = await readFile(path.join(dir, "components", item.id, "index.html"), "utf8");
      assert.ok(html.includes(`href="https://ui.example.com/components/${item.id}/"`));
      assert.ok(sitemap.includes(`<loc>https://ui.example.com/components/${item.id}/</loc>`));
    }
    assert.match(sitemap, /<loc>https:\/\/ui\.example\.com\/components\/button\/<\/loc>/);
    assert.match(robots, /Sitemap: https:\/\/ui\.example\.com\/sitemap\.xml/);
    assert.match(await readFile(path.join(dir, "404.html"), "utf8"), /noindex, follow/);
    assert.match(button, /src="\/assets\/app\.js"/);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test("does not invent an origin or publish an invalid sitemap", async () => {
  const dir = await fixture();
  try {
    await generateSeo({ distDir: dir, siteUrl: "" });
    const button = await readFile(path.join(dir, "components/button/index.html"), "utf8");
    assert.doesNotMatch(button, /rel="canonical"|property="og:url"/);
    assert.doesNotMatch(await readFile(path.join(dir, "robots.txt"), "utf8"), /Sitemap:/);
    await assert.rejects(readFile(path.join(dir, "sitemap.xml"), "utf8"), { code: "ENOENT" });
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test("rejects unsupported deployment URLs", () => {
  assert.equal(normalizeSiteUrl("https://example.com/"), "https://example.com");
  for (const value of ["example.com", "ftp://example.com", "https://example.com/subpath", "https://user:pass@example.com", "https://example.com/?x=1"]) {
    assert.throws(() => normalizeSiteUrl(value), /SITE_URL/);
  }
});

test("Cloudflare Workers deploys generated static pages with genuine 404s", async () => {
  const config = JSON.parse(await readFile(new URL("../../../wrangler.json", import.meta.url), "utf8"));
  assert.ok(typeof config.name === "string" && config.name.trim(), "a Worker name is required");
  assert.ok(config.previews && typeof config.previews === "object" && !Array.isArray(config.previews), "Worker Previews require a previews block");
  assert.equal(config.assets.directory, "./apps/playground/dist");
  assert.equal(config.assets.html_handling, "force-trailing-slash");
  assert.equal(config.assets.not_found_handling, "404-page");
});


test("preserves the supplied verification meta tag in generated pages", async () => {
  const dir = await fixture();
  try {
    const source = await readFile(new URL("../index.html", import.meta.url), "utf8");
    await writeFile(path.join(dir, "index.html"), source);
    await generateSeo({ distDir: dir, siteUrl: "https://easyui.mdadeel125.workers.dev" });
    const home = await readFile(path.join(dir, "index.html"), "utf8");
    const component = await readFile(path.join(dir, "components/button/index.html"), "utf8");
    for (const html of [home, component]) {
      assert.match(html, /<meta name="google-site-verification" content="Yc5EANhdp0wcUR4ek6zZZTvXrQjpRQovQx6hYk4fWn4"/);
    }
    const image = await readFile(new URL("../public/social-card.png", import.meta.url));
    assert.equal(image.readUInt32BE(16), 1200);
    assert.equal(image.readUInt32BE(20), 630);
  } finally { await rm(dir, { recursive: true, force: true }); }
});
