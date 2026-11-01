import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import worker from "../worker.mjs";

const filename = "google7ecf99f475b9e5b2.html";
const path = `/${filename}`;
const original = await readFile(new URL(`../public/${filename}`, import.meta.url), "utf8");

test("Google verification file is served from the original asset without redirecting", async () => {
  const request = new Request(`https://easyui.example${path}?test=1`, { headers: { "x-test": "preserved" } });
  const env = { ASSETS: { fetch(assetRequest) {
    assert.equal(assetRequest.url, "https://easyui.example/google7ecf99f475b9e5b2/?test=1");
    assert.equal(assetRequest.method, "GET");
    assert.equal(assetRequest.headers.get("x-test"), "preserved");
    return new Response(original, { status: 200, headers: { "content-type": "text/html" } });
  } } };
  const response = await worker.fetch(request, env);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("location"), null);
  assert.equal(await response.text(), `google-site-verification: ${filename}`);
});

test("verification HEAD and other paths retain their request method and headers", async () => {
  for (const [pathname, method, expectedPath] of [[path, "HEAD", "/google7ecf99f475b9e5b2/"], ["/components/button/", "GET", "/components/button/"], [path, "POST", path]]) {
    const request = new Request(`https://easyui.example${pathname}`, { method });
    let captured;
    const env = { ASSETS: { fetch(value) { captured = value; return new Response(null, { status: 204 }); } } };
    await worker.fetch(request, env);
    assert.equal(new URL(captured.url).pathname, expectedPath);
    assert.equal(captured.method, method);
  }
});

test("Wrangler routes the verification URL through the Worker only", async () => {
  const config = JSON.parse(await readFile(new URL("../../../wrangler.json", import.meta.url), "utf8"));
  assert.equal(config.main, "apps/playground/worker.mjs");
  assert.equal(config.assets.binding, "ASSETS");
  assert.deepEqual(config.assets.run_worker_first, [path]);
  assert.equal(config.assets.html_handling, "force-trailing-slash");
  assert.equal(config.assets.not_found_handling, "404-page");
});
