import type { ComponentRenderProps } from "../types";

// 按钮组件支持多种外观与跳转配置
export interface ActionButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
}

// 预设的主题色，便于统一品牌样式
const variantStyles: Record<string, string> = {
  primary: "#2563eb",
  secondary: "#10b981",
  ghost: "transparent"
};

// CTA 按钮：既可在运行态触发 onClick，也能跳转链接
export const ActionButton = ({ props, style, onClick }: ComponentRenderProps<ActionButtonProps>) => {
  const { label, variant = "primary", href } = props;
  const background = variant === "ghost" ? "transparent" : variantStyles[variant];
  const color = variant === "ghost" ? "#0f172a" : "#fff";

  const content = (
    <button
      style={{
        padding: "10px 16px",
        borderRadius: 8,
        border: variant === "ghost" ? "1px solid #cbd5f5" : "none",
        background,
        color,
        fontWeight: 600,
        cursor: "pointer",
        ...style
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }

  return content;
};
