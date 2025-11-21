import type { ComponentNode } from "@lowcode/data-center";
import { Renderer } from "@lowcode/runtime";
import { readComponentDragData } from "../core/dragDrop";
import type React from "react";

interface CanvasProps {
  schema: ComponentNode[];
  onDropComponent: (type: string) => void;
  onSelectNode: (id: string) => void;
}

// 中间画布区域：负责接受拖拽以及展示实时渲染结果
export const Canvas = ({ schema, onDropComponent, onSelectNode }: CanvasProps) => {
  const handleDrop: React.DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    const componentType = readComponentDragData(event);
    if (componentType) {
      onDropComponent(componentType);
    }
  };

  return (
    <div className="canvas-wrapper" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
      <div className="canvas">
        {schema.length === 0 ? (
          <div className="empty-state">拖拽组件到此处构建页面</div>
        ) : (
          <Renderer schema={schema} onNodeClick={onSelectNode} />
        )}
      </div>
    </div>
  );
};
