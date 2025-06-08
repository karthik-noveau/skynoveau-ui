import React from "react";
import { VscShare } from "react-icons/vsc";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "./variant.module.css";

export const VariantRenderer = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${styles.variantRendererWrapper}`}>
      {/* ---------- header ---------- */}
      <div className={`${styles.header}`}>
        <div className={`text-18 weight-400 ${styles.leftSection}`}>
          {data.name}
        </div>
        <div className={`${styles.rightSection}`}>
          <div
            className={`text-14 ${styles.newTab}`}
            onClick={() => {
              navigate(`${location.pathname}${data.path}/preview`);
            }}
          >
            <span>Open in new tab</span>
            <VscShare className={`${styles.icon}`} />
          </div>
        </div>
      </div>

      {/* ---------- frame ---------- */}
      <div className={`${styles.frame}`}>
        <div className={`${styles.frameWrapper}`}>
          <div className={`${styles.frameContainer}`}>
            <data.component
              {...(data?.className && {
                className: data.className,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
