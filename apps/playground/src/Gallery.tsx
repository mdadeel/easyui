import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger, EasyUIProvider } from "@easyui/react";
import type { ComponentType } from "react";
import "./gallery.css";
import { SiteHeader } from "./SiteHeader";
import catalog from "./catalog.json";
import { resolveRoute } from "./routing";

type IconName = "search" | "grid" | "layers" | "sparkle" | "heart" | "arrow" | "chevron" | "copy" | "check" | "sliders" | "code" | "external" | "plus" | "bell" | "command" | "mail" | "globe" | "arrowup";
function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 4 4"/></>, grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>, layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>, sparkle: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></>, heart: <path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/>, arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>, chevron: <path d="m9 18 6-6-6-6"/>, copy: <><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></>, check: <path d="m5 12 4 4L19 6"/>, sliders: <><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="white"/><circle cx="15" cy="17" r="2" fill="white"/></>, code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></>, external: <><path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></>, plus: <path d="M12 5v14M5 12h14"/>, bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>, command: <><path d="M9 7V5a2 2 0 1 0-2 2h10a2 2 0 1 0-2-2v14a2 2 0 1 0 2-2H7a2 2 0 1 0 2 2V7Z"/></>, mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>, globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>, arrowup: <><path d="M7 17 17 7M8 7h9v9"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

type Category = "All" | "Patterns" | "Actions" | "Forms" | "Layout" | "Navigation" | "Feedback" | "Overlay";
type Item = { id: string; title: string; description: string; category: Exclude<Category, "All">; source?: string; guidance: string };
const items: Item[] = catalog as Item[];
const categories: { label: Category; icon: IconName }[] = [
  { label: "All", icon: "grid" }, { label: "Patterns", icon: "sparkle" }, { label: "Actions", icon: "command" }, { label: "Forms", icon: "sliders" }, { label: "Layout", icon: "layers" }, { label: "Navigation", icon: "arrow" }, { label: "Feedback", icon: "bell" }, { label: "Overlay", icon: "sparkle" },
];
const examples = import.meta.glob<{ default: ComponentType }>("./examples/*.tsx", { eager: true });
const exampleSource = import.meta.glob<string>("./examples/*.tsx", { eager: true, query: "?raw", import: "default" });
const sourceUrl = (item: Item) => item.category === "Patterns" ? "https://github.com/mdadeel/easyui/blob/main/packages/react/src/index.ts" : `https://github.com/mdadeel/easyui/blob/main/packages/react/src/components/${item.source ?? `${item.id}/${item.id}`}.tsx`;

function CopyButton({ text }: { text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }
  return <div className="copy-wrap"><button className="copy-code" onClick={copy}><Icon name={status === "copied" ? "check" : "copy"} size={14}/>{status === "copied" ? "Copied" : "Copy code"}</button><span className="copy-status" role="status">{status === "error" ? "Copy unavailable. Select the code to copy it." : ""}</span></div>;
}

type ExampleView = "preview" | "code";

function ComponentModal({ item, view, setView, isDetail = false }: { item: Item; view: ExampleView; setView: (view: ExampleView) => void; isDetail?: boolean }) {
  const Example = examples[`./examples/${item.id}.tsx`].default;
  const code = exampleSource[`./examples/${item.id}.tsx`];
  return <DialogContent className="component-modal">
    <div className="component-modal__header">
      <div><span className="component-modal__eyebrow">{item.category} / {item.category === "Patterns" ? "PATTERN" : "COMPONENT"}</span><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.description}</DialogDescription></div>
      <DialogClose render={<button type="button" className="modal-close" aria-label="Close component preview">×</button>} />
    </div>
    <div className="component-modal__toolbar">
      <div className="modal-tabs" aria-label={`${item.title} view`}>
        <button type="button" aria-pressed={view === "preview"} className={view === "preview" ? "selected" : ""} onClick={() => setView("preview")}>Preview</button>
        <button type="button" aria-pressed={view === "code"} className={view === "code" ? "selected" : ""} onClick={() => setView("code")}>Code</button>
      </div>
      {view === "code" && <CopyButton text={code}/>}
    </div>
    {view === "preview" ? <div className="component-modal__preview"><div className="example-inner"><Example /></div></div> : <pre className="component-modal__code" tabIndex={0} aria-label={`${item.title} example source`}><code>{code}</code></pre>}
    <div className="component-modal__footer"><span>{item.guidance}</span>{isDetail ? <a href={sourceUrl(item)} target="_blank" rel="noreferrer">{item.category === "Patterns" ? "Library source" : "View source"} <Icon name="arrowup" size={14}/></a> : <a href={`/components/${item.id}/`}>Full details <Icon name="arrow" size={14}/></a>}</div>
  </DialogContent>;
}

