import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Show project details</CollapsibleTrigger>
      <CollapsiblePanel>Created for the design team.</CollapsiblePanel>
    </Collapsible>
  );
}
