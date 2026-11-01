import { AlertDialog, AlertDialogClose, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger, Button } from "@easyui/react";

export default function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="secondary">Archive project</Button>} />
      <AlertDialogContent><AlertDialogTitle>Archive this project?</AlertDialogTitle><AlertDialogDescription>You can restore it later.</AlertDialogDescription><AlertDialogFooter><AlertDialogClose render={<Button variant="secondary">Cancel</Button>} /><AlertDialogClose render={<Button>Archive</Button>} /></AlertDialogFooter></AlertDialogContent>
    </AlertDialog>
  );
}
