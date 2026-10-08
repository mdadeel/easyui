import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import { Field } from "../field/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox";

const TEAMS = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "growth", label: "Growth" },
];

function TeamPicker({ onValueChange, invalid }: { onValueChange?: (v: unknown) => void; invalid?: boolean }) {
  return (
    <EasyUIProvider>
      <Combobox items={TEAMS} itemToStringLabel={(t: { label: string }) => t.label} onValueChange={onValueChange}>
        <Field label="Team" error={invalid ? "Pick a team." : undefined} invalid={invalid}>
          <ComboboxInput placeholder="Search teams" />
        </Field>
        <ComboboxContent>
          <ComboboxEmpty>No team matches that search.</ComboboxEmpty>
          <ComboboxList>
            {(team: { value: string; label: string }) => (
              <ComboboxItem key={team.value} value={team}>
                {team.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </EasyUIProvider>
  );
}

describe("Combobox", () => {
  it("filters options as the user types and selects one", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<TeamPicker onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox", { name: "Team" });
    await user.click(input);
    await user.type(input, "eng");
    const option = await screen.findByRole("option", { name: "Engineering" });
    expect(screen.queryByRole("option", { name: "Design" })).not.toBeInTheDocument();
    await user.click(option);
    await waitFor(() => expect(onValueChange).toHaveBeenCalled());
    expect(screen.getByRole("combobox", { name: "Team" })).toHaveValue("Engineering");
  });

  it("shows the empty state when nothing matches", async () => {
    const user = userEvent.setup();
    render(<TeamPicker />);
    const input = screen.getByRole("combobox", { name: "Team" });
    await user.type(input, "zzz");
    expect(await screen.findByText("No team matches that search.")).toBeInTheDocument();
  });

  it("marks the input invalid when the field is invalid", () => {
    render(<TeamPicker invalid />);
    expect(screen.getByRole("combobox", { name: "Team" })).toHaveAttribute("aria-invalid", "true");
  });

  it("has no axe violations", async () => {
    const { container } = render(<TeamPicker />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
