import React from "react";
import { CiShare1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";

import { CopyCode } from "./copy-code";

import styles from "./variant.module.css";

export const VariantRenderer = ({ data }) => {
  const location = useLocation();

  return (
    <div className={styles.variantRendererWrapper}>
      {/* ---------- header ---------- */}
      <div className={styles.header}>
        <div className={`text-18 weight-400 ${styles.leftSection}`}>
          {data.name}
          <div
            className={`text-14 ${styles.newTabContainer}`}
            onClick={() => {
              const previewUrl = `${location.pathname}${data.path}/preview`;
              window.open(previewUrl, "_blank");
            }}
          >
            <CiShare1 className={styles.newTabIcon} />
          </div>
        </div>
        {data?.description && (
          <div className={`text-14 ${styles.variantDescription}`}>
            {data.description}
          </div>
        )}
      </div>

      {/* ---------- component preview ---------- */}
      <div className={styles.frame}>
        <div className={styles.frameWrapper}>
          <div className={styles.frameContainer}>
            <data.Component />
          </div>
        </div>

        {/* ---------- code viewer ---------- */}
        <div className={`text-18 weight-400 ${styles.codeSection}`}>
          <div className={`text-18 weight-400 ${styles.lineContainer}`}>
            {/* <p className={`text-14`}>Controls</p> */}
            <div className={styles.line} />
          </div>
        </div>

        <div className={styles.codeCopyContainer}>
          <CopyCode text={`${data.componentName}`} />
        </div>
      </div>
    </div>
  );
};
