import React, { useEffect, useState } from "react";

import { Image } from "package/react/src/components/image";

import styles from "./banner.style.module.css";
import useWindowWidth from "@hooks";
import { LineEffect } from "package/react/src/components/image/placeholder/line-effect";

export const PageBanner = ({
  imageSrc,
  alt = "",
  customContent,
  content,
  brightness = "80%",
  height = "65vh",
  className,
}) => {
  const [imgSrc, setImgSrc] = useState();
  const [imageLoading, setImageLoading] = useState(true);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 425) {
      setImgSrc(imageSrc["mobile"] || imageSrc);
    } else {
      setImgSrc(imageSrc["web"] || imageSrc);
    }
  }, [imageSrc, windowWidth]);

  const onImageLoaded = (flag) => {
    if (flag) {
      setImageLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div
        style={{ "--banner-height": height, "--banner-brightness": brightness }}
        className={`${styles.bannerWrapper} ${className}`}
      >
        <Image
          imageSrc={imgSrc}
          alt={alt}
          placeholder={<LineEffect />}
          onImageLoaded={onImageLoaded}
          className={styles.image}
        />

        {!imageLoading && (
          <>
            {/* -------------- custom content --------------- */}
            {customContent && customContent()}

            {/* -------------- content --------------- */}
            {content && (
              <h1 className={`text-44 title weight-100 ${styles.contentName}`}>
                {content}
              </h1>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};
