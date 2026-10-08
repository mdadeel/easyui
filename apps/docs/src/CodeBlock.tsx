import { useState } from "react";
import { Button } from "@easyui/react";

/** Code sample with a copy button. The copy result is announced through a live region. */
export function CodeBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__label">{label}</span>
        <Button variant="ghost" size="sm" onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </Button>
        <span className="sr-only" role="status">
          {copied ? "Copied to clipboard" : ""}
        </span>
      </div>
      <pre className="code__pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
