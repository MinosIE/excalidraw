import clsx from "clsx";

import {
  CANVAS_SEARCH_TAB,
  DEFAULT_SIDEBAR,
  composeEventHandlers,
  LIBRARY_SIDEBAR_TYPE,
} from "@excalidraw/common";

import type { MarkOptional, Merge } from "@excalidraw/common/utility-types";

import { useTunnels } from "../context/tunnels";
import { useUIAppState } from "../context/ui-appState";

import "../components/dropdownMenu/DropdownMenu.scss";

import { useExcalidrawSetAppState } from "./App";
import { Sidebar } from "./Sidebar/Sidebar";
import { withInternalFallback } from "./hoc/withInternalFallback";

import type { SidebarProps, SidebarTriggerProps } from "./Sidebar/common";

const DefaultSidebarTrigger = withInternalFallback(
  "DefaultSidebarTrigger",
  (
    props: Omit<SidebarTriggerProps, "name"> &
      React.HTMLAttributes<HTMLDivElement>,
  ) => {
    const { DefaultSidebarTriggerTunnel } = useTunnels();
    return (
      <DefaultSidebarTriggerTunnel.In>
        <Sidebar.Trigger
          {...props}
          className="default-sidebar-trigger"
          name={DEFAULT_SIDEBAR.name}
        />
      </DefaultSidebarTriggerTunnel.In>
    );
  },
);
DefaultSidebarTrigger.displayName = "DefaultSidebarTrigger";

const DefaultTabTriggers = ({ children }: { children: React.ReactNode }) => {
  const { DefaultSidebarTabTriggersTunnel } = useTunnels();
  return (
    <DefaultSidebarTabTriggersTunnel.In>
      {children}
    </DefaultSidebarTabTriggersTunnel.In>
  );
};
DefaultTabTriggers.displayName = "DefaultTabTriggers";

export const DefaultSidebar = Object.assign(
  withInternalFallback(
    "DefaultSidebar",
    ({
      children,
      className,
      onDock,
      docked,
      ...rest
    }: Merge<
      MarkOptional<Omit<SidebarProps, "name">, "children">,
      {
        /** pass `false` to disable docking */
        onDock?: SidebarProps["onDock"] | false;
      }
    >) => {
      const appState = useUIAppState();
      const setAppState = useExcalidrawSetAppState();

      const { DefaultSidebarTabTriggersTunnel } = useTunnels();

      const isForceDocked = appState.openSidebar?.tab === CANVAS_SEARCH_TAB;

      return (
        <Sidebar
          {...rest}
          name="default"
          key="default"
          className={clsx("default-sidebar", className)}
          docked={
            isForceDocked || (docked ?? appState.defaultSidebarDockedPreference)
          }
          onDock={
            // `onDock=false` disables docking.
            // if `docked` passed, but no onDock passed, disable manual docking.
            isForceDocked || onDock === false || (!onDock && docked != null)
              ? undefined
              : // compose to allow the host app to listen on default behavior
                composeEventHandlers(onDock, (docked) => {
                  setAppState({ defaultSidebarDockedPreference: docked });
                })
          }
        >
          <Sidebar.Tabs>
            <Sidebar.Header>
              <Sidebar.TabTriggers>
                <Sidebar.TabTrigger tab={LIBRARY_SIDEBAR_TYPE.dog}>
                  气球狗
                </Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab={LIBRARY_SIDEBAR_TYPE.ai}>
                  AI
                </Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab={LIBRARY_SIDEBAR_TYPE.local}>
                  本地
                </Sidebar.TabTrigger>
                <DefaultSidebarTabTriggersTunnel.Out />
              </Sidebar.TabTriggers>
            </Sidebar.Header>
            <Sidebar.Tab tab={LIBRARY_SIDEBAR_TYPE.dog}>气球狗图库</Sidebar.Tab>
            <Sidebar.Tab tab={LIBRARY_SIDEBAR_TYPE.ai}>AI图库</Sidebar.Tab>
            <Sidebar.Tab tab={LIBRARY_SIDEBAR_TYPE.local}>本地图库</Sidebar.Tab>
            {children}
          </Sidebar.Tabs>
        </Sidebar>
      );
    },
  ),
  {
    Trigger: DefaultSidebarTrigger,
    TabTriggers: DefaultTabTriggers,
  },
);
