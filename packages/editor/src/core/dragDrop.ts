import type React from "react";

export const COMPONENT_MIME = "application/x-lowcode-component";

export const beginComponentDrag = (event: React.DragEvent, componentType: string) => {
  if (!event.dataTransfer) {
    return;
  }
  event.dataTransfer.setData(COMPONENT_MIME, componentType);
  event.dataTransfer.setData("text/plain", componentType);
  event.dataTransfer.effectAllowed = "copy";
};

export const readComponentDragData = (event: React.DragEvent | React.DragEvent<HTMLDivElement>) => {
  return event.dataTransfer?.getData(COMPONENT_MIME) ?? event.dataTransfer?.getData("text/plain") ?? "";
};
