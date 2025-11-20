import { useSyncExternalStore } from "react";
import type { EditorState } from "@lowcode/data-center";
import { editorController } from "./editorController";

const dataCenter = editorController.getDataCenter();

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
