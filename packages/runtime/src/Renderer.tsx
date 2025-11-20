import type { ComponentNode } from "@lowcode/data-center";
import { componentRegistry } from "@lowcode/components";
import type { CSSProperties } from "react";

export interface RendererProps {
  schema: ComponentNode[];
  onNodeClick?: (nodeId: string) => void;
  canvasStyle?: CSSProperties;
}

export const Renderer = ({ schema, onNodeClick, canvasStyle }: RendererProps) => {
  return (
    <div style={{ width: "100%", ...canvasStyle }}>
      {schema.map((node) => (
        <RuntimeNode node={node} key={node.id} onNodeClick={onNodeClick} />
      ))}
    </div>
  );
};

const RuntimeNode = ({
  node,
  onNodeClick
}: {
  node: ComponentNode;
  onNodeClick?: (nodeId: string) => void;
}) => {
  const definition = componentRegistry[node.type];

  if (!definition) {
    return (
      <div
        style={{
          padding: 12,
          margin: "12px 0",
          border: "1px dashed #f97316",
          background: "#fff7ed"
        }}
      >
        未找到组件 {node.type}
      </div>
    );
  }

  const Component = definition.component;
  return (
    <div data-node-id={node.id} style={{ position: "relative", marginBottom: 16 }}>
      <Component
        id={node.id}
        props={{ ...definition.defaultProps, ...node.props }}
        style={node.style}
        onClick={() => onNodeClick?.(node.id)}
      />
      {node.children && node.children.length > 0 && (
        <div style={{ marginTop: 12, paddingLeft: 12, borderLeft: "2px solid #e2e8f0" }}>
          {node.children.map((child) => (
            <RuntimeNode node={child} key={child.id} onNodeClick={onNodeClick} />
          ))}
        </div>
      )}
    </div>
  );
};
