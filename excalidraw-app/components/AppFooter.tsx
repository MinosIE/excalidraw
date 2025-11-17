import { Footer } from "@excalidraw/excalidraw/index";
import React from "react";

export const AppFooter = React.memo(
  ({ onChange }: { onChange: () => void }) => {
    return (
      <Footer>
        <div
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
          }}
        >
          {/* PC 底部右侧 */}
        </div>
      </Footer>
    );
  },
);
