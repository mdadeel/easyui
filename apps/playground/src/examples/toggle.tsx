import { Toggle, ToggleGroup } from "@easyui/react";

export default function Example() {
  return (
    <ToggleGroup aria-label="Text style" multiple>
      <Toggle value="bold" aria-label="Bold">B</Toggle>
      <Toggle value="italic" aria-label="Italic"><em>I</em></Toggle>
      <Toggle value="underline" aria-label="Underline"><u>U</u></Toggle>
    </ToggleGroup>
  );
}
