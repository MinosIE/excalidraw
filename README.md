# Docs

页面左上角菜单调用链路：

App.tsx -> AppMainMenu.tsx -> MainMenu.tsx -> DefaultItems.tsx

保存为文件调用链路：

excalidraw-app/App.tsx -> packages/excalidraw/index.tsx -> packages/excalidraw/components/App.tsx -> LayerUI.tsx -> JSONExportDialog.tsx -> manager.tsx --> executeGetJsonAction()
