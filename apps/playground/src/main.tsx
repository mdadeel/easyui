import { lazy, Suspense, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource/geist-mono/400.css";
import "@easyui/react/styles.css";
import "./playground.css";
import "./blocks.css";
import { Gallery } from "./Gallery";
import { legacyDestination, resolveRoute } from "./routing";
const App = lazy(() => import("./App").then(module => ({ default: module.App })));
const BlocksPage = lazy(() => import("./blocks").then(module => ({ default: module.BlocksPage })));

function Root() {
  const [route, setRoute] = useState(() => resolveRoute(window.location.pathname, window.location.hash));
  useEffect(() => {
    const destination = legacyDestination(window.location.pathname, window.location.hash);
    if (destination) window.location.replace(destination);
  }, [route]);
  useEffect(() => {
    const onChange = () => setRoute(resolveRoute(window.location.pathname, window.location.hash));
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => { window.removeEventListener("hashchange", onChange); window.removeEventListener("popstate", onChange); };
  }, []);
  return <Suspense fallback={<p role="status" style={{ padding: 24 }}>Loading…</p>}>{route.type === "blocks" ? <BlocksPage /> : route.type === "playground" ? <App /> : <Gallery />}</Suspense>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
