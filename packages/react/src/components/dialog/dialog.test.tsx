import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Button } from "../button/button";
import { EasyUIProvider } from "../../provider/easyui-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="secondary">Delete project</Button>} />
      <DialogContent>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogDescription>This cannot be undone.</DialogDescription>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <Button variant="danger">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens from a trigger rendered with our Button", async () => {
    const user = userEvent.setup();
    render(<DeleteDialog />);
    const trigger = screen.getByRole("button", { name: "Delete project" });
    expect(trigger).toHaveClass("eui-button", "eui-button--secondary");
    await user.click(trigger);
    expect(await screen.findByRole("dialog", { name: "Delete project?" })).toBeInTheDocument();
    expect(screen.getByText("This cannot be undone.")).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<DeleteDialog />);
    const trigger = screen.getByRole("button", { name: "Delete project" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("closes from the Cancel button", async () => {
    const user = userEvent.setup();
    render(<DeleteDialog />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await user.click(await screen.findByRole("button", { name: "Cancel" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });

  it("moves focus into the dialog when it opens", async () => {
    const user = userEvent.setup();
    render(<DeleteDialog />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = await screen.findByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  });

  it("portals inside EasyUIProvider so the theme applies", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider accent="#2563eb" theme="dark">
        <DeleteDialog />
      </EasyUIProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = await screen.findByRole("dialog");
    const root = dialog.closest(".eui-root") as HTMLElement | null;
    expect(root).not.toBeNull();
    expect(root?.getAttribute("data-theme")).toBe("dark");
    expect(root?.style.getPropertyValue("--eui-color-accent")).toBe("#2563eb");
  });

  it("has no axe violations while open", async () => {
    const user = userEvent.setup();
    render(<DeleteDialog />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = await screen.findByRole("dialog");
    const results = await axe.run(dialog, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
