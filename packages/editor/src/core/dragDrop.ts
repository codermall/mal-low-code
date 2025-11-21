import type React from "react";

// 自定义 MIME，确保跨浏览器兼容
export const COMPONENT_MIME = "application/x-lowcode-component";

// 拖拽开始时写入组件类型
export const beginComponentDrag = (event: React.DragEvent, componentType: string) => {
  if (!event.dataTransfer) {
    return;
  }
  event.dataTransfer.setData(COMPONENT_MIME, componentType);
  event.dataTransfer.setData("text/plain", componentType);
  event.dataTransfer.effectAllowed = "copy";
};

// 在画布放置时读取拖拽数据
export const readComponentDragData = (event: React.DragEvent | React.DragEvent<HTMLDivElement>) => {
  return event.dataTransfer?.getData(COMPONENT_MIME) ?? event.dataTransfer?.getData("text/plain") ?? "";
};
