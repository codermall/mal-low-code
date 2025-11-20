import { describe, it, expect } from "vitest";
import { EditorDataCenter } from "../DataCenter";

describe("EditorDataCenter", () => {
  it("adds nodes with generated ids", () => {
    const dc = new EditorDataCenter();
    const node = dc.addNode("text", { text: "Hello" });

    expect(node.id).toMatch(/^node_/);
    expect(dc.getState().schema).toHaveLength(1);
  });

  it("emits schema change events", () => {
    const dc = new EditorDataCenter();
    const events: string[] = [];

    dc.subscribe("schema:change", () => events.push("changed"));
    const created = dc.addNode("button", { label: "CTA" });
    dc.updateNodeProps(created.id, { label: "Submit" });

    expect(events).toEqual(["changed", "changed"]);
    expect(dc.getState().schema[0].props).toMatchObject({ label: "Submit" });
  });
});
