export type NodeId = string;

export interface ComponentNode {
  id: NodeId;
  type: string;
  props: Record<string, unknown>;
  style?: Record<string, string | number>;
  children?: ComponentNode[];
}

export interface EditorState {
  schema: ComponentNode[];
  selectedId?: NodeId;
  meta?: Record<string, unknown>;
}

export type EditorEvent = "schema:change" | "selection:change";

export type EventListener<T = unknown> = (payload: T) => void;
