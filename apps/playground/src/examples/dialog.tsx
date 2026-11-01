import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@easyui/react";

export default function Example() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Open dialog</Button>} />
      <DialogContent>
        <DialogTitle>Welcome to your workspace</DialogTitle>
        <DialogDescription>Everything you need to get started is right here.</DialogDescription>
        <DialogFooter><DialogClose render={<Button>Got it</Button>} /></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
