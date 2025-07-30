import React from "react";

import styles from "./placeholder.module.css";

export interface LineEffectProps {
  width?: string;
}

export const LineEffect: React.FC<LineEffectProps> = ({ width = "200px" }) => {
  return (
    <div
      style={{ "--line-width": width } as React.CSSProperties}
      className={styles.placeholderWrapper}
    >
      <div className={styles.placeholderContainer}>
        <div className={styles.loading}>
          <div className={styles.loadingLineWrapper}>
            <div className={styles.loadingLine}>
              <div
                className={`${styles.loadingLineInner} ${styles.loadingLineInner_1}`}
              />
              <div
                className={`${styles.loadingLineInner} ${styles.loadingLineInner_2}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
