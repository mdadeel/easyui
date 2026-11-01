import { useState } from "react";
import { Button, Card } from "@easyui/react";

export default function Example() {
  const [rating, setRating] = useState<number | null>(null);
  return (
    <Card style={{ width: "100%", gap: 14 }}>
      <span aria-hidden="true" style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 12, background: "var(--eui-color-hover)", fontSize: 19 }}>✺</span>
      <div><strong style={{ fontSize: 16 }}>How did we do?</strong><p style={{ color: "var(--eui-color-fg-muted)", fontSize: 13, lineHeight: 1.5, margin: "5px 0 0" }}>Your feedback helps us make the experience better.</p></div>
      <div role="group" aria-label="Rate your experience" style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {[1, 2, 3, 4, 5].map(value => <Button key={value} size="sm" variant={rating === value ? "primary" : "secondary"} aria-label={`${value} out of 5`} aria-pressed={rating === value} onClick={() => setRating(value)}>{value}</Button>)}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--eui-color-fg-muted)", fontSize: 11 }}><span>Not great</span><span>Wonderful</span></div>
      <span role="status" style={{ color: "var(--eui-color-fg-muted)", fontSize: 12 }}>{rating ? `You selected ${rating} out of 5. Demo only.` : "Choose a rating to try it out."}</span>
    </Card>
  );
}
