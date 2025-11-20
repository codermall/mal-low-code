import type { CSSProperties, ComponentType as ReactComponentType, ReactNode } from "react";

export type ComponentKind = "text" | "button" | "image";

export interface ComponentPropertySchema {
  key: string;
  label: string;
  type: "string" | "number" | "color" | "image";
  defaultValue?: unknown;
}

export interface ComponentRenderProps<P extends object = Record<string, unknown>> {
  id: string;
  props: P;
  style?: CSSProperties;
  onClick?: () => void;
}

export interface ComponentDefinition<P extends object = Record<string, unknown>> {
  type: ComponentKind;
  displayName: string;
  description?: string;
  icon?: ReactNode;
  component: ReactComponentType<ComponentRenderProps<P>>;
  defaultProps: P;
  propertySchema: ComponentPropertySchema[];
}

export interface ComponentRegistry {
  [key: string]: ComponentDefinition<any>;
}
