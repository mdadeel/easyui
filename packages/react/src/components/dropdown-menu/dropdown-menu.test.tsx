import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

function Actions({ onRename }: { onRename?: () => void }) {
  return (
    <EasyUIProvider>
      <DropdownMenu>
        <DropdownMenuTrigger render={<button type="button">More</button>} />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Project</DropdownMenuLabel>
            <DropdownMenuItem onClick={onRename}>Rename</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </EasyUIProvider>
  );
}

describe("DropdownMenu", () => {
  it("opens as a menu and runs the chosen item", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<Actions onRename={onRename} />);
    await user.click(screen.getByRole("button", { name: "More" }));
    await user.click(await screen.findByRole("menuitem", { name: "Rename" }));
    expect(onRename).toHaveBeenCalledTimes(1);
  });

  it("moves between items with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Actions />);
    await user.click(screen.getByRole("button", { name: "More" }));
    const first = await screen.findByRole("menuitem", { name: "Rename" });
    first.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Actions />);
    const trigger = screen.getByRole("button", { name: "More" });
    await user.click(trigger);
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });

  it("has no axe violations when open", async () => {
    const user = userEvent.setup();
    render(<Actions />);
    await user.click(screen.getByRole("button", { name: "More" }));
    await screen.findByRole("menu");
    const results = await axe.run(document.body, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
