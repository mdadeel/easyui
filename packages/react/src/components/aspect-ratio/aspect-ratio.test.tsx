import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AspectRatio } from "./aspect-ratio";

describe("AspectRatio", () => {
  it("applies the ratio as an aspect-ratio style", () => {
    const { container } = render(<AspectRatio ratio={4 / 3} />);
    expect((container.firstElementChild as HTMLElement).style.aspectRatio).toBe("1.3333333333333333 / 1");
  });
});
