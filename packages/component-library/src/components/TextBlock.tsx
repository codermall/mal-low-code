import type { ComponentRenderProps } from "../types";

export interface TextBlockProps {
  text: string;
  align?: "left" | "center" | "right";
  color?: string;
  fontSize?: number;
}

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
