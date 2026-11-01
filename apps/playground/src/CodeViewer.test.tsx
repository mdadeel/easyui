import { afterEach, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import CodeViewer from "./CodeViewer";
import buttonSource from "./examples/button.tsx?raw";

afterEach(cleanup);

it("preserves exact source text, including blank lines, while highlighting", () => {
  render(<CodeViewer code={buttonSource} title="Button" />);
  const source = screen.getByLabelText("Button example source");
  expect(source.textContent).toBe(buttonSource);
  expect(source.querySelector(".token")).not.toBeNull();
});
