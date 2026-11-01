import { Card, Switch } from "@easyui/react";

export default function Example() {
  return (
    <Card style={{ gap: 14, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 38, height: 38, background: "var(--eui-color-hover)", borderRadius: 12, fontSize: 18 }}>✳</span><div><strong style={{ fontSize: 15 }}>Stay in the loop</strong><p style={{ margin: "3px 0 0", color: "var(--eui-color-fg-muted)", fontSize: 12 }}>Notifications, your way.</p></div></div>
      <div style={{ height: 1, background: "var(--eui-color-border)" }} />
      <Switch label="Project updates" description="When something needs your attention." defaultChecked />
      <Switch label="Weekly digest" description="A summary every Monday." />
      <p style={{ margin: 0, color: "var(--eui-color-fg-muted)", fontSize: 12 }}>Changes are local to this preview.</p>
    </Card>
  );
}
