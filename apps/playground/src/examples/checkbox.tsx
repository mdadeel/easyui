import { Checkbox } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Checkbox label="Product updates" description="The occasional note from us." defaultChecked />
      <Checkbox label="Weekly digest" description="A summary of your activity." />
    </div>
  );
}