function GalleryCard({ item, saved, onSave }: { item: Item; saved: boolean; onSave: () => void }) {
  const [view, setView] = useState<ExampleView>("preview");
  const [open, setOpen] = useState(false);
  const Example = examples[`./examples/${item.id}.tsx`].default;
  return <Dialog open={open} onOpenChange={setOpen}>
    <article className="gallery-card" data-kind={item.category === "Patterns" ? "pattern" : "component"}>
      <div className={`card-stage stage-${item.id}`}>
        <div className="stage-toolbar"><span className="live-label"><span/> Live preview</span><DialogTrigger render={<button type="button" className="stage-code" aria-label={`View ${item.title} code`} onClick={() => setView("code")}><Icon name="code" size={14}/> Code</button>} /></div>
        <div className="stage-content" tabIndex={(item.category === "Patterns" || ["accordion", "pagination", "radio", "table", "empty"].includes(item.id)) ? 0 : undefined} aria-label={(item.category === "Patterns" || ["accordion", "pagination", "radio", "table", "empty"].includes(item.id)) ? `${item.title} live preview` : undefined} role={(item.category === "Patterns" || ["accordion", "pagination", "radio", "table", "empty"].includes(item.id)) ? "region" : undefined}><div className="example-inner">{!open && <Example />}</div></div>
      </div>
      <div className="card-info"><div><div className="card-title-line"><h3><DialogTrigger render={<button type="button" className="card-title-button" onClick={() => setView("preview")}>{item.title} <span aria-hidden="true">↗</span></button>} /></h3><span className="card-label">{item.category}</span></div><p>{item.description}</p><DialogTrigger render={<button type="button" className="card-author card-preview-link" aria-label={`Open ${item.title} preview`} onClick={() => setView("preview")}><span className="author-mark">✳</span> Open preview <span aria-hidden="true">→</span></button>} /><a className="card-detail-link" href={`/components/${item.id}/`}>View details →</a></div><button className={`save-button ${saved ? "is-saved" : ""}`} onClick={onSave} aria-label={`${saved ? "Remove" : "Save"} ${item.title}${saved ? " from" : " to"} favorites`} aria-pressed={saved}><Icon name="heart" size={17}/></button></div>
    </article>
    <ComponentModal item={item} view={view} setView={setView}/>
  </Dialog>;
}


