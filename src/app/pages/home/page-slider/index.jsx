import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";

import { Card } from "./card";

import swiperStyles from "@components/slider/swiper.override.module.css";

import styles from "./styles.override.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import pageBanner_01_web from "@assets/home/page-banners/page-banner-web-01.jpg";
import pageBanner_02_web from "@assets/home/page-banners/page-banner-web-02.jpg";
import pageBanner_03_web from "@assets/home/page-banners/page-banner-web-03.jpg";
import pageBanner_04_web from "@assets/home/page-banners/page-banner-web-04.jpg";

import pageBanner_01_mobile from "@assets/home/page-banners/page-banner-mobile-01.jpg";
import pageBanner_02_mobile from "@assets/home/page-banners/page-banner-mobile-02.jpg";
import pageBanner_03_mobile from "@assets/home/page-banners/page-banner-mobile-03.jpg";
import pageBanner_04_mobile from "@assets/home/page-banners/page-banner-mobile-04.jpg";
import useWindowWidth from "@hooks";

export const PageSlider = ({ data = DATA }) => {
  const windowWidth = useWindowWidth();

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      keyboard={{
        enabled: true,
      }}
      //   navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        speed: 1000,
      }}
      loop={true}
      modules={[Keyboard, Pagination, Autoplay]}
      className={`${swiperStyles.swiperSlider} ${styles.productsSlider}`}
      style={{ "--swiper-theme-color": "var(--white-color)" }}
    >
      {data.map((item, index) => {
        let isMobile = windowWidth < 500;
        let imageSrc = isMobile ? item.imageSrc.mobile : item.imageSrc.web;
        let aspectRatio = isMobile ? 5 / 7.5 : 12 / 5;

        return (
          <SwiperSlide key={index}>
            <Card
              imageSrc={imageSrc}
              alt="dhanika-saree"
              aspectRatio={aspectRatio}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

let DATA = [
  {
    id: 1,
    imageSrc: {
      web: pageBanner_01_web,
      mobile: pageBanner_01_mobile,
    },
  },
  {
    id: 2,
    imageSrc: {
      web: pageBanner_02_web,
      mobile: pageBanner_02_mobile,
    },
  },
  {
    id: 3,
    imageSrc: {
      web: pageBanner_03_web,
      mobile: pageBanner_03_mobile,
    },
  },
  {
    id: 4,
    imageSrc: {
      web: pageBanner_04_web,
      mobile: pageBanner_04_mobile,
    },
  },
];
