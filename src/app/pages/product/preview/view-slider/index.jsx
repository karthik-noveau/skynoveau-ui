import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import styles from "./view.override.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ProductViewSlider = ({ data }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={20}
      keyboard={{
        enabled: true,
      }}
      //   navigation={true}
      loop={false}
      pagination={true}
      modules={[Keyboard, Pagination]}
      className={`${styles.productsSlider}`}
      style={{ "--swiper-theme-color": "var(--black-color)" }}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <img src={item.image} alt="dhanika-sarees" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
