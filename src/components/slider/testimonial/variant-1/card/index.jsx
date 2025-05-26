import React from "react";

import { StarRating } from "../star-rating";

import styles from "./card.module.css";

export const TestimonialCard = ({ data }) => {
  return (
    <div className={`${styles.cardContainer}`}>
      <p className={`text-18 weight-400 ${styles.title}`}>{data.name}</p>
      <StarRating />
      <p className={`text-14 ${styles.description}`}>{data.description}</p>
    </div>
  );
};
