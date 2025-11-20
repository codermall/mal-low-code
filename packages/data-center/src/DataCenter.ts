import { appendNode, cloneNodes, generateNodeId, updateNodeById } from "./utils";
import type { ComponentNode, EditorEvent, EditorState, EventListener, NodeId } from "./types";

export interface AddNodeOptions {
  parentId?: NodeId;
  style?: ComponentNode["style"];
}

export class EditorDataCenter {
  private state: EditorState;
  private listeners: Map<EditorEvent, Set<EventListener>>;

  constructor(initialState?: Partial<EditorState>) {
    this.state = {
      schema: initialState?.schema ? cloneNodes(initialState.schema) : [],
      selectedId: initialState?.selectedId,
      meta: initialState?.meta ?? {}
    };
    this.listeners = new Map();
  }

  getState(): EditorState {
    return cloneState(this.state);
  }

  subscribe<T = unknown>(event: EditorEvent, listener: EventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as EventListener);
    return () => {
      this.listeners.get(event)?.delete(listener as EventListener);
    };
  }

  addNode(type: string, props: Record<string, unknown>, options?: AddNodeOptions): ComponentNode {
    const node: ComponentNode = {
      id: generateNodeId(),
      type,
      props,
      style: options?.style,
      children: []
    };
    this.state = {
      ...this.state,
      schema: appendNode(this.state.schema, node, options?.parentId)
    };
    this.emit("schema:change", this.state.schema);
    return node;
  }

  updateNodeProps(nodeId: NodeId, patch: Record<string, unknown>): void {
    this.state = {
      ...this.state,
      schema: updateNodeById(this.state.schema, nodeId, (node) => ({
        ...node,
        props: { ...node.props, ...patch }
      }))
    };
    this.emit("schema:change", this.state.schema);
  }

  updateNodeStyle(nodeId: NodeId, patch: Record<string, string | number>): void {
    this.state = {
      ...this.state,
      schema: updateNodeById(this.state.schema, nodeId, (node) => ({
        ...node,
        style: { ...(node.style ?? {}), ...patch }
      }))
    };
    this.emit("schema:change", this.state.schema);
  }

  selectNode(nodeId?: NodeId) {
    this.state = { ...this.state, selectedId: nodeId };
    this.emit("selection:change", nodeId);
  }

  replaceSchema(nodes: ComponentNode[]) {
    this.state = { ...this.state, schema: cloneNodes(nodes) };
    this.emit("schema:change", this.state.schema);
  }

  private emit(event: EditorEvent, payload: unknown) {
    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }
}

const cloneState = (state: EditorState): EditorState => ({
  schema: cloneNodes(state.schema),
  selectedId: state.selectedId,
  meta: state.meta ? { ...state.meta } : undefined
});
