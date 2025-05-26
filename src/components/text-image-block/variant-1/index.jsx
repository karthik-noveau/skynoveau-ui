import React from "react";
import { Link } from "react-router-dom";

import styles from "./block.module.css";
import { ProductCompareSlider } from "@app/pages/home/vertical-move-slider";

import newImage from "@assets/home/best-collections/best-collection-01.jpg";
import oldImage from "@assets/home/best-collections/best-collection-02.jpg";

export const TextImageBlock = ({ className }) => {
  return (
    <div className={`wrapper wrapper-padding ${styles.blockWrapper}`}>
      <div className={`container ${styles.blockContainer}`}>
        {/* ---------- left section ---------- */}
        <div className={` ${styles.leftBlock}`}>
          <h2 className={`text-30 title`} id={`sui-aos`}>
            DIWALI COLLECTIONS
          </h2>
          <p className={`text-20 ${styles.infoText1}`} id={`sui-aos`}>
            Diwali Dazzle with Dhanika Sarees
          </p>
          <p
            className={`text-18 weight-300 ${styles.infoText2}`}
            id={`sui-aos`}
          >
            Shine bright this Diwali in style with our classic to contemporary
            sarees
          </p>
          <Link
            to="/collections"
            className={`text-16 ${styles.button}`}
            id={`sui-aos`}
          >
            Shop now
          </Link>
        </div>

        {/* ---------- right section ---------- */}
        <div className={`${styles.rightBlock}`}>
          <ProductCompareSlider
            newImageSrc={newImage}
            oldImageSrc={oldImage}
            className={styles.rightBlock}
          />
        </div>
      </div>
    </div>
  );
};
