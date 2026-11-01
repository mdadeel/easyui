import { Alert, AlertDescription, AlertTitle } from "@easyui/react";

export default function Example() {
  return (
    <Alert variant="success">
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your workspace is up to date.</AlertDescription>
    </Alert>
  );
}
