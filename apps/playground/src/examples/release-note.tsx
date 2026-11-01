import { useState } from "react";
import { Button, Card } from "@easyui/react";

export default function Example() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={{ width: "100%", gap: 15, background: "var(--eui-color-accent)", color: "var(--eui-color-accent-fg)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em" }}>WHAT'S NEW / 02</span><span aria-hidden="true" style={{ fontSize: 24 }}>✳</span></div>
      <div><strong style={{ fontFamily: "Georgia, serif", fontWeight: 400, fontSize: 24, lineHeight: 1.15, display: "block" }}>A little more room to create.</strong><p style={{ fontSize: 13, lineHeight: 1.5, margin: "9px 0 0" }}>Meet your refreshed workspace, made for the way you work.</p></div>
      <Button size="sm" variant="secondary" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Show less" : "See what's new"} →</Button>
      {expanded && <p style={{ fontSize: 12, margin: 0, lineHeight: 1.5 }}>Explore updated project views and more flexible ways to collaborate.</p>}
    </Card>
  );
}
