export type SiteRoute =
  | { type: "home" | "getting-started" | "playground" | "blocks" | "not-found" }
  | { type: "component"; id: string };

/** Clean URLs are canonical; preserve old hash links for existing bookmarks. */
export function resolveRoute(pathname: string, hash = ""): SiteRoute {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/") {
    if (hash === "#getting-started") return { type: "getting-started" };
    if (hash === "#playground") return { type: "playground" };
    if (hash === "#blocks") return { type: "blocks" };
    const legacy = /^#component\/([a-z0-9-]+)$/.exec(hash);
    return legacy ? { type: "component", id: legacy[1]! } : { type: "home" };
  }
  if (path === "/getting-started") return { type: "getting-started" };
  if (path === "/playground") return { type: "playground" };
  if (path === "/blocks") return { type: "blocks" };
  const component = /^\/components\/([a-z0-9-]+)$/.exec(path);
  return component ? { type: "component", id: component[1]! } : { type: "not-found" };
}

/** Redirect legacy hash URLs to their canonical, indexable equivalents. */
export function legacyDestination(pathname: string, hash: string): string | null {
  if (pathname !== "/" || !hash) return null;
  const route = resolveRoute(pathname, hash);
  if (route.type === "component") return `/components/${route.id}/`;
  if (route.type === "getting-started" || route.type === "playground" || route.type === "blocks") return `/${route.type}/`;
  return null;
}
