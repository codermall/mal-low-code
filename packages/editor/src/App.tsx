import { Palette } from "./components/Palette";
import { Canvas } from "./components/Canvas";
import { Inspector } from "./components/Inspector";
import { useEditorState } from "./core/useEditorStore";
import { editorController } from "./core/editorController";

// 编辑器主框架：左中右三栏布局
export const App = () => {
  const state = useEditorState();
  const selectedNode = state.selectedId ? editorController.findNode(state.selectedId) : undefined;

  return (
    <div className="editor-shell">
      <Palette />
      <Canvas
        schema={state.schema}
        onDropComponent={(type) => editorController.addComponent(type)}
        onSelectNode={(id) => editorController.selectNode(id)}
      />
      <Inspector
        node={selectedNode}
        onChange={(patch) => {
          if (!state.selectedId) return;
          editorController.updateNodeProps(state.selectedId, patch);
        }}
      />
    </div>
  );
};
