import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Renderer } from "../Renderer";
import type { ComponentNode } from "@lowcode/data-center";

const schema: ComponentNode[] = [
  {
    id: "text-node",
    type: "text",
    props: { text: "营销标题" }
  },
  {
    id: "button-node",
    type: "button",
    props: { label: "立即咨询" }
  }
];

describe("Renderer", () => {
  it("renders all nodes from schema", () => {
    render(<Renderer schema={schema} />);
    expect(screen.getByText("营销标题")).toBeInTheDocument();
    expect(screen.getByText("立即咨询")).toBeInTheDocument();
  });

  it("invokes callback when node clicked", () => {
    const onNodeClick = vi.fn();
    render(<Renderer schema={schema} onNodeClick={onNodeClick} />);
    fireEvent.click(screen.getByText("立即咨询"));
    expect(onNodeClick).toHaveBeenCalledWith("button-node");
  });
});
