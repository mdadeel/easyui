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
    assert.match(home, /<h1>The details make the difference\.<\/h1>/);
    assert.match(home, /React UI components and interface patterns/);
    assert.match(home, /Profile &amp; connect/);
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
