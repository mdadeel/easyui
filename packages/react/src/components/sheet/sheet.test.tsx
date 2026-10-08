import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./sheet";

function Nav({ side }: { side?: "left" | "right" | "bottom" }) {
  return (
    <EasyUIProvider>
      <Sheet>
        <SheetTrigger render={<button type="button">Menu</button>} />
        <SheetContent side={side}>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Projects, members, and settings.</SheetDescription>
          <a href="/projects">Projects</a>
        </SheetContent>
      </Sheet>
    </EasyUIProvider>
  );
}

describe("Sheet", () => {
  it("opens as a labelled dialog with the side class", async () => {
    const user = userEvent.setup();
    render(<Nav side="left" />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    const dialog = await screen.findByRole("dialog", { name: "Navigation" });
    expect(dialog).toHaveClass("eui-sheet", "eui-sheet--left");
  });

  it("defaults to the right edge", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(await screen.findByRole("dialog")).toHaveClass("eui-sheet--right");
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Nav side="left" />);
    const trigger = screen.getByRole("button", { name: "Menu" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
  });
});
