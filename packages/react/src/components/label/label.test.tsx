import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Label } from "./label";

describe("Label", () => {
  it("names its control and hides the required marker from assistive tech", () => {
    render(
      <>
        <Label htmlFor="name" required>
          Name
        </Label>
        <input id="name" />
      </>,
    );
    // Accessible name ignores the aria-hidden asterisk; getByLabelText would match its text too.
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(document.querySelector(".eui-label__required")).toHaveAttribute("aria-hidden", "true");
  });
});
