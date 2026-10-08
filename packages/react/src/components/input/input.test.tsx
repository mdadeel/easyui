import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Field } from "../field/field";
import { Input } from "./input";

describe("Input", () => {
  it("renders a native input with the eui-input classes and size", () => {
    render(<Input aria-label="Name" size="lg" />);
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveClass("eui-input", "eui-input--lg");
    expect(input).toHaveAttribute("data-size", "lg");
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("is labelled by its Field and described by the description", () => {
    render(
      <Field label="Email" description="We never share it.">
        <Input type="email" />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAccessibleDescription("We never share it.");
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("marks invalid and links the error message when Field has an error", () => {
    render(
      <Field label="Email" error="Enter a valid email address.">
        <Input type="email" />
      </Field>,
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Enter a valid email address.");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address.");
  });

  it("has no axe violations in a labelled field with description and error", async () => {
    const { container } = render(
      <Field label="Team name" description="Shown on invoices." error="Required.">
        <Input />
      </Field>,
    );
    const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
});
