import React from "react";

import { Loader as BaseLoader } from "package/react/src/components/loader/basic";
import { LOADER_SIZE } from "package/react/src/components/loader/constant";

import styles from "./fullscreen.module.css";

export const FullScreenLoader = ({
  size = LOADER_SIZE.BASE,
  className,
  showText = true,
  loading = true,
  transparent = true,
  color = "var(--black-color)",
}) => {
  return (
    <div
      className={`${styles.fadeOverlay} ${
        loading ? styles.pageFadeIn : styles.pageFadeOut
      }`}
    >
      <div
        className={`${styles.loaderContainer} ${
          loading ? styles.loaderFadeIn : styles.loaderFadeOut
        }`}
      >
        <BaseLoader
          size={size}
          transparent={transparent}
          showText={showText}
          color={color}
          className={className}
        />
      </div>
    </div>
  );
};

export default FullScreenLoader;
