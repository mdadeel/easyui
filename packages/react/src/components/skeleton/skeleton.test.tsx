import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Skeleton } from "./skeleton";

describe("Skeleton", () => {
  it("is hidden from assistive tech", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveClass("eui-skeleton");
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
