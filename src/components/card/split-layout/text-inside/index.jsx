import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";

import { AOS_ANIMATION } from "@components/aos-animation";

import styles from "./card.module.css";

import Product_1 from "@skynoveau-ui/assets/card/default/product-1.jpg";
import Product_2 from "@skynoveau-ui/assets/card/default/product-2.jpg";

export const CardComponent = ({ DATA = FALLBACK_DATA }) => {
  return (
    <div
      className={`container container-margin-top ${styles.productContainer}`}
    >
      {DATA.map((item) => {
        return (
          <Link to={item.path}>
            <div
              className={styles.productCard}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              <div className={styles.imgContainer}>
                <img src={item.image} alt="unisys product" />
                <div
                  className={styles.textContainer}
                  data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                  data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                >
                  <p className="text-18">{item.name}</p>
                  <IoMdArrowForward className={styles.icon} />
                </div>
              </div>
              <div
                className={`text-20 weight-500 ${styles.shortInfo}`}
                data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
              >
                {item.shortInfo}
              </div>
              <div
                className="text-16"
                data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
              >
                {item.description}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const FALLBACK_DATA = [
  {
    image: Product_1,
    name: "CIMATRON",
    shortInfo: "CAD/CAM for Tooling with Unrivaled Productivity",
    description:
      "Cimatron CAD/CAM for Tooling solutions is one of the most productive in the market increasing design and manufacturing efficiency on the cutting edge level.",
    path: "/products/cimatron",
  },
  {
    image: Product_2,
    name: "ARES COMMANDER",
    shortInfo: "2D & 3D CAD Software for DWG editing",
    description:
      "ARES Commander is making no compromises in 2D/3D CAD features and is fully installed on your computers",
    path: "/products/ares-commander",
  },
];
