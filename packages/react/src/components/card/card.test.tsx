import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  it("renders its parts with the eui classes and a semantic title heading", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Invite members</CardTitle>
          <CardDescription>Anyone with the link can join.</CardDescription>
        </CardHeader>
        <CardContent>Body</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByRole("heading", { level: 3, name: "Invite members" })).toHaveClass(
      "eui-card__title",
    );
    expect(screen.getByText("Anyone with the link can join.")).toHaveClass("eui-card__description");
    expect(screen.getByText("Footer")).toHaveClass("eui-card__footer");
  });

  it("lets the caller choose the heading level", () => {
    render(<CardTitle as="h2">Billing</CardTitle>);
    expect(screen.getByRole("heading", { level: 2, name: "Billing" })).toBeInTheDocument();
  });

  it("merges a custom className", () => {
    const { container } = render(<Card className="custom">x</Card>);
    expect(container.firstChild).toHaveClass("eui-card", "custom");
  });

  it("has no axe violations", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Plan</CardTitle>
          <CardDescription>Pro, billed monthly.</CardDescription>
        </CardHeader>
      </Card>,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
