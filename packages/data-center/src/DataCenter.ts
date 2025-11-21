import { appendNode, cloneNodes, generateNodeId, updateNodeById } from "./utils";
import type { ComponentNode, EditorEvent, EditorState, EventListener, NodeId } from "./types";

// 控制 addNode 时的附加选项
export interface AddNodeOptions {
  parentId?: NodeId;
  style?: ComponentNode["style"];
}

// DataCenter 负责统一维护 schema 与选中态，并对外暴露订阅能力
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
    return this.state;
  }

  getSnapshot(): EditorState {
    return cloneState(this.state);
  }

  // 提供原子订阅能力，外部可根据事件类型拆分监听逻辑
  subscribe<T = unknown>(event: EditorEvent, listener: EventListener<T>): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(listener as EventListener);
    return () => {
      this.listeners.get(event)?.delete(listener as EventListener);
    };
  }

  // 新增节点：默认 append 到根节点，支持传入 parentId
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

  // 更新节点属性，常用于属性面板的回写
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

  // 更新节点样式，暂未在 UI 中暴露，可扩展
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

  // 设置当前选中节点 ID，undefined 则表示清空
  selectNode(nodeId?: NodeId) {
    this.state = { ...this.state, selectedId: nodeId };
    this.emit("selection:change", nodeId);
  }

  // 用外部导入的 schema 替换当前页面
  replaceSchema(nodes: ComponentNode[]) {
    this.state = { ...this.state, schema: cloneNodes(nodes) };
    this.emit("schema:change", this.state.schema);
  }

  // 触发订阅事件
  private emit(event: EditorEvent, payload: unknown) {
    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }
}

const cloneState = (state: EditorState): EditorState => ({
  schema: cloneNodes(state.schema),
  selectedId: state.selectedId,
  meta: state.meta ? { ...state.meta } : undefined
});
