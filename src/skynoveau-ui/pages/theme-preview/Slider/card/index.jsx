import React from "react";

import { StarRating } from "../star-rating";

import { SizeView } from "../../view";

import styles from "./card.module.css";

export const TestimonialCard = ({ data, showFontSize }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      <p className={`text-18 weight-400 ${styles.title}`}>
        {data.name} <SizeView show={showFontSize} name={"title-18"} />
      </p>
      <StarRating />
      <p className={`text-14 ${styles.description}`}>{data.description}</p>
      <SizeView show={showFontSize} name={"title-14"} />
    </div>
  );
};
