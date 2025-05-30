import React from "react";
import styles from "./maintenance.module.css";

import videoWeb from "@skynoveau-ui/assets/banner/maintenance/videos/maintenance-web.mp4";
import videoMobile from "@skynoveau-ui/assets/banner/maintenance/videos/maintenance-mobile.mp4";

const fallbackVideos = {
  web: {
    src: videoWeb,
    alt: "skynoveau-maintenance",
  },
  mobile: {
    src: videoMobile,
    alt: "skynoveau-maintenance",
  },
};

export const Maintenance = ({ className, videos = fallbackVideos }) => {
  return (
    <>
      {/* Video for desktop */}
      <video
        className={`${styles.video} ${styles.videoDesktop} ${className}`}
        autoPlay
        muted
        loop
      >
        <source src={videos["web"].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video for mobile */}
      <video
        className={`${styles.video} ${styles.videoMobile} ${className}`}
        autoPlay
        muted
        loop
      >
        <source src={videos["mobile"].src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};
