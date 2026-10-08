import { useEffect, useState } from "react";

/** Hash routing keeps the docs static-host friendly, with no server rewrites. */
export function usePath(): string {
  const read = () => {
    const raw = window.location.hash.replace(/^#/, "") || "/";
    return raw.startsWith("/") ? raw : `/${raw}`;
  };
  const [path, setPath] = useState(read);
  useEffect(() => {
    const onChange = () => {
      setPath(read());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return path;
}

export function go(path: string) {
  window.location.hash = path;
}
