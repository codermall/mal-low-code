import type { ComponentNode } from "@lowcode/data-center";
import { componentRegistry } from "@lowcode/components";

interface InspectorProps {
  node?: ComponentNode;
  onChange: (patch: Record<string, unknown>) => void;
}

// 右侧属性面板：根据组件 schema 动态渲染输入控件
export const Inspector = ({ node, onChange }: InspectorProps) => {
  if (!node) {
    return (
      <div className="panel">
        <h2>属性面板</h2>
        <p>选择画布上的组件即可配置属性</p>
      </div>
    );
  }

  const definition = componentRegistry[node.type];
  const schema = definition?.propertySchema ?? [];

  return (
    <div className="panel">
      <h2>{definition?.displayName ?? "组件"}</h2>
      {schema.length === 0 && <p>当前组件暂无可配置属性</p>}
      {schema.map((field) => (
        <div className="inspector-field" key={field.key}>
          <label>{field.label}</label>
          <input
            type={field.type === "number" ? "number" : field.type === "color" ? "color" : "text"}
            value={String(node.props[field.key] ?? "")}
            onChange={(event) =>
              onChange({
                [field.key]:
                  field.type === "number" ? Number(event.target.value) : event.target.value
              })
            }
          />
        </div>
      ))}
    </div>
  );
};
