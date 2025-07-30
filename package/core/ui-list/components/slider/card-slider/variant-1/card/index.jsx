import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";

export const Card = ({ path, image, alt, title, description, className }) => {
  return (
    <Link
      to={path}
      className={`${styles.cardContainer} ${className}`}
      id={`sui-aos`}
    >
      <div className={` ${styles.imgWrapper}`}>
        <img src={image} alt={alt} />
        <div className={`text-14 ${styles.viewButton}`}>
          <p>View Product</p>
        </div>
      </div>
      <div className={`${styles.bottomSection}`}>
        <p className={`text-16 ellipsis-2`}>{title}</p>
        <p className={`text-14 default-font weight-400`}>₹ {description}</p>
      </div>
    </Link>
  );
};
