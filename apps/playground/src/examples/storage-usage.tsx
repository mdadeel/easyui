import { useState } from "react";
import { Badge, Button, Card, Progress } from "@easyui/react";

export default function Example() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card style={{ gap: 15, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}><span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "var(--eui-color-fg-muted)" }}>YOUR WORKSPACE</span><Badge variant="outline">Storage</Badge></div>
      <div><strong style={{ fontSize: 25, letterSpacing: "-.04em" }}>6.8 <span style={{ color: "var(--eui-color-fg-muted)", fontSize: 14, fontWeight: 400 }}>of 10 GB</span></strong><p style={{ color: "var(--eui-color-fg-muted)", fontSize: 13, margin: "4px 0 0" }}>A little room for your next big idea.</p></div>
      <Progress label="Storage used" value={68} showValue />
      <Button variant="secondary" size="sm" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "Hide breakdown" : "See breakdown"}</Button>
      {expanded && <p style={{ margin: 0, color: "var(--eui-color-fg-muted)", fontSize: 12 }}>Files: 4.2 GB · Media: 2.6 GB</p>}
    </Card>
  );
}
