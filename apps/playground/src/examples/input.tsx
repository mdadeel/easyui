import { Field, Input } from "@easyui/react";

export default function Example() {
  return (
    <Field label="Email address" description="We'll never share your email.">
      <Input type="email" placeholder="you@example.com" />
    </Field>
  );
}
