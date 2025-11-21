import type { ComponentRenderProps } from "../types";

// 文本组件的可配置属性，覆盖常见 CMS 文案展示需求
export interface TextBlockProps {
  text: string;
  align?: "left" | "center" | "right";
  color?: string;
  fontSize?: number;
}

// 基础文本块组件，编辑器与运行时共享
export const TextBlock = ({ props, style, onClick }: ComponentRenderProps<TextBlockProps>) => {
  const { text, align = "left", color = "#1f2933", fontSize = 16 } = props;
  return (
    <div
      style={{
        fontSize,
        color,
        textAlign: align,
        lineHeight: 1.5,
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
