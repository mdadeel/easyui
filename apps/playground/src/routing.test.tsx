import { describe, expect, it } from "vitest";
import { legacyDestination, resolveRoute } from "./routing";

describe("crawlable site routes", () => {
  it("resolves clean paths, trailing slashes and unknown routes", () => {
    expect(resolveRoute("/components/button/")).toEqual({ type: "component", id: "button" });
    expect(resolveRoute("/components/button")).toEqual({ type: "component", id: "button" });
    expect(resolveRoute("/getting-started/")).toEqual({ type: "getting-started" });
    expect(resolveRoute("/playground/")).toEqual({ type: "playground" });
    expect(resolveRoute("/blocks/")).toEqual({ type: "blocks" });
    expect(resolveRoute("/unknown/")).toEqual({ type: "not-found" });
  });

  it("preserves legacy bookmarks and redirects them to clean URLs", () => {
    expect(resolveRoute("/", "#component/button")).toEqual({ type: "component", id: "button" });
    expect(legacyDestination("/", "#component/button")).toBe("/components/button/");
    expect(legacyDestination("/", "#playground")).toBe("/playground/");
    expect(legacyDestination("/", "#collection")).toBeNull();
    expect(legacyDestination("/components/button/", "#usage-notes")).toBeNull();
  });
});
