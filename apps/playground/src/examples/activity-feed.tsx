import { useState } from "react";
import { Avatar, AvatarFallback, Button, Card } from "@easyui/react";

export default function Example() {
  const [read, setRead] = useState(false);
  return (
    <Card style={{ width: "100%", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}><div><strong style={{ fontSize: 16 }}>Recent activity</strong><p style={{ fontSize: 12, color: "var(--eui-color-fg-muted)", margin: "4px 0 0" }}>A little update from your team.</p></div><span style={{ fontSize: 12, color: "var(--eui-color-fg-muted)" }}>{read ? "0 new" : "2 new"}</span></div>
      {[{ initials: "MR", name: "Maya", action: "shared a new file", time: "2h ago" }, { initials: "SC", name: "Sarah", action: "left a comment", time: "Yesterday" }].map(item => <div key={item.name} style={{ display: "flex", gap: 10, borderTop: "1px solid var(--eui-color-border)", paddingTop: 12 }}><Avatar size="sm"><AvatarFallback>{item.initials}</AvatarFallback></Avatar><div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12, lineHeight: 1.5 }}><strong>{item.name}</strong> {item.action}</div><div style={{ color: "var(--eui-color-fg-muted)", fontSize: 11, marginTop: 3 }}>{item.time}</div></div>{!read && <span role="img" aria-label="Unread" style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--eui-color-accent)", marginTop: 6 }}/>}</div>)}
      <Button variant="secondary" size="sm" disabled={read} onClick={() => setRead(true)}>{read ? "All caught up" : "Mark all as read"}</Button>
    </Card>
  );
}
