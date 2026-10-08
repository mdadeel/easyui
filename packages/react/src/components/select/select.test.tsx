import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const REGIONS = [
  { value: "eu", label: "Europe" },
  { value: "us", label: "United States" },
  { value: "bd", label: "Bangladesh" },
];

function RegionSelect({ onChange }: { onChange?: (v: string | null) => void }) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Select
      items={REGIONS}
      value={value}
      onValueChange={(v) => {
        setValue(v as string);
        onChange?.(v as string);
      }}
    >
      <SelectTrigger aria-label="Region">
        <SelectValue placeholder="Choose a region" />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r.value} value={r.value}>
            {r.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

describe("Select", () => {
  it("shows the placeholder, then opens as a listbox on click", async () => {
    const user = userEvent.setup();
    render(<RegionSelect />);
    const trigger = screen.getByRole("combobox", { name: "Region" });
    expect(trigger).toHaveClass("eui-select__trigger");
    expect(trigger).toHaveTextContent("Choose a region");
    await user.click(trigger);
    expect(await screen.findByRole("listbox")).toBeInTheDocument();
  });

  it("selects an option by click and shows its label", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RegionSelect onChange={onChange} />);
    await user.click(screen.getByRole("combobox", { name: "Region" }));
    await user.click(await screen.findByRole("option", { name: "Bangladesh" }));
    await waitFor(() =>
      expect(screen.getByRole("combobox", { name: "Region" })).toHaveTextContent("Bangladesh"),
    );
    expect(onChange).toHaveBeenCalledWith("bd");
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    render(<RegionSelect />);
    await user.click(screen.getByRole("combobox", { name: "Region" }));
    await screen.findByRole("listbox");
    const results = await axe.run(document.body, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
