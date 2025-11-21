import { ActionButton, type ActionButtonProps } from "./components/ActionButton";
import { ImageBlock, type ImageBlockProps } from "./components/ImageBlock";
import { TextBlock, type TextBlockProps } from "./components/TextBlock";
import type { ComponentDefinition, ComponentRegistry } from "./types";

// 文本组件的注册信息：默认值 + 属性 schema
const textDefinition: ComponentDefinition<TextBlockProps> = {
  type: "text",
  displayName: "文本",
  description: "展示基础富文本内容，可配置颜色与对齐方式",
  component: TextBlock,
  defaultProps: {
    text: "双击编辑内容",
    align: "left",
    fontSize: 18,
    color: "#0f172a"
  },
  propertySchema: [
    { key: "text", label: "文本内容", type: "string" },
    { key: "align", label: "对齐", type: "string" },
    { key: "fontSize", label: "字号", type: "number" },
    { key: "color", label: "颜色", type: "color" }
  ]
};

// 按钮组件注册信息
const buttonDefinition: ComponentDefinition<ActionButtonProps> = {
  type: "button",
  displayName: "按钮",
  description: "用于跳转或触发事件的 CTA 按钮",
  component: ActionButton,
  defaultProps: {
    label: "立即咨询",
    variant: "primary"
  },
  propertySchema: [
    { key: "label", label: "文案", type: "string" },
    { key: "variant", label: "样式", type: "string" },
    { key: "href", label: "跳转链接", type: "string" }
  ]
};

// 图片组件注册信息
const imageDefinition: ComponentDefinition<ImageBlockProps> = {
  type: "image",
  displayName: "图片",
  description: "支持圆角与高度的基础图片组件",
  component: ImageBlock,
  defaultProps: {
    src: "https://placehold.co/600x400",
    radius: 12,
    height: 260
  },
  propertySchema: [
    { key: "src", label: "图片地址", type: "image" },
    { key: "alt", label: "替换文本", type: "string" },
    { key: "radius", label: "圆角", type: "number" },
    { key: "height", label: "高度", type: "number" }
  ]
};

// 以组件类型为 key 形成可查找的注册表
export const componentRegistry: ComponentRegistry = {
  text: textDefinition,
  button: buttonDefinition,
  image: imageDefinition
};

// 供编辑器 Palette 直接使用的扁平数组
export const componentList: ComponentDefinition[] = Object.values(componentRegistry);
