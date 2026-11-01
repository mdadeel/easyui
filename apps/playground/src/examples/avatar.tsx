import { Avatar, AvatarFallback } from "@easyui/react";

export default function Example() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar size="sm"><AvatarFallback>SC</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>MR</AvatarFallback></Avatar>
      <Avatar size="lg"><AvatarFallback>JD</AvatarFallback></Avatar>
    </div>
  );
}
