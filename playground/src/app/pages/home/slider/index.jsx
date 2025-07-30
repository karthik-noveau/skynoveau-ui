import React from "react";
import { Image } from "@skynoveau-ui/core";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./style.module.css";

export const TechStackSlide = ({ items }) => {
  return (
    <div className={styles.sliderWrapper}>
      <Swiper
        className={styles.swiper}
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 500, disableOnInteraction: false }}
        speed={3000}
        modules={[Autoplay]}
      >
        {items.map(({ name, image, url }, index) => (
          <SwiperSlide key={index} className={styles.item}>
            <a href={url} target="_blank" rel="noreferrer">
              <Image imgSrc={image} alt={name} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.shadowRight}></div>
    </div>
  );
};
