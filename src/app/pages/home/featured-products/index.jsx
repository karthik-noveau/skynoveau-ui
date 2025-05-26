import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import styles from "./swiper.override.module.css";
import "@components/slider/swiper.override.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductCard } from "@app/pages/collections/right-section/card";

export const ProductsSlider = ({ data }) => {
  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={20}
      keyboard={{
        enabled: true,
      }}
      grabCursor={true}
      //   navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Keyboard, Pagination]}
      className={`${styles.productsSlider}`}
      style={{ "--swiper-theme-color": "var(--black-color)" }}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <ProductCard
              key={item._id}
              imageSrc={item.images[0]}
              alt={item.name}
              path={`/collections/${item.collectionId}/products/${item._id}`}
              title={item.name}
              price={item.price}
              discountPrice={item.discountPrice}
              className={`${styles.allCollectinsCard}`}
              id={item._id}
              quantity={item.quantity}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
