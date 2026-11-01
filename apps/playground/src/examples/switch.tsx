import { Switch } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Switch label="Push notifications" description="Stay up to date on activity." defaultChecked />
      <Switch label="Email updates" description="Receive occasional emails." />
    </div>
  );
}
