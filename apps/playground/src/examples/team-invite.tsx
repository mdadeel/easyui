import { useState, type ChangeEvent } from "react";
import { Button, Card, Field, Input } from "@easyui/react";

export default function Example() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <Card style={{ width: "100%", gap: 14 }}>
      <span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 12, background: "var(--eui-color-hover)", color: "var(--eui-color-fg)", fontSize: 20 }}>✳</span>
      <div><strong style={{ fontSize: 17 }}>Better together</strong><p style={{ margin: "5px 0 0", color: "var(--eui-color-fg-muted)", fontSize: 13, lineHeight: 1.5 }}>Invite someone to your workspace.</p></div>
      <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} style={{ display: "grid", gap: 12 }}>
        <Field label="Email address"><Input type="email" placeholder="name@company.com" value={email} required onChange={(event: ChangeEvent<HTMLInputElement>) => { setEmail(event.target.value); setSubmitted(false); }} /></Field>
        <Button type="submit" fullWidth>Prepare invite →</Button>
      </form>
      <span role="status" style={{ color: "var(--eui-color-fg-muted)", fontSize: 12 }}>{submitted ? `Demo ready for ${email}. No email was sent.` : "Demo only · no email will be sent"}</span>
    </Card>
  );
}
