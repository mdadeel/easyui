import { Button, ToastProvider, toast } from "@easyui/react";

export default function Example() {
  return (
    <ToastProvider>
      <Button variant="secondary" onClick={() => toast({ title: "Example notification", description: "This is a preview, not a saved change." })}>Show notification</Button>
    </ToastProvider>
  );
}
