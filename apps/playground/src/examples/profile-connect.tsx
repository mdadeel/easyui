import { useState } from "react";
import { Avatar, AvatarFallback, Badge, Button, Card } from "@easyui/react";

export default function Example() {
  const [following, setFollowing] = useState(false);
  return (
    <Card style={{ gap: 14, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Avatar size="lg"><AvatarFallback>SC</AvatarFallback></Avatar>
        <Badge variant="outline">Available</Badge>
      </div>
      <div><strong style={{ fontSize: 17 }}>Sarah Chen</strong><p style={{ margin: "4px 0 0", color: "var(--eui-color-fg-muted)", fontSize: 13 }}>Product designer · Brooklyn, NY</p></div>
      <p style={{ margin: 0, lineHeight: 1.5, fontSize: 13 }}>Making thoughtful things for people and the planet.</p>
      <div style={{ borderTop: "1px solid var(--eui-color-border)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ color: "var(--eui-color-fg-muted)", fontSize: 12 }}>12 shared connections</span>
        <Button size="sm" variant={following ? "secondary" : "primary"} aria-pressed={following} onClick={() => setFollowing(!following)}>{following ? "Following" : "Follow"}</Button>
      </div>
    </Card>
  );
}
