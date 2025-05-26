import React from "react";
import { Link } from "react-router-dom";

import styles from "./block.module.css";
import { ProductCompareSlider } from "./vertical-move-slider";

export const TextImageBlock = ({ className }) => {
  return (
    <div className={`wrapper wrapper-padding ${styles.blockWrapper}`}>
      <div className={`container ${styles.blockContainer}`}>
        {/* ---------- left section ---------- */}
        <div className={` ${styles.leftBlock}`}>
          <h2 className={`text-30 weight-300`} id={`sui-aos`}>
            Our Unique Design
          </h2>
          <p
            className={`text-20 weight-300 ${styles.infoText1}`}
            id={`sui-aos`}
          >
            Best Collection name
          </p>
          <p className={`text-16 ${styles.infoText2}`} id={`sui-aos`}>
            Some text about special collection name name name name
          </p>
          <Link
            to="/collections"
            className={`text-14 ${styles.button}`}
            id={`sui-aos`}
          >
            Shop now
          </Link>
        </div>

        {/* ---------- right section ---------- */}
        <div className={`${styles.rightBlock}`}>
          <ProductCompareSlider className={styles.rightBlock} />
        </div>
      </div>
    </div>
  );
};
