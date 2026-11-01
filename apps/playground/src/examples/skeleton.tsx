import { Skeleton } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "grid", gap: 10 }} aria-label="Loading profile">
      <Skeleton style={{ width: 44, height: 44, borderRadius: "50%" }} />
      <Skeleton style={{ width: "75%" }} />
      <Skeleton style={{ width: "50%" }} />
    </div>
  );
}
