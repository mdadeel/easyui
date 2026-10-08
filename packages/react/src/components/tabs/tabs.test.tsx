import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsPanel, TabsTab } from "./tabs";

function Sections() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Project sections">
        <TabsTab value="overview">Overview</TabsTab>
        <TabsTab value="members">Members</TabsTab>
        <TabsTab value="billing">Billing</TabsTab>
      </TabsList>
      <TabsPanel value="overview">Overview body</TabsPanel>
      <TabsPanel value="members">Members body</TabsPanel>
      <TabsPanel value="billing">Billing body</TabsPanel>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("shows the default panel and marks its tab selected", () => {
    render(<Sections />);
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Overview body");
  });

  it("switches panels on click", async () => {
    const user = userEvent.setup();
    render(<Sections />);
    await user.click(screen.getByRole("tab", { name: "Members" }));
    expect(screen.getByRole("tab", { name: "Members" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Members body");
  });

  it("moves between tabs with the arrow keys", async () => {
    const user = userEvent.setup();
    render(<Sections />);
    screen.getByRole("tab", { name: "Overview" }).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Members" })).toHaveFocus();
  });

  it("applies the eui classes", () => {
    render(<Sections />);
    expect(screen.getByRole("tablist")).toHaveClass("eui-tabs__list");
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveClass("eui-tabs__tab");
  });

  it("has no axe violations", async () => {
    const { container } = render(<Sections />);
    const results = await axe.run(container, {
      rules: { "color-contrast": { enabled: false }, region: { enabled: false } },
    });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
