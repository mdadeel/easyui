import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Field } from "../field/field";
import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a textarea with the eui classes", () => {
    render(<Textarea aria-label="Message" />);
    const el = screen.getByRole("textbox", { name: "Message" });
    expect(el.tagName).toBe("TEXTAREA");
    expect(el).toHaveClass("eui-input", "eui-textarea");
  });

  it("accepts multi-line input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Notes" />);
    const el = screen.getByRole("textbox", { name: "Notes" });
    await user.type(el, "line one{Enter}line two");
    expect(el).toHaveValue("line one\nline two");
  });

  it("marks itself invalid when the parent Field is invalid", () => {
    render(
      <Field label="Bio" error="Too short" invalid>
        <Textarea />
      </Field>,
    );
    const el = screen.getByLabelText("Bio");
    expect(el).toHaveAttribute("aria-invalid", "true");
    expect(el).toHaveAccessibleDescription("Too short");
  });
});
