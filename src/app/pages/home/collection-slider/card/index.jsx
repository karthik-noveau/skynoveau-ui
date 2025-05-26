import React from "react";
import { Link } from "react-router-dom";

import { Image } from "@components/image";
import { LineEffect } from "@components/image/placeholder/line-effect";

import styles from "./card.module.css";
import { useEcommerceStore } from "@app/store";

export const Card = ({ imageSrc, alt, title, id, path }) => {
  return (
    <Link
      className={`${styles.cardContainer}`}
      onClick={() => {
        useEcommerceStore
          .getState()
          .setCollectionPageFilter({ searchValue: null });
      }}
      to={path}
      id={`sui-aos`}
    >
      <Image
        imageSrc={imageSrc}
        // zoomEffectOnScroll={true}
        // zoomEffectOnRender={false}
        zoomScale={1.5}
        alt={alt}
        placeholder={<LineEffect width="40%" />}
        className={styles.image}
      />
      <div className={`${styles.bottomSection}`}>
        <p className={`text-18 weight-200`} id={`sui-aos`}>
          {title}
        </p>
      </div>
    </Link>
  );
};
