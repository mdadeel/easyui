import { Radio, RadioGroup } from "@easyui/react";

export default function Example() {
  return (
    <RadioGroup defaultValue="starter" aria-label="Plan">
      <Radio value="starter" label="Starter" description="For personal projects." />
      <Radio value="team" label="Team" description="For working together." />
    </RadioGroup>
  );
}
