import type { ComponentNode, EditorDataCenter } from "@lowcode/data-center";
import { useEffect, useState } from "react";

// 运行时订阅 DataCenter 的 schema，并自动触发重渲染
export const useRuntimeSchema = (dataCenter: EditorDataCenter) => {
  const [schema, setSchema] = useState<ComponentNode[]>(() => dataCenter.getState().schema);

  useEffect(() => {
    const unsubscribe = dataCenter.subscribe<ComponentNode[]>("schema:change", (next) => {
      setSchema(Array.isArray(next) ? next : dataCenter.getState().schema);
    });
    return () => unsubscribe();
  }, [dataCenter]);

  return schema;
};
