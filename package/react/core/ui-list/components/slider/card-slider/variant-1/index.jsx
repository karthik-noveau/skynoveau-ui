import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import { Card } from "./card";

import swiperStyles from "@common/css-override/swiper.override.css";
import styles from "./styles.override.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductImg from "@skynoveau-ui/assets/card/new-saree-img.png";

export const Slider = ({ data = DATA }) => {
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
      modules={[Keyboard, Pagination]}
      className={`${swiperStyles.swiperSlider} ${styles.productsSlider}`}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card
              image={item.image}
              title={item.name}
              path={`/collections/product/${item.id}`}
              description={item.price}
              alt="dhanika-saree"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

let DATA = [
  { id: 1, name: "Prodcut 1", price: "100", image: ProductImg },
  { id: 2, name: "Prodcut 2", price: "100", image: ProductImg },
  { id: 3, name: "Prodcut 3", price: "100", image: ProductImg },
  { id: 4, name: "Prodcut 4", price: "100", image: ProductImg },
  { id: 5, name: "Prodcut 5", price: "100", image: ProductImg },
  { id: 6, name: "Prodcut 6", price: "100", image: ProductImg },
  { id: 7, name: "Prodcut 7", price: "100", image: ProductImg },
  { id: 8, name: "Prodcut 8", price: "100", image: ProductImg },
  { id: 9, name: "Prodc]ut 9", price: "100", image: ProductImg },
  { id: 10, name: "Prodcut 10", price: "100", image: ProductImg },
];
