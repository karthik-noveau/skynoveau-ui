import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";

export const Card = ({ image, alt, title, id }) => {
  return (
    <Link
      className={`${styles.cardContainer}`}
      to="/collections"
      id={`sui-aos`}
    >
      <img src={image} alt={alt} />
      <div className={`${styles.bottomSection}`}>
        <p className={`text-16 weight-200`} id={`sui-aos`}>
          {title}
        </p>
      </div>
    </Link>
  );
};
  