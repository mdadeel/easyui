import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";

function Filters() {
  return (
    <EasyUIProvider>
      <Popover>
        <PopoverTrigger render={<button type="button">Filters</button>} />
        <PopoverContent>
          <PopoverTitle>Filter projects</PopoverTitle>
          <PopoverDescription>Show only projects you own.</PopoverDescription>
        </PopoverContent>
      </Popover>
    </EasyUIProvider>
  );
}

describe("Popover", () => {
  it("opens from its trigger and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<Filters />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(await screen.findByText("Filter projects")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByText("Filter projects")).not.toBeInTheDocument());
  });

  it("has no axe violations when open", async () => {
    const user = userEvent.setup();
    render(<Filters />);
    await user.click(screen.getByRole("button", { name: "Filters" }));
    await screen.findByText("Filter projects");
    const results = await axe.run(document.body, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
