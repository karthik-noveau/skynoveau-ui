import React from "react";

import styles from "./panel.module.css";
import { useNavigate } from "react-router-dom";
import { useEcommerceStore } from "@app/store";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";

export const LeftPanel = ({ tabsList, activeTabId }) => {
  const navigate = useNavigate();
  const { invalidateQuery } = useInvalidateQuery();

  return (
    <div className={`${styles.panelWrapper}`}>
      <div className={`${styles.panelContainer}`}>
        {tabsList.map((item) => {
          return (
            <div
              onClick={() => {
                if (item.id === "logout") {
                  useEcommerceStore.getState().setLogout();
                  invalidateQuery([QUERY_KEYS.cartCount]);
                  navigate("/");
                } else {
                  navigate(`/account/${item.id}`);
                }
              }}
              className={`text-16 weight-400 ${styles.menuContainer} ${
                activeTabId === item.id && styles.active
              }`}
            >
              {
                <item.icon.render
                  style={{ ...item.icon.style }}
                  className={styles.icon}
                />
              }
              {item.tabName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
