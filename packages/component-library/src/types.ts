import type { CSSProperties, ComponentType as ReactComponentType, ReactNode } from "react";

// 统一的组件分类，用于 Palette 及运行时分发
export type ComponentKind = "text" | "button" | "image";

// 属性面板元数据，决定 UI 该渲染什么输入控件
export interface ComponentPropertySchema {
  key: string;
  label: string;
  type: "string" | "number" | "color" | "image";
  defaultValue?: unknown;
}

// 运行时传入组件的通用 Props，包含 id/样式/事件
export interface ComponentRenderProps<P extends object = Record<string, unknown>> {
  id: string;
  props: P;
  style?: CSSProperties;
  onClick?: () => void;
}

// 注册表中每个组件的描述，包含默认值与属性 schema
export interface ComponentDefinition<P extends object = Record<string, unknown>> {
  type: ComponentKind;
  displayName: string;
  description?: string;
  icon?: ReactNode;
  component: ReactComponentType<ComponentRenderProps<P>>;
  defaultProps: P;
  propertySchema: ComponentPropertySchema[];
}

// 组件注册表主索引
export interface ComponentRegistry {
  [key: string]: ComponentDefinition<any>;
}
