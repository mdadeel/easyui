import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@easyui/react";

export default function Example() {
  return (
    <Select items={[{ value: "design", label: "Design" }, { value: "engineering", label: "Engineering" }]}>
      <SelectTrigger aria-label="Team"><SelectValue placeholder="Choose a team" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="design">Design</SelectItem>
        <SelectItem value="engineering">Engineering</SelectItem>
      </SelectContent>
    </Select>
  );
}
