import React from "react";
import { LOADER_SIZE } from "./constant";
import styles from "./loader.module.css";

type LoaderProps = {
  size?: keyof typeof LOADER_SIZE;
  showText?: boolean;
  loading?: boolean;
  transparent?: boolean;
  color?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  size = "SMALL",
  showText = true,
  transparent = true,
  loading = true,
  color = "var(--black-color)",
}) => {
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: transparent ? "transparent" : "var(--white-color)",
        }}
        className={styles.loaderContainer}
      >
        <div
          style={{ color }}
          className={`${styles.circle} ${size === "BASE" ? styles.base : ""} ${
            size === "MEDIUM" ? styles.medium : ""
          } ${size === "SMALL" ? styles.small : ""} ${
            size === "TINY" ? styles.tiny : ""
          }`}
        />
        {showText && <p>Loading</p>}
      </div>
    );
  }
  return <></>;
};

export default Loader;