function Detail({ item }: { item: Item }) {
  const Example = examples[`./examples/${item.id}.tsx`].default;
  const [view, setView] = useState<ExampleView>("code");
  const [open, setOpen] = useState(false);
  return <div className="discovery"><SiteHeader/><main className="detail-page"><nav className="detail-breadcrumb" aria-label="Breadcrumb"><a href="/">Discover</a><Icon name="chevron" size={13}/><span>{item.category}</span><Icon name="chevron" size={13}/><b>{item.title}</b></nav><div className="detail-layout"><div><div className="section-kicker"><span/> {item.category === "Patterns" ? "PATTERN" : "COMPONENT"} / {item.category.toUpperCase()}</div><h1>{item.title}</h1><p className="detail-lede">{item.description}</p><EasyUIProvider accent="#315f49" radius="md" theme="light"><Dialog open={open} onOpenChange={setOpen}><div id="live-example" className="detail-example"><div className="detail-example-head"><span className="detail-live-label"><span/> Live preview</span><DialogTrigger render={<button type="button" className="stage-code detail-code-trigger" onClick={() => setView("code")}><Icon name="code" size={14}/> View code</button>} /></div><div className="detail-preview"><div className="example-inner">{!open && <Example/>}</div></div></div><ComponentModal item={item} view={view} setView={setView} isDetail/></Dialog></EasyUIProvider><p className="example-note">Try the live preview, then open the code to make it yours.</p><section id="usage-notes" className="detail-section"><h2>Usage notes</h2><p>{item.guidance}</p><p>Examples use <code>@easyui/react</code> and its stylesheet. See the setup guide before using them in your project.</p><a className="text-link" href="/getting-started/">Read the setup guide <Icon name="arrow" size={15}/></a></section><section id="implementation" className="detail-section"><h2>Implementation</h2><p>{item.category === "Patterns" ? "The complete example is available through View code above. Explore the underlying library in the repository." : "Explore the component’s implementation in the repository."}</p><a className="text-link" href={sourceUrl(item)} target="_blank" rel="noreferrer">{item.category === "Patterns" ? "View library exports" : "View component source"} <Icon name="arrowup" size={15}/></a></section></div><aside className="detail-aside"><div className="aside-title">ON THIS PAGE</div><a href="#live-example" onClick={e => { e.preventDefault(); document.getElementById("live-example")?.scrollIntoView({ behavior: "smooth" }); }}>Live example</a><a href="#usage-notes" onClick={e => { e.preventDefault(); document.getElementById("usage-notes")?.scrollIntoView({ behavior: "smooth" }); }}>Usage notes</a><a href="#implementation" onClick={e => { e.preventDefault(); document.getElementById("implementation")?.scrollIntoView({ behavior: "smooth" }); }}>Implementation</a><div className="aside-box"><div className="side-promo-icon"><Icon name="sparkle"/></div><strong>Make it yours.</strong><p>Explore accent colors, radius, and themes in the playground.</p><a href="/playground/">Open playground →</a></div></aside></div></main></div>;
}

function GettingStarted() {
  const setup = `git clone https://github.com/mdadeel/easyui.git\ncd easyui\npnpm install\npnpm dev`;
  const usage = `import "@easyui/react/styles.css";\nimport { EasyUIProvider, Button } from "@easyui/react";\n\nexport function App() {\n  return (\n    <EasyUIProvider accent="#315f49" radius="md" theme="light">\n      <Button>Get started</Button>\n    </EasyUIProvider>\n  );\n}`;
  return <div className="discovery"><SiteHeader/><main className="detail-page guide-page"><nav className="detail-breadcrumb" aria-label="Breadcrumb"><a href="/">Discover</a><Icon name="chevron" size={13}/><b>Get started</b></nav><div className="section-kicker"><span/> THE BASICS</div><h1>Get started with easyui.</h1><p className="detail-lede">Everything you need to explore the library and use its components in this workspace.</p><section className="detail-section"><h2>1. Run the workspace</h2><p>EasyUI is a pnpm monorepo. Clone the repository, install dependencies, and start the playground. Node 20.19 or newer is required.</p><div className="guide-code"><CopyButton text={setup}/><pre tabIndex={0}><code>{setup}</code></pre></div></section><section className="detail-section"><h2>2. Add components</h2><p>The playground consumes <code>@easyui/react</code> as a workspace dependency. Import the stylesheet once and wrap your UI in the provider to customize the theme.</p><div className="guide-code"><CopyButton text={usage}/><pre tabIndex={0}><code>{usage}</code></pre></div><p>This repository currently documents workspace usage; check the package's distribution before installing it in an external project.</p></section><section className="detail-section"><h2>3. Find your next component</h2><p>Browse live examples, inspect their exact source, or experiment with the theme controls.</p><div className="guide-links"><a href="/">Explore components →</a><a href="/playground/">Open playground →</a><a href="https://github.com/mdadeel/easyui" target="_blank" rel="noreferrer">Read the repository ↗</a></div></section></main></div>;
}

