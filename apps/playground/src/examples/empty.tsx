import { Empty, Button } from "@easyui/react";

export default function Example() {
  return (
    <Empty title="No projects yet" description="Your next great idea starts here."
      action={<Button size="sm" variant="secondary">Create project</Button>} />
  );
}
