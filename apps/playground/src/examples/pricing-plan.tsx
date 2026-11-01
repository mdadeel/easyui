import { useState } from "react";
import { Badge, Button, Card, Switch } from "@easyui/react";

export default function Example() {
  const [annual, setAnnual] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <Card style={{ width: "100%", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}><strong style={{ fontSize: 15 }}>Studio plan</strong><Badge variant="outline">For teams</Badge></div>
      <div><strong style={{ fontSize: 28, letterSpacing: "-.05em" }}>${annual ? "15" : "19"}</strong><span style={{ color: "var(--eui-color-fg-muted)", fontSize: 12 }}> / month</span><p style={{ margin: "4px 0 0", color: "var(--eui-color-fg-muted)", fontSize: 12 }}>{annual ? "Billed yearly" : "Billed monthly"}</p></div>
      <Switch label="Annual billing" checked={annual} onCheckedChange={setAnnual} />
      <div style={{ borderTop: "1px solid var(--eui-color-border)", paddingTop: 12, color: "var(--eui-color-fg-muted)", fontSize: 12, lineHeight: 1.6 }}>✓ Unlimited projects<br/>✓ Up to 10 teammates</div>
      <Button fullWidth onClick={() => setSelected(!selected)} aria-pressed={selected}>{selected ? "Plan selected" : "Choose studio"}</Button>
      {selected && <span role="status" style={{ color: "var(--eui-color-fg-muted)", fontSize: 12 }}>Demo selection only; no purchase is made.</span>}
    </Card>
  );
}
