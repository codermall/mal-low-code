import type { ComponentNode } from "@lowcode/data-center";

// 供运行时独立演示的默认页面结构
export const sampleSchema: ComponentNode[] = [
  {
    id: "hero-text",
    type: "text",
    props: {
      text: "低代码极速搭建企业营销站点",
      align: "center",
      fontSize: 32,
      color: "#0f172a"
    }
  },
  {
    id: "hero-image",
    type: "image",
    props: {
      src: "https://placehold.co/1200x480",
      height: 320,
      radius: 24
    },
    style: {
      marginTop: 24
    }
  },
  {
    id: "cta",
    type: "button",
    props: {
      label: "预约演示",
      variant: "secondary"
    },
    style: {
      margin: "24px auto",
      display: "flex",
      justifyContent: "center",
      width: "200px"
    }
  }
];
