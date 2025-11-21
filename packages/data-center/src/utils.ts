import type { ComponentNode, NodeId } from "./types";

// 通过自增 seed 生成可预测的节点 ID，方便调试
let seed = 0;

export const generateNodeId = () => {
  seed += 1;
  return `node_${seed.toString(36)}`;
};

// 深拷贝节点数组，确保 undo/redo 等场景的数据安全
export const cloneNodes = (nodes: ComponentNode[]): ComponentNode[] =>
  nodes.map((node) => ({
    ...node,
    props: { ...node.props },
    style: node.style ? { ...node.style } : undefined,
    children: node.children ? cloneNodes(node.children) : undefined
  }));

// 遍历树并更新指定节点
export const updateNodeById = (
  nodes: ComponentNode[],
  nodeId: NodeId,
  updater: (node: ComponentNode) => ComponentNode
): ComponentNode[] => {
  return nodes.map((node) => {
    if (node.id === nodeId) {
      return updater(node);
    }

    if (node.children) {
      return { ...node, children: updateNodeById(node.children, nodeId, updater) };
    }

    return node;
  });
};

// 将节点插入根节点或指定父节点
export const appendNode = (nodes: ComponentNode[], node: ComponentNode, parentId?: NodeId): ComponentNode[] => {
  if (!parentId) {
    return [...nodes, node];
  }

  return nodes.map((current) => {
    if (current.id === parentId) {
      const children = current.children ? [...current.children, node] : [node];
      return { ...current, children };
    }

    if (current.children) {
      return { ...current, children: appendNode(current.children, node, parentId) };
    }

    return current;
  });
};
