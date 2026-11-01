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
      <div className="header-actions"><a className="github-link" href="https://github.com/mdadeel/easyui" target="_blank" rel="noreferrer" aria-label="GitHub repository"><span className="github-text">GitHub</span><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.23-1.63-1.23-1.63-1-.69.08-.67.08-.67 1.12.08 1.71 1.14 1.71 1.14.99 1.7 2.6 1.2 3.23.92.1-.71.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.49 0-1.21.43-2.2 1.14-2.98-.12-.28-.5-1.42.11-2.95 0 0 .93-.3 3.05 1.14a10.62 10.62 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.71.78 1.14 1.77 1.14 2.98 0 4.26-2.6 5.2-5.09 5.48.4.35.75 1.02.75 2.06V22c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"/></svg></a></div>
    </header>
  );
}
