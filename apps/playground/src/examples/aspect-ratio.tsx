import { AspectRatio } from "@easyui/react";

export default function Example() {
  return (
    <AspectRatio ratio={16 / 9} style={{ background: "#eee9fa", borderRadius: 8, display: "grid", placeItems: "center" }}><span>16 : 9</span></AspectRatio>
  );
}
