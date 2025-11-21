// Schema 节点唯一标识
export type NodeId = string;

// 页面树的最小结构单元
export interface ComponentNode {
  id: NodeId;
  type: string;
  props: Record<string, unknown>;
  style?: Record<string, string | number>;
  children?: ComponentNode[];
}

// 编辑器全局状态：包含页面 schema 与选中节点
export interface EditorState {
  schema: ComponentNode[];
  selectedId?: NodeId;
  meta?: Record<string, unknown>;
}

// DataCenter 目前支持的事件类型
export type EditorEvent = "schema:change" | "selection:change";

// 事件监听器签名
export type EventListener<T = unknown> = (payload: T) => void;
