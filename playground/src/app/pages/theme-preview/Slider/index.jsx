import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import { TestimonialCard } from "./card";

import swiperStyles from "@common/css-override/swiper.override.css";
import styles from "./testimonial.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TESTIMONIALS_LIST = [
  {
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "John Doe",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const Slider = ({ showFontSize }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      //   spaceBetween={30}
      keyboard={{
        enabled: true,
      }}
      //   navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Keyboard, Pagination]}
      className={`${swiperStyles.swiperSlider} ${styles.testimonialSlider}`}
    >
      {TESTIMONIALS_LIST.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard data={testimonial} showFontSize={showFontSize} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
