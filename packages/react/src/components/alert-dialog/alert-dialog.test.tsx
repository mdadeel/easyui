import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

function Delete() {
  return (
    <EasyUIProvider>
      <AlertDialog>
        <AlertDialogTrigger render={<button type="button">Delete project</button>} />
        <AlertDialogContent>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose render={<button type="button">Cancel</button>} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </EasyUIProvider>
  );
}

describe("AlertDialog", () => {
  it("opens as an alertdialog labelled by its title", async () => {
    const user = userEvent.setup();
    render(<Delete />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    const dialog = await screen.findByRole("alertdialog", { name: "Delete this project?" });
    expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    expect(dialog).toHaveClass("eui-dialog");
  });

  it("closes with the Cancel button", async () => {
    const user = userEvent.setup();
    render(<Delete />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await vi.waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });

  it("does not close on a backdrop click", async () => {
    const user = userEvent.setup();
    render(<Delete />);
    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await screen.findByRole("alertdialog");
    const backdrop = document.querySelector(".eui-dialog__backdrop") as HTMLElement;
    await user.pointer({ target: backdrop, keys: "[MouseLeft]", coords: { x: 1, y: 1 } });
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
