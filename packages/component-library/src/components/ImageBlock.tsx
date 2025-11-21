import type { ComponentRenderProps } from "../types";

// 图片组件支持圆角/高度调节，满足落地页常见需求
export interface ImageBlockProps {
  src: string;
  alt?: string;
  radius?: number;
  height?: number;
}

// 图片块在运行时由 <img> 渲染，保持铺满父容器
export const ImageBlock = ({ props, style, onClick }: ComponentRenderProps<ImageBlockProps>) => {
  const { src, alt = "image", radius = 12, height = 200 } = props;
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: "100%",
        height,
        objectFit: "cover",
        borderRadius: radius,
        display: "block",
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
      onClick={onClick}
    />
  );
};
