import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@easyui/react";

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary">Project actions</Button>} />
      <DropdownMenuContent><DropdownMenuGroup><DropdownMenuLabel>Project</DropdownMenuLabel><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem>Archive</DropdownMenuItem></DropdownMenuGroup></DropdownMenuContent>
    </DropdownMenu>
  );
}
