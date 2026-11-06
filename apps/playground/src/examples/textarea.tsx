import { Textarea, Label } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write a little note…" />
    </div>
  );
}
