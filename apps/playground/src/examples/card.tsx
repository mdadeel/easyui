import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from "@easyui/react";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>Manage your workspace preferences.</CardDescription>
      </CardHeader>
      <CardContent><Button variant="secondary" size="sm">View settings</Button></CardContent>
    </Card>
  );
}
