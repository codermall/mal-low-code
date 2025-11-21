# 低代码平台架构分析

> 版本：v0.1.0  
> 更新日期：2025-11-20

## 1. 总览
本仓库基于 `pnpm workspace` 管理四个核心子包：编辑器、运行态、组件库与数据中心。通过统一的 TypeScript 配置与共享依赖，实现微前端级别的模块解耦。整体目标是服务企业建站与 H5 活动页场景，让拖拽搭建、属性配置、渲染发布形成闭环。

```
┌─────────────────────────────────────────┐
│ pnpm Workspace                          │
│ ┌─────────────┬─────────────┬─────────┐ │
│ │ @lowcode/   │ @lowcode/   │ @lowcode│ │
│ │ editor      │ runtime     │ /components│
│ └─────────────┴─────────────┴─────────┘ │
│                 │                         │
│            @lowcode/data-center           │
└─────────────────────────────────────────┘
```

## 2. 模块职责

| 模块 | 主要职责 | 关键技术 |
| ---- | -------- | -------- |
| `@lowcode/editor` | 拖拽画布、Palette、Inspector，负责生成/编辑页面 Schema | React + Vite + useSyncExternalStore |
| `@lowcode/runtime` | 根据 Schema 渲染真实 DOM，可独立部署到生产站点 | React Renderer + Vite |
| `@lowcode/components` | 业务组件注册中心，提供默认属性与属性 Schema，供编辑器面板与运行时共享 | React + TypeScript |
| `@lowcode/data-center` | 统一的状态管理（Schema、选中节点），提供事件订阅机制 | 纯 TS，面向 Editor/Runtime |

## 3. 核心流程

1. **组件注册**：在组件库内定义组件实现 + `ComponentDefinition`，并登记到 `componentRegistry`。  
2. **编辑器拖拽**：`Palette` 读取注册表渲染列表，拖入 `Canvas` 时调用 `editorController.addComponent`，由 `EditorDataCenter` 生成节点。  
3. **渲染预览**：`Canvas` 直接嵌入 `@lowcode/runtime` 的 `Renderer`，实时消费 DataCenter 中的 schema。  
4. **属性配置**：`Inspector` 根据 `propertySchema` 动态渲染表单，并回写到 `EditorDataCenter.updateNodeProps`。  
5. **发布运行**：编辑器导出的 schema 可以交给 `@lowcode/runtime` 独立渲染（或服务端持久化后在 H5 页加载）。

![流程图](https://dummyimage.com/600x160/e2e8f0/475569&text=Palette+%E2%86%92+DataCenter+%E2%86%92+Renderer)

## 4. 扩展点

- **多终端支持**：可继续扩展组件库，使其同时适配 PC/H5，通过 `componentRegistry` 中的 `icon`/`description` 显示差异信息。  
- **协作/版本管理**：`EditorDataCenter` 已抽象 subscribe/clone 能力，接入历史记录、多人协作或服务端同步只需在该层扩展。  
- **物料市场**：可新增 `@lowcode/material-market` 包，向组件库动态注入组件定义，实现插件化。  
- **发布系统**：在 runtime 侧加上数据绑定/接口请求能力，即可承载企业内容运营场景。

## 5. 工程能力

- 脚本：`pnpm lint/test/build` 均作用于 workspace，保障多包一致性。  
- 测试：采用 Vitest + Testing Library 覆盖渲染器、组件库与数据中心的关键路径。  
- 文档：README 提供架构图与启动说明；本分析文档用于对外分享整体设计。

## 6. 后续建议

1. 接入 `zustand`/`redux-undo` 等库，在 DataCenter 之上实现撤销/重做。  
2. 完成 schema 的导入导出 API，便于落地页发布环节。  
3. 增加服务端接口（如 `@lowcode/api`），实现组件数据绑定与实时预览。
