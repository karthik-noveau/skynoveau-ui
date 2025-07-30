import React, { ReactNode, useState } from "react";

import { Image } from "../image";
import { LineEffect } from "../image/placeholder/line-effect";

import styles from "./styles.module.css";

export interface PageBannerProps {
  title: string;
  description?: string;
  content?: ReactNode;
  brightness?: string;
  height?: string;
  children?: ReactNode;
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  description,
  height = "60vh",
  brightness = "70%",
  children,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className={styles.bannerContainer}>
      <Image
        style={{ filter: `brightness(${brightness})`, height: height }}
        hoverScale={false}
        imgSrc="https://lexlumiere.com/static/media/contact-banner-img.b6d8d845066f59b03577.jpg"
        placeholder={<LineEffect width="250px" />}
        onImageLoaded={(flag) => setImageLoaded(flag)}
      />

      {imageLoaded && (
        <div className={styles.contentWrapper}>
          <div className={styles.contentContainer}>
            {title && <h1 className={`title-44 ${styles.title}`}>{title}</h1>}
            {description && (
              <p className={`text-16 weight-300 ${styles.description}`}>
                {description}
              </p>
            )}

            {children && children}
          </div>
        </div>
      )}
    </div>
  );
};

export default PageBanner;
