import React from "react";

import { Loader as BaseLoader } from "@components/loader/basic";
import { LOADER_SIZE } from "@components/loader/constant";

import styles from "./compact.module.css";

export const Loader = ({
  size = LOADER_SIZE.MEDIUM,
  showText = true,
  transparent = true,
  color = "var(--black-color)",
}) => {
  return (
    <div className={`${styles.loaderContainer}`}>
      <BaseLoader
        size={size}
        transparent={transparent}
        showText={showText}
        color={color}
      />
    </div>
  );
};
