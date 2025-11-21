import { EditorDataCenter } from "@lowcode/data-center";
import { componentList, componentRegistry } from "@lowcode/components";
import type { ComponentNode, EditorState, NodeId } from "@lowcode/data-center";

export class EditorController {
  private dataCenter: EditorDataCenter;

  constructor() {
    this.dataCenter = new EditorDataCenter({
      schema: [
        {
          id: "welcome-text",
          type: "text",
          props: {
            text: "拖拽左侧组件到画布开始搭建",
            align: "center",
            color: "#94a3b8",
            fontSize: 20
          }
        }
      ]
    });
  }

  getPalette() {
    return componentList;
  }

  getDataCenter() {
    return this.dataCenter;
  }

  getSnapshot(): EditorState {
    return this.dataCenter.getSnapshot();
  }

  addComponent(type: string) {
    const definition = componentRegistry[type];
    const props = definition ? { ...definition.defaultProps } : {};
    return this.dataCenter.addNode(type, props);
  }

  updateNodeProps(nodeId: NodeId, patch: Record<string, unknown>) {
    this.dataCenter.updateNodeProps(nodeId, patch);
  }

  selectNode(nodeId?: NodeId) {
    this.dataCenter.selectNode(nodeId);
  }

  findNode(nodeId: NodeId): ComponentNode | undefined {
    const traverse = (nodes: ComponentNode[]): ComponentNode | undefined => {
      for (const node of nodes) {
        if (node.id === nodeId) return node;
        if (node.children) {
          const found = traverse(node.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    return traverse(this.dataCenter.getState().schema);
  }
}

export const editorController = new EditorController();
