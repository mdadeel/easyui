import { resolveRoute } from "./routing";

/** Shared product navigation for the collection, theme playground, and block demo. */
export function SiteHeader() {
  const route = resolveRoute(window.location.pathname, window.location.hash);
  const current = route.type === "component" || route.type === "home" ? "discover" : route.type;
  return (
    <header className="site-header">
      <a className="site-brand" href="/" aria-label="easyui home">
        <span className="logo-mark" aria-hidden="true"><span/><span/><span/><span/></span>
        <span>easyui<span className="brand-period">.</span></span>
      </a>
      <div className="header-divider"/>
      <nav className="top-nav" aria-label="Main navigation">
        <a href="/" aria-current={current === "discover" ? "page" : undefined}>Discover</a>
        <a href="/getting-started/" aria-current={current === "getting-started" ? "page" : undefined}>Get started</a>
        <a href="/playground/" aria-current={current === "playground" ? "page" : undefined}>Playground</a>
        <a href="/blocks/" aria-current={current === "blocks" ? "page" : undefined}>Blocks</a>
      </nav>
      <div className="header-actions"><a className="github-link" href="https://github.com/mdadeel/easyui" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a></div>
    </header>
  );
}
