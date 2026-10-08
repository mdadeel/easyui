import { Link, Separator, ToastProvider, Button } from "@easyui/react";
import { usePath, go } from "./router";
import { HomePage, GetStartedPage, ThemingPage, RegistryPage, ChangelogPage, ComponentsIndexPage, ComponentPage } from "./pages";
import { COMPONENTS } from "./catalog";

const NAV = [
  { href: "#/get-started", label: "Get started" },
  { href: "#/components", label: "Components" },
  { href: "#/theming", label: "Theming" },
  { href: "#/registry", label: "Registry" },
  { href: "#/changelog", label: "Changelog" },
];

export function App() {
  const path = usePath();
  const onComponent = path.startsWith("/components/");
  const slug = onComponent ? path.slice("/components/".length) : "";

  return (
    <ToastProvider>
      <div className="docs">
        <header className="docs-header">
          <div className="docs-header__inner">
            <a className="docs-brand" href="#/">
              <span className="docs-brand__mark" aria-hidden="true" />
              easyui
            </a>
            <nav aria-label="Main" className="docs-nav">
              {NAV.map((item) => {
                const active = path === item.href.slice(1) || (item.href === "#/components" && onComponent);
                return (
                  <a key={item.href} href={item.href} className="docs-nav__link" aria-current={active ? "page" : undefined}>
                    {item.label}
                  </a>
                );
              })}
            </nav>
            <Button variant="secondary" size="sm" onClick={() => go("/components")}>
              All components
            </Button>
          </div>
        </header>

        <main className="docs-main" id="content">
          {path === "/" && <HomePage />}
          {path === "/get-started" && <GetStartedPage />}
          {path === "/theming" && <ThemingPage />}
          {path === "/registry" && <RegistryPage />}
          {path === "/changelog" && <ChangelogPage />}
          {path === "/components" && <ComponentsIndexPage />}
          {onComponent && <ComponentPage slug={slug} />}
          {!["/", "/get-started", "/theming", "/registry", "/changelog", "/components"].includes(path) && !onComponent && (
            <section className="docs-page docs-page--narrow">
              <h1 className="docs-h1">Page not found</h1>
              <p className="docs-lead">That page does not exist. Try the component list.</p>
              <Link href="#/components">Go to components</Link>
            </section>
          )}
        </main>

        <footer className="docs-footer">
          <Separator />
          <div className="docs-footer__inner">
            <span>easyui, {COMPONENTS.length} components. MIT licensed.</span>
            <span className="docs-footer__links">
              <a href="https://github.com/mdadeel/easyui">Source</a>
              <a href="#/changelog">Changelog</a>
            </span>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}

