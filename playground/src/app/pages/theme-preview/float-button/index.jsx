import React from "react";
import { Tooltip } from "antd";
import { ImFontSize } from "react-icons/im";
import { RxFontFamily } from "react-icons/rx";
import { useShallow } from "zustand/react/shallow";

import { useUiBuilderStore } from "@skynoveau-ui/store/ui.builder.store";

import styles from "./style.module.css";

const DATA = [
  {
    icon: (className) => <ImFontSize className={className} />,
    id: "show-font-size",
  },
  {
    icon: (className) => <RxFontFamily className={className} />,
    id: "change-font-styles",
  },
];

export const FloatButton = () => {
  const { showFontSize, changeFontFamily } = useUiBuilderStore(
    useShallow((state) => ({
      changeFontFamily: state.changeFontFamily,
      showFontSize: state.showFontSize,
    }))
  );

  const ToolTipContent = (id) => {
    if (id === "show-font-size") {
      if (showFontSize) {
        return (
          <p className={`text-14 ${styles.toolTipContent}`}>Hide Font Size</p>
        );
      } else {
        return (
          <p className={`text-14 ${styles.toolTipContent}`}>Show Font Size</p>
        );
      }
    }

    if (id === "change-font-styles") {
      if (changeFontFamily) {
        return (
          <p className={`text-14 ${styles.toolTipContent}`}>
            Change to Default Font
          </p>
        );
      } else {
        return (
          <p className={`text-14 ${styles.toolTipContent}`}>
            Change to Custom Font
          </p>
        );
      }
    }
  };

  return (
    <div className={`${styles.floatButtonWrapper}`}>
      {DATA.map((item) => {
        return (
          <Tooltip title={() => ToolTipContent(item.id)} placement="left">
            <div
              className={`${styles.button}`}
              onClick={() => {
                if (item.id === "show-font-size") {
                  useUiBuilderStore.getState().setShowFontSize();
                } else {
                  useUiBuilderStore.getState().setChangeFontFamily();
                }
              }}
            >
              {item.icon(styles.icon)}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
