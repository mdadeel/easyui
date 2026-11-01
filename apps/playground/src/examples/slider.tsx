import { Slider } from "@easyui/react";

export default function Example() {
  return (
    <Slider label="Volume" defaultValue={40} min={0} max={100} showValue />
  );
}
