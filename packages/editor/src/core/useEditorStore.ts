import { useSyncExternalStore } from "react";
import type { EditorState } from "@lowcode/data-center";
import { editorController } from "./editorController";

const dataCenter = editorController.getDataCenter();

// 基于 useSyncExternalStore 订阅 schema/selection，保证 React 兼容性
export const useEditorState = (): EditorState =>
  useSyncExternalStore(
    (listener) => {
      const unsubscribeSchema = dataCenter.subscribe("schema:change", () => listener());
      const unsubscribeSelection = dataCenter.subscribe("selection:change", () => listener());
      return () => {
        unsubscribeSchema();
        unsubscribeSelection();
      };
    },
    () => dataCenter.getState()
  );
