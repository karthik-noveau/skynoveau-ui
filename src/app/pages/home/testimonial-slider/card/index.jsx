import React from "react";

import { StarRating } from "@app/pages/home/star-rating";

import styles from "./card.module.css";

export const TestimonialCard = ({ data }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      <p className={`text-18 weight-400 ${styles.title}`}>{data.name}</p>
      <StarRating />
      <p className={`text-16 weight-400 ${styles.description}`}>
        {data.description}
      </p>
    </div>
  );
};
