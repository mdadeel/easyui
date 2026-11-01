import { lazy, Suspense, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/geist";
import "@fontsource/geist-mono/400.css";
import "@easyui/react/styles.css";
import "./playground.css";
import "./blocks.css";
import { Gallery } from "./Gallery";
const App = lazy(() => import("./App").then(module => ({ default: module.App })));
const BlocksPage = lazy(() => import("./blocks").then(module => ({ default: module.BlocksPage })));

function Root() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return <Suspense fallback={<p role="status" style={{ padding: 24 }}>Loading…</p>}>{hash === "#blocks" ? <BlocksPage /> : hash === "#playground" ? <App /> : <Gallery />}</Suspense>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
