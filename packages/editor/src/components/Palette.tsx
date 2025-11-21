import type { ComponentDefinition } from "@lowcode/components";
import { editorController } from "../core/editorController";
import { beginComponentDrag } from "../core/dragDrop";

const paletteItems = editorController.getPalette();

// 左侧组件面板：列出所有可拖拽的业务组件
export const Palette = () => {
  return (
    <div className="panel">
      <h2>组件库</h2>
      {paletteItems.map((component) => (
        <PaletteItem key={component.type} component={component} />
      ))}
    </div>
  );
};

// 单个组件条目的渲染，同时挂载拖拽事件
const PaletteItem = ({ component }: { component: ComponentDefinition }) => (
  <div
    className="palette-item"
    draggable
    onDragStart={(event) => beginComponentDrag(event, component.type)}
  >
    <strong>{component.displayName}</strong>
    <small>{component.description}</small>
  </div>
);
