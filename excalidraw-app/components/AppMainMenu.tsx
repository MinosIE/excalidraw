import { MainMenu } from "@excalidraw/excalidraw/index";
import React from "react";

import {
  useApp,
  useExcalidrawActionManager,
  useExcalidrawAppState,
} from "@excalidraw/excalidraw/components/App";

import type { Theme } from "@excalidraw/element/types";

import { getExportCanvas } from "../../packages/excalidraw/data";

export const AppMainMenu: React.FC<{
  onCollabDialogOpen: () => any;
  isCollaborating: boolean;
  isCollabEnabled: boolean;
  theme: Theme | "system";
  setTheme: (theme: Theme | "system") => void;
  refresh: () => void;
}> = React.memo((props) => {
  const app = useApp();
  const actionManager = useExcalidrawActionManager();
  const elements = app.scene.getNonDeletedElements();
  const appState = useExcalidrawAppState();
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveToActiveFile />
      <MainMenu.DefaultItems.Export
        onSelect={() => {
          // 1. 上传画布截图
          // 2. 提交画布数据

          if (!elements.length) {
            console.log("No elements to export");
            return;
          }
          const json = actionManager.executeGetJsonAction();
          console.log("export openDialog", json);
        }}
      />
      <MainMenu.DefaultItems.SaveAsImage
        onSelect={async () => {
          const blob = await getExportCanvas(
            elements as any,
            appState,
            app.files,
            {
              exportBackground: false,
              viewBackgroundColor: "transparent",
            },
          );
          console.log("SaveAsImage", blob);
        }}
      />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme
        allowSystemTheme
        theme={props.theme}
        onSelect={props.setTheme}
      />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
});
