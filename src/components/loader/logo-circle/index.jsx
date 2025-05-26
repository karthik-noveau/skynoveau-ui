import { ImageLazyLoader } from "@common/lazy-loader/image";

import Logo from "@assets/logo/primary/logo.png";

import styles from "./loader.module.css";

export const Loader = ({ className }) => {
  return (
    <div className={`${styles.loaderWrapper} ${className}`}>
      <div className={styles.circle}></div>
      <div className={styles.imageContainer}>
        <ImageLazyLoader image={Logo} />
        <p>The Making Wonders</p>
      </div>
    </div>
  );
};
