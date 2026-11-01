import { Button, Popover, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="secondary">View details</Button>} />
      <PopoverContent><PopoverTitle>Workspace</PopoverTitle><PopoverDescription>Manage your workspace preferences here.</PopoverDescription></PopoverContent>
    </Popover>
  );
}
