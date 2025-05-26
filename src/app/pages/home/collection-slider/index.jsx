import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Pagination } from "swiper/modules";

import { Card } from "./card";
import useWindowWidth from "@hooks/index";

export const CollectionSlider = ({ data }) => {
  const windowWidth = useWindowWidth();

  const getSlidesCount = useMemo(() => {
    if (windowWidth < 675) {
      return 1;
    } else if (windowWidth < 1100) {
      return 2;
    } else {
      return 3;
    }
  }, [windowWidth]);

  return (
    <Swiper
      slidesPerView={getSlidesCount}
      spaceBetween={25}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Keyboard, Pagination]}
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <Card
              image={item.image}
              title={item.name}
              id={item.id}
              alt="dhanika-collections"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
