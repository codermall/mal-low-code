import type { ComponentNode, NodeId } from "./types";

let seed = 0;

export const generateNodeId = () => {
  seed += 1;
  return `node_${seed.toString(36)}`;
};

export const cloneNodes = (nodes: ComponentNode[]): ComponentNode[] =>
  nodes.map((node) => ({
    ...node,
    props: { ...node.props },
    style: node.style ? { ...node.style } : undefined,
    children: node.children ? cloneNodes(node.children) : undefined
  }));

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
