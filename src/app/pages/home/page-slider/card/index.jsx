import React from "react";

import { Image } from "@components/image";
import { LineEffect } from "@components/image/placeholder/line-effect";

import styles from "./card.module.css";

export const Card = ({ path, imageSrc, aspectRatio, alt, className }) => {
  return (
    <div
      to={path}
      style={{ "--aspect-ratio": aspectRatio }}
      className={`${styles.cardContainer} ${className}`}
      id={`sui-aos`}
    >
      <Image
        imageSrc={imageSrc}
        alt={alt}
        className={styles.image}
        placeholder={<LineEffect />}
        borderRadius="0"
      />
    </div>
  );
};
