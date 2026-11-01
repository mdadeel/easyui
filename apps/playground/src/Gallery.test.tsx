import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gallery } from "./Gallery";

describe("component discovery", () => {
  beforeEach(() => { window.history.replaceState(null, "", "/"); localStorage.clear(); });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); window.history.replaceState(null, "", "/"); });

  it("filters actual examples by search and category and can recover from no results", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const search = screen.getByRole("textbox", { name: "Search components" });
    await user.type(search, "dialog");
    expect(screen.getByRole("heading", { name: /Alert dialog/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^Button/ })).not.toBeInTheDocument();
    await user.clear(search);
    await user.type(search, "not-a-component");
    expect(screen.getByText("Nothing here just yet")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Explore all components/ }));
    expect(screen.getByRole("heading", { name: /^Button/ })).toBeInTheDocument();
  });

  it("persists saved examples and makes them accessible from the collection", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Gallery />);
    await user.click(screen.getByRole("button", { name: "Save Button to favorites" }));
    expect(JSON.parse(localStorage.getItem("easyui-favorites") || "[]")).toContain("button");
    unmount();
    render(<Gallery />);
    await user.click(screen.getByRole("button", { name: /Saved \(1\)/ }));
    expect(screen.getByRole("heading", { name: /Button/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^Card/ })).not.toBeInTheDocument();
  });

  it("renders a clean component URL with a crawlable details link", () => {
    window.history.replaceState(null, "", "/components/button/");
    render(<Gallery />);
    expect(screen.getByRole("heading", { name: "Button", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Read the setup guide/ })).toHaveAttribute("href", "/getting-started/");
  });

  it("provides component links directly in the collection", () => {
    render(<Gallery />);
    const card = screen.getByRole("heading", { name: /^Button/ }).closest("article")!;
    expect(within(card).getByRole("link", { name: /View details/ })).toHaveAttribute("href", "/components/button/");
  });

  it("shows the same example source in a deep-linked detail page", async () => {
    window.location.hash = "#component/switch";
    const user = userEvent.setup();
    render(<Gallery />);
    expect(screen.getByRole("heading", { name: "Switch", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Push notifications" })).toBeChecked();
    await user.click(screen.getByRole("button", { name: "View code" }));
    expect(await screen.findByRole("dialog", { name: "Switch" })).toBeInTheDocument();
    const code = screen.getByText(/import \{ Switch \} from/);
    expect(code.textContent).toContain('label="Push notifications"');
    expect(code.textContent).toContain("defaultChecked");
  });

  it("opens code in a dialog without replacing the gallery and restores focus on close", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const trigger = screen.getByRole("button", { name: "View Button code" });
    await user.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "Button" });
    expect(within(dialog).getByLabelText("Button example source")).toHaveTextContent('import { Button }');
    await user.click(within(dialog).getByRole("button", { name: "Preview" }));
    expect(within(dialog).getByRole("button", { name: "Get started" })).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: "Button" })).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("heading", { name: /Discover components/ })).toBeInTheDocument();
  });

  it("keeps live previews separate from card actions and does not duplicate form ids in the dialog", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const card = screen.getByRole("heading", { name: /Textarea/ }).closest("article")!;
    const preview = card.querySelector(".stage-content")!;
    expect(within(preview as HTMLElement).queryByRole("button", { name: /View Textarea code/ })).not.toBeInTheDocument();
    await user.click(within(card).getByRole("button", { name: "Open Textarea preview" }));
    const dialog = await screen.findByRole("dialog", { name: "Textarea" });
    const input = within(dialog).getByLabelText("Message");
    await user.type(input, "Hello");
    expect(input).toHaveValue("Hello");
    expect(document.querySelectorAll('#message')).toHaveLength(1);
  });

  it("filters to composed patterns and opens their real example code", async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const filters = screen.getByLabelText("Component categories");
    await user.click(within(filters).getByRole("button", { name: "Patterns" }));
    expect(screen.getByRole("heading", { name: /Project overview/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^Button/ })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "View Project overview code" }));
    const dialog = await screen.findByRole("dialog", { name: "Project overview" });
    expect(within(dialog).getByLabelText("Project overview example source")).toHaveTextContent("Project progress");
  });

  it("keeps invite and billing examples interactive without implying real transactions", async () => {
    window.location.hash = "#component/team-invite";
    const user = userEvent.setup();
    const { unmount } = render(<Gallery />);
    await user.type(screen.getByRole("textbox", { name: "Email address" }), "maker@example.com");
    await user.click(screen.getByRole("button", { name: /Prepare invite/ }));
    expect(screen.getByRole("status")).toHaveTextContent("No email was sent");
    unmount();
    window.location.hash = "#component/pricing-plan";
    render(<Gallery />);
    expect(screen.getByText("$19")).toBeInTheDocument();
    await user.click(screen.getByRole("switch", { name: "Annual billing" }));
    expect(screen.getByText("$15")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Choose studio" }));
    expect(screen.getByRole("status")).toHaveTextContent("no purchase is made");
  });

  it("keeps preview controls usable and exposes copied code", async () => {
    window.location.hash = "#component/tabs";
    const user = userEvent.setup();
    render(<Gallery />);
    const tabs = screen.getByRole("tablist", { name: "Workspace sections" });
    await user.click(within(tabs).getByRole("tab", { name: "Activity" }));
    expect(screen.getByText("You're all caught up.")).toBeVisible();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    await user.click(screen.getByRole("button", { name: "View code" }));
    await screen.findByRole("dialog", { name: "Tabs" });
    await user.click(screen.getByRole("button", { name: "Copy code" }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining('TabsTab value="activity"'));
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();
  });
});
