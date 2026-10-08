import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("renders title, description, and the variant class", () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Plan limit reached</AlertTitle>
        <AlertDescription>Upgrade to add more projects.</AlertDescription>
      </Alert>,
    );
    expect(screen.getByText("Plan limit reached")).toHaveClass("eui-alert__title");
    expect(screen.getByText("Upgrade to add more projects.").closest(".eui-alert")).toHaveClass("eui-alert--warning");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Alert role="status">
        <AlertTitle>Saved</AlertTitle>
        <AlertDescription>Your changes are live.</AlertDescription>
      </Alert>,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
