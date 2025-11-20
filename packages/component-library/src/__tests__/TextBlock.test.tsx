import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { TextBlock } from "../components/TextBlock";

describe("TextBlock", () => {
  it("renders provided text content", () => {
    render(<TextBlock id="node" props={{ text: "Hello Enterprise" }} />);
    expect(screen.getByText("Hello Enterprise")).toBeInTheDocument();
  });

  it("applies default styles when not provided", () => {
    render(<TextBlock id="node" props={{ text: "Default Styles" }} />);
    const element = screen.getByText("Default Styles");
    expect(element).toHaveStyle("text-align: left");
    expect(element).toHaveStyle("font-size: 16px");
  });
});
