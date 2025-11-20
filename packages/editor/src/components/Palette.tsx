import type { ComponentDefinition } from "@lowcode/components";
import { editorController } from "../core/editorController";
import { beginComponentDrag } from "../core/dragDrop";

const paletteItems = editorController.getPalette();

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
