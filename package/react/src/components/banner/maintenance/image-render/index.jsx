import React from "react";
import styles from "./maintenance.module.css";

import imageWeb from "@skynoveau-ui/assets/banner/maintenance/images/maintenance-web.gif";
import imageMobile from "@skynoveau-ui/assets/banner/maintenance/images/maintenance-web.gif";

const fallbackImages = {
  web: {
    src: imageWeb,
    alt: "skynoveau-maintenance",
  },
  mobile: {
    src: imageMobile,
    alt: "skynoveau-maintenance",
  },
};

export const Maintenance = ({ className, images = fallbackImages }) => {
  return (
    <>
      <img
        src={images["web"].src}
        alt="Maintenance"
        className={`${styles.image} ${styles.imageMobile} ${className}`}
      />
      <img
        src={images["mobile"].src}
        alt="Maintenance"
        className={`${styles.image} ${styles.imageDesktop} ${className}`}
      />
    </>
  );
};
