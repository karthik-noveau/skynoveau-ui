import React from "react";
import { Link } from "react-router-dom";

import styles from "./style.module.css";
import { Image } from "@components/image";

export const ProductCard = ({
  path,
  imageSrc,
  alt,
  title,
  price,
  discountPrice,
  className,
  quantity,
}) => {
  return (
    <Link
      to={path}
      className={`${styles.cardContainer} ${className}`}
      id={`sui-aos`}
    >
      <div className={` ${styles.imgWrapper}`}>
        <Image
          imageSrc={imageSrc}
          alt={alt}
          hoverEffect={true}
          className={`${styles.productImage} ${
            quantity === 0 && styles.soldOutImg
          }`}
        />
        {quantity === 0 && (
          <p className={`text-14 weight-400 ${styles.soldOutText}`}>Sold Out</p>
        )}
        <div className={`text-14 weight-300 ${styles.viewButton}`}>
          <p>View Product</p>
        </div>
      </div>

      <div className={`${styles.bottomSection}`}>
        <p className={`text-14 ellipsis ${styles.title}`}>{title}</p>
        <p
          className={`text-14 weight-500 default-font ${styles.priceContainer}`}
        >
          <span
            className={`${styles.price} ${discountPrice && styles.textFade}`}
          >
            ₹ {price}
            {discountPrice ? (
              <span className={`${styles.crossDivider}`}></span>
            ) : null}
          </span>

          {discountPrice ? (
            <>
              <span className={`${styles.discountPrice}`}>
                ₹ {discountPrice}
              </span>
            </>
          ) : null}
        </p>
      </div>
    </Link>
  );
};
