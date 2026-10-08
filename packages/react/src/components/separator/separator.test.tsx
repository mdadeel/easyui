import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "./separator";

describe("Separator", () => {
  it("renders a hairline with the eui class", () => {
    const { container } = render(<Separator />);
    expect(container.firstElementChild).toHaveClass("eui-separator");
  });

  it("supports vertical orientation", () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstElementChild).toHaveAttribute("aria-orientation", "vertical");
  });
});