export function Gallery() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<string[]>(() => { try { const value = JSON.parse(localStorage.getItem("easyui-favorites") || "[]"); return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string" && items.some(item => item.id === id)) : []; } catch { return []; } });
  const [favorites, setFavorites] = useState(false);
  const [sort, setSort] = useState("Featured");
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname, window.location.hash));
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => { try { localStorage.setItem("easyui-favorites", JSON.stringify(saved)); } catch { /* Browsing still works when storage is unavailable. */ } }, [saved]);
  useEffect(() => { const handler = () => setRoute(resolveRoute(window.location.pathname, window.location.hash)); window.addEventListener("hashchange", handler); window.addEventListener("popstate", handler); return () => { window.removeEventListener("hashchange", handler); window.removeEventListener("popstate", handler); }; }, []);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && searchRef.current) { e.preventDefault(); searchRef.current.focus(); } }; window.addEventListener("keydown", handler); return () => window.removeEventListener("keydown", handler); }, []);
  const filtered = useMemo(() => { const q = query.trim().toLowerCase(); const result = items.filter(item => (category === "All" || item.category === category) && (!favorites || saved.includes(item.id)) && (!q || `${item.title} ${item.description} ${item.category}`.toLowerCase().includes(q))); return sort === "A–Z" ? [...result].sort((a, b) => a.title.localeCompare(b.title)) : result; }, [category, query, favorites, saved, sort]);
  function selectCategory(value: Category) { setCategory(value); setFavorites(false); }
  function reset() { setQuery(""); setCategory("All"); setFavorites(false); }
  function goToCollection() { document.getElementById("collection")?.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }); }
  if (route.type === "getting-started") return <GettingStarted/>;
  if (route.type === "component") {
    const item = items.find(entry => entry.id === route.id);
    return item ? <Detail key={item.id} item={item}/> : <div className="discovery"><SiteHeader/><main className="detail-page"><h1>Component not found</h1><p>That example doesn't exist in this collection.</p><a className="text-link" href="/">← Back to discover</a></main></div>;
  }
  if (route.type === "not-found") return <div className="discovery"><SiteHeader/><main className="detail-page"><h1>Page not found</h1><p>That page does not exist.</p><a className="text-link" href="/">← Back to discover</a></main></div>;
  return <div className="discovery"><SiteHeader/><div className="app-layout"><aside className="sidebar"><div className="sidebar-section"><div className="side-heading">EXPLORE</div><button className={`side-link ${!favorites && category === "All" ? "selected" : ""}`} onClick={() => { reset(); goToCollection(); }}><Icon name="grid"/> Discover <span className="side-count">{items.length}</span></button><button className={`side-link ${favorites ? "selected" : ""}`} onClick={() => { setFavorites(true); setCategory("All"); goToCollection(); }}><Icon name="heart"/> Favorites <span className="side-count">{saved.length}</span></button><a className="side-link" href="/getting-started/"><Icon name="code"/> Get started <Icon name="arrowup" size={13}/></a><a className="side-link" href="/blocks/"><Icon name="layers"/> Blocks <Icon name="arrowup" size={13}/></a></div><div className="sidebar-section category-section"><div className="side-heading">CATEGORIES <span>✳</span></div>{categories.slice(1).map(c => <button key={c.label} className={`side-link ${!favorites && category === c.label ? "selected" : ""}`} aria-pressed={!favorites && category === c.label} onClick={() => { selectCategory(c.label); goToCollection(); }}><Icon name={c.icon}/> {c.label}<span className="side-count">{items.filter(i => i.category === c.label).length}</span></button>)}</div><div className="sidebar-bottom"><div className="side-promo-icon"><Icon name="sparkle" size={17}/></div><strong>Make it yours.</strong><p>Fine-tune colors, radius, and more in the playground.</p><a href="/playground/">Open playground <Icon name="arrow" size={14}/></a></div></aside>
    <main className="discover-main"><div className="breadcrumb"><span>Explore</span><Icon name="chevron" size={13}/><b>{favorites ? "Favorites" : category === "All" ? "Discover" : category}</b></div><section className="hero"><div className="hero-copy"><div className="hero-kicker"><span className="kicker-dot"/> THE INTERFACE WORKSHOP <span className="kicker-spark">✳</span></div><h1>The details make<br/><span>the difference.</span></h1><p>Explore React UI components and interface patterns. Thoughtful building blocks for interfaces that feel considered. Explore, experiment, and make them yours.</p><div className="hero-actions"><button onClick={() => { reset(); goToCollection(); }}>Explore components <Icon name="arrow" size={16}/></button><a href="/getting-started/">Get started <Icon name="arrowup" size={15}/></a></div></div><div className="hero-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-star star-one">✳</div><div className="art-star star-two">✦</div><div className="art-window"><div className="art-window-top"><span/><span/><span/><i/></div><div className="art-body"><div className="art-sidebar"><i/><i/><i/><i/></div><div className="art-content"><div className="art-line long"/><div className="art-line short"/><div className="art-tiles"><span/><span/><span/></div><div className="art-bottom"><i/><i/></div></div></div></div><div className="art-floating"><span>✦</span><div><b>Looking good!</b><small>It's all coming together.</small></div><i>✓</i></div><div className="art-caption">A BETTER PLACE TO BEGIN ✳</div></div></section>
    <section id="collection" className="collection"><div className="collection-heading"><div><div className="section-kicker"><span/> THE COLLECTION</div><h2>{favorites ? "Your favorites" : category === "All" ? "Discover components" : category}</h2><p>{favorites ? "Examples saved on this device." : "Useful building blocks and creative patterns, ready to make yours."}</p></div><div className="collection-count"><span className="count-spark">✳</span><div><b>{items.length} live examples</b><small>built with easyui</small></div></div></div><div className="filter-row"><div className="filter-pills" aria-label="Component categories">{categories.map(c => <button key={c.label} className={!favorites && category === c.label ? "active" : ""} aria-pressed={!favorites && category === c.label} onClick={() => selectCategory(c.label)}>{c.label}</button>)}<button className={favorites ? "active" : ""} aria-pressed={favorites} onClick={() => { setFavorites(true); setCategory("All"); }}>♡ Saved ({saved.length})</button></div><div className="filter-actions"><label className="search-box"><Icon name="search" size={16}/><input ref={searchRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search components..." aria-label="Search components"/><kbd>⌘ K</kbd></label><label className="sort-box"><span className="sr-only">Sort components</span><select value={sort} onChange={e => setSort(e.target.value)}><option>Featured</option><option>A–Z</option></select><span>⌄</span></label></div></div><div className="result-meta" aria-live="polite"><span>{filtered.length} {filtered.length === 1 ? "example" : "examples"} <span className="result-light">to explore</span></span><span>LIVE PREVIEWS &amp; SOURCE <span>✳</span></span></div><EasyUIProvider accent="#315f49" radius="md" theme="light"><div className="gallery-grid">{filtered.map(item => <GalleryCard key={item.id} item={item} saved={saved.includes(item.id)} onSave={() => setSaved(current => current.includes(item.id) ? current.filter(id => id !== item.id) : [...current, item.id])}/>)}</div></EasyUIProvider>{filtered.length === 0 && <div className="empty-results"><div className="mini-icon purple"><Icon name="search" size={20}/></div><h3>Nothing here just yet</h3><p>{favorites && !saved.length ? "Save examples with the heart to find them here later." : "Try a different search or category to find what you need."}</p><button onClick={reset}>Explore all components <Icon name="arrow" size={15}/></button></div>}<div className="more-library"><div><b>Looking for more?</b><p>Browse the full library API and explore all available component exports.</p></div><a href="https://github.com/mdadeel/easyui/blob/main/packages/react/src/index.ts" target="_blank" rel="noreferrer">Browse all exports <Icon name="arrowup" size={15}/></a></div></section><footer className="discovery-footer"><span>✳ &nbsp; Made for the details.</span><span>Built with easyui.</span><a href="https://github.com/mdadeel/easyui" target="_blank" rel="noreferrer">GitHub ↗</a></footer></main></div></div>;
}
