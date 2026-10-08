import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EasyUIProvider } from "../../provider/easyui-provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

function Hint() {
  return (
    <Tooltip>
      <TooltipTrigger render={<button type="button">Copy link</button>} />
      <TooltipContent>Copy invite link</TooltipContent>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  it("shows the hint on hover and hides it on leave", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider>
        <Hint />
      </EasyUIProvider>,
    );
    await user.hover(screen.getByRole("button", { name: "Copy link" }));
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Copy invite link");
    await user.unhover(screen.getByRole("button", { name: "Copy link" }));
  });

  it("opens on keyboard focus", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider>
        <Hint />
      </EasyUIProvider>,
    );
    await user.tab();
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });

  it("describes the trigger with the popup while open", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider>
        <Hint />
      </EasyUIProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Copy link" });
    expect(trigger).not.toHaveAttribute("aria-describedby");
    await user.hover(trigger);
    const popup = await screen.findByRole("tooltip");
    expect(trigger).toHaveAccessibleDescription("Copy invite link");
    expect(trigger).toHaveAttribute("aria-describedby", popup.id);
  });

  it("renders the popup with the eui class", async () => {
    const user = userEvent.setup();
    render(
      <EasyUIProvider>
        <Hint />
      </EasyUIProvider>,
    );
    await user.hover(screen.getByRole("button", { name: "Copy link" }));
    expect(await screen.findByRole("tooltip")).toHaveClass("eui-tooltip");
  });
});
