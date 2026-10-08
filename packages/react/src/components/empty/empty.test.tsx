import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Empty } from "./empty";

describe("Empty", () => {
  it("renders title, description and action", () => {
    render(
      <Empty title="No projects" description="Create one to get started." action={<button>Create project</button>} />,
    );
    expect(screen.getByText("No projects")).toBeInTheDocument();
    expect(screen.getByText("Create one to get started.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create project" })).toBeInTheDocument();
  });

  it("has no axe violations", async () => {
    const { container } = render(<Empty title="Nothing here" />);
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
