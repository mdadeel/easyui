import { Badge } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="accent">In progress</Badge>
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="outline">In review</Badge>
      <Badge variant="danger">Urgent</Badge>
    </div>
  );
}
