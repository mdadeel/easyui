import { Button } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button>Get started</Button>
      <Button variant="secondary">Learn more</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  );
}
