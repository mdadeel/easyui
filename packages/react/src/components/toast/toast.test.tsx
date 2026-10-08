import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import { ToastProvider, toast } from "./toast";

describe("Toast", () => {
  it("shows a toast with its title and description", async () => {
    render(
      <EasyUIProvider>
        <ToastProvider timeout={60000}>
          <span>app</span>
        </ToastProvider>
      </EasyUIProvider>,
    );
    act(() => {
      toast({ title: "Invite sent", description: "maya@company.com has 48 hours to join." });
    });
    expect(await screen.findByText("Invite sent")).toBeInTheDocument();
    expect(screen.getByText("maya@company.com has 48 hours to join.")).toBeInTheDocument();
  });

  it("dismisses a toast with its close button", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider>
        <ToastProvider timeout={60000}>
          <span>app</span>
        </ToastProvider>
      </EasyUIProvider>,
    );
    act(() => {
      toast({ title: "Saved" });
    });
    await screen.findByText("Saved");
    await user.click(screen.getByRole("button", { name: "Dismiss notification" }));
    await waitFor(() => expect(screen.queryByText("Saved")).not.toBeInTheDocument());
  });
});
