import { Spinner } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Spinner label="Loading" /><span>Loading your workspace...</span>
    </div>
  );
}
