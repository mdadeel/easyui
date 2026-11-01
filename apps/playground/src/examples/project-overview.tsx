import { useState } from "react";
import { Avatar, AvatarFallback, Badge, Button, Card, Progress } from "@easyui/react";

export default function Example() {
  const [details, setDetails] = useState(false);
  return (
    <Card style={{ gap: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <span style={{ color: "var(--eui-color-fg-muted)", fontSize: 11, letterSpacing: ".08em", fontWeight: 700 }}>PROJECT / 01</span>
        <Badge variant="outline">On track</Badge>
      </div>
      <div><strong style={{ fontSize: 17 }}>The Atlas project</strong><p style={{ margin: "5px 0 0", color: "var(--eui-color-fg-muted)", fontSize: 13 }}>A little space for big ideas.</p></div>
      <Progress label="Project progress" value={72} showValue />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Avatar size="sm"><AvatarFallback>MR</AvatarFallback></Avatar><Avatar size="sm"><AvatarFallback>SC</AvatarFallback></Avatar><span style={{ fontSize: 12, color: "var(--eui-color-fg-muted)" }}>+3</span></div>
        <Button size="sm" variant="secondary" aria-expanded={details} onClick={() => setDetails(!details)}>{details ? "Hide details" : "View details"}</Button>
      </div>
      {details && <p style={{ margin: 0, fontSize: 12, color: "var(--eui-color-fg-muted)" }}>Next up: review the final designs with your team.</p>}
    </Card>
  );
}
