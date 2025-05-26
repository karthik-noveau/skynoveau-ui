import React from "react";
import { Link } from "react-router-dom";

import styles from "./card.module.css";
import { Image } from "@components/image";

export const Card = ({
  path,
  image,
  quantity,
  title,
  description,
  className,
}) => {
  return (
    <Link to={path} className={`${styles.cardWrapper} ${className}`}>
      <div className={` ${styles.cardContainer}`}>
        <div className={`${styles.imgWrapper}`}>
          <Image imageSrc={image} alt={title} className={styles.productImage} />
          {quantity === 0 && (
            <p className={`text-14 weight-400 ${styles.soldOutText}`}>
              Sold Out
            </p>
          )}
        </div>
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
