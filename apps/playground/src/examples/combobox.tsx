import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, Field } from "@easyui/react";

const teams = [{ value: "design", label: "Design" }, { value: "engineering", label: "Engineering" }];

export default function Example() {
  return (
    <Combobox items={teams} itemToStringLabel={(team: { label: string }) => team.label}>
      <Field label="Team"><ComboboxInput placeholder="Search teams" /></Field>
      <ComboboxContent><ComboboxEmpty>No team found.</ComboboxEmpty><ComboboxList>
        {(team: { value: string; label: string }) => <ComboboxItem key={team.value} value={team}>{team.label}</ComboboxItem>}
      </ComboboxList></ComboboxContent>
    </Combobox>
  );
}
