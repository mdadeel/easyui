import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="secondary">Hover or focus me</Button>} />
      <TooltipContent>A little more information</TooltipContent>
    </Tooltip>
  );
}
