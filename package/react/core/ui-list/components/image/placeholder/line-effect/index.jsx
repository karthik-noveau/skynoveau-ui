import styles from "./placeholder.module.css";

export const LineEffect = ({ width = "200px" }) => {
  return (
    <div
      style={{ "--line-width": width }}
      className={`${styles.placeholderWrapper}`}
    >
      <div className={`${styles.placeholderContainer}`}>
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
