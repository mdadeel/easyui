import { Button, Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="secondary">Open panel</Button>} />
      <SheetContent><SheetTitle>Workspace settings</SheetTitle><SheetDescription>Manage your workspace here.</SheetDescription><SheetClose render={<Button variant="secondary">Close</Button>} /></SheetContent>
    </Sheet>
  );
}
