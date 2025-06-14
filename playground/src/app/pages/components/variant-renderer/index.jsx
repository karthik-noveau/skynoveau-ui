import React from "react";
import { CiShare1 } from "react-icons/ci";
import { useLocation } from "react-router-dom";

import styles from "./variant.module.css";
import { CopyCode } from "./copy-code";

export const VariantRenderer = ({ data }) => {
  const location = useLocation();

  return (
    <div className={`${styles.variantRendererWrapper}`}>
      {/* ---------- header ---------- */}
      <div className={`${styles.header}`}>
        <div className={`text-18 weight-400 ${styles.leftSection}`}>
          {data.name}

          <div
            className={`text-14 ${styles.newTabContainer}`}
            onClick={() => {
              const previewUrl = `${location.pathname}${data.path}/preview`;
              window.open(previewUrl, "_blank");
            }}
          >
            <CiShare1 className={`${styles.newTabIcon}`} />
          </div>
        </div>
        {data?.description && (
          <div className={`text-14 ${styles.variantDescription}`}>
            {data.description}
          </div>
        )}
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

        {/* ---------- usage code ---------- */}
        <div className={`text-18 weight-400 ${styles.codeSection}`}>
          <div className={`text-18 weight-400 ${styles.lineContainer}`}>
            <div className={`text-12 ${styles.title}`}>Code</div>
            <div className={`${styles.line}`} />
          </div>
          <div className={`${styles.codeCopyContainer}`}>
            <CopyCode text={data.componentName} />
            <CopyCode text={`<${data.componentName}/>`} />
          </div>
        </div>
      </div>
    </div>
  );
};
