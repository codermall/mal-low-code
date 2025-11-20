import type { ComponentRenderProps } from "../types";

export interface ImageBlockProps {
  src: string;
  alt?: string;
  radius?: number;
  height?: number;
}

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
