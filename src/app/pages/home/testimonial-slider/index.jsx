import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import { TestimonialCard } from "./card";

import styles from "./testimonial.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const TESTIMONIALS_LIST = [
  {
    name: "Shakila E",
    description:
      "Even though collections are limited, every saree is unique and really good.",
  },
  {
    name: "Meena",
    description:
      "Here all the collections are superb and I recommend buying from this shop.",
  },
  {
    name: "Hema",
    description:
      "Great collection of sarees, reasonable prices, and good customer service.Really good collection with a wide variety and quality sarees.",
  },
  {
    name: "Kamala ",
    description:
      "We are impressed by the variety and reasonable cost of the sarees, as well as the care shown in displaying them.",
  },
  {
    name: "Mythili Raghavan",
    description:
      "Very good collection.  Caters to all age groups including the old.  Very reasonably priced.",
  },
];

export default function TestimonialSlider() {
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
      grabCursor={true}
      modules={[Keyboard, Pagination]}
      className={`${styles.testimonialSlider}`}
      style={{ "--swiper-theme-color": "var(--black-color)" }}
    >
      {TESTIMONIALS_LIST.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard data={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
