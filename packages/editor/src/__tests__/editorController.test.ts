import { describe, it, expect } from "vitest";
import { EditorController } from "../core/editorController";

describe("EditorController", () => {
  it("adds components via registry defaults", () => {
    const controller = new EditorController();
    const initial = controller.getSnapshot().schema.length;

    controller.addComponent("button");
    const snapshot = controller.getSnapshot();

    expect(snapshot.schema).toHaveLength(initial + 1);
    expect(snapshot.schema.at(-1)?.props).toMatchObject({ label: "立即咨询" });
  });

  it("updates node props through data center", () => {
    const controller = new EditorController();
    const created = controller.addComponent("text");

    controller.updateNodeProps(created.id, { text: "Updated" });
    const node = controller.findNode(created.id);

    expect(node?.props).toMatchObject({ text: "Updated" });
  });
});
