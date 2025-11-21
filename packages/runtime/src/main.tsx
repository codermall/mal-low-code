import React from "react";
import ReactDOM from "react-dom/client";
import { Renderer } from "./Renderer";
import { sampleSchema } from "./sampleSchema";

// 独立运行时示例入口，方便本地预览 H5 渲染效果
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div
      style={{
        width: 414,
        margin: "0 auto",
        padding: 24,
        background: "#f8fafc",
        minHeight: "100vh"
      }}
    >
      <Renderer schema={sampleSchema} />
    </div>
  </React.StrictMode>
);
