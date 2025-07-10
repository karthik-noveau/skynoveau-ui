import React from "react";
import { CiShare1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";

import { getPath } from "../utils";

import styles from "./variant.module.css";

export const VariantRenderer = ({ data }) => {
  const location = useLocation();

  return (
    <div className={styles.variantRendererWrapper}>
      <div className={styles.frame}>
        {/* ---------- header ---------- */}
        <div className={styles.header}>
          <div className={`text-16 weight-400 ${styles.section}`}>
            {data.label}
          </div>

          <div className={`text-16 weight-400 ${styles.section}`}>
            {/* <CopyCode text={`${data.name}`} /> */}
            <div
              className={`text-14 ${styles.newTabContainer}`}
              onClick={() => {
                const previewUrl = `${location.pathname}/${getPath(
                  data.label
                )}/preview`;
                window.open(previewUrl, "_blank");
              }}
            >
              <CiShare1 className={styles.newTabIcon} />
            </div>
          </div>
        </div>

        {/* ---------- component render ---------- */}

        <div className={styles.frameContainer}>
          <data.Component />
        </div>
      </div>
    </div>
  );
};
