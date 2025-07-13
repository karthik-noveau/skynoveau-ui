import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import styles from "./style.module.css";

export const TechStackSlide = ({ items }) => {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.shadowLeft}></div>
      <Swiper
        className={styles.swiper}
        slidesPerView={"auto"}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 500, disableOnInteraction: false }}
        speed={3000}
        modules={[Autoplay]}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={styles.item}>
            <img src={item.image} alt={item.name} title={item.name} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.shadowRight}></div>
    </div>
  );
};
