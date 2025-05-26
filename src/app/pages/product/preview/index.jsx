import React, { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";

import { ProductViewSlider } from "./view-slider";

import styles from "./preview.module.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

export const Preview = ({ imagesList }) => {
  const [scrollImages, setScrollImages] = useState([...imagesList]);
  const [activeImage, setActiveImage] = useState(imagesList[0]);

  useEffect(() => {
    let updatedImages = imagesList.map((item) => {
      return { ...item, active: item.id === activeImage.id ? true : false };
    });
    setScrollImages(updatedImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <div className={`${styles.previewContainer}`}>
        {/* ---------- image slider ---------- */}
        <div className={`${styles.imageCarousel}`}>
          {scrollImages.map((item) => {
            return (
              <img
                src={item.image}
                alt={item.id}
                className={`${item.id === activeImage.id && styles.active}`}
                onClick={() => {
                  setActiveImage(item);
                }}
              />
            );
          })}
        </div>

        {/* ---------- magnify ---------- */}
        <InnerImageZoom
          src={activeImage.image}
          zoomSrc={activeImage.image}
          zoomType="hover"
          hideHint={true}
          hideCloseButton={true}
        />
      </div>

      <div className={`${styles.mobilePreviewSlider}`}>
        <ProductViewSlider data={imagesList} />
      </div>
    </React.Fragment>
  );
};
