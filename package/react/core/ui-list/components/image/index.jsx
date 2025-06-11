/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

import styles from "./image.module.css";
import { Skeleton } from "./placeholder/skeleton";

export const Image = ({
  imgSrc,
  alt = "",
  className,
  placeholder,
  allowPlaceholder = true,
  zoomEffectOnRender = true,
  zoomEffectOnScroll,
  hoverEffect,
  zoomScale = 1.2,
  hoverScale = 1.2,
  cursorPointer,
  borderRadius = "6px",
  onImageLoaded,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false); // Track if image is loaded
  const [isVisible, setIsVisible] = useState(false); // Track if image is in viewport
  const imageRef = useRef(null);

  // Observe visibility of the component
  useEffect(() => {
    let observer = null;
    if (zoomEffectOnScroll) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Set to true when the element is in the viewport
          }
        },
        { threshold: 0.9 } // Trigger when 10% of the image is visible
      );

      if (imageRef.current) observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current && observer) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <div
      style={{
        "--image-zoom-scale": zoomScale,
        "--image-hover-scale": hoverScale,
        "--border-radius": borderRadius,
      }}
      className={`${styles.imageContainer} ${className}`}
    >
      {(placeholder || allowPlaceholder) &&
        !isLoaded &&
        (placeholder ? (
          placeholder
        ) : (
          <Skeleton height="100%" width="100%" className={styles.skeleton} />
        ))}

      <img
        ref={imageRef}
        src={imgSrc}
        alt={alt}
        className={`
          ${!allowPlaceholder || isLoaded ? styles.showImg : styles.hideImg} 
          ${cursorPointer && styles.cursorPointer}
          ${hoverEffect && styles.imageHover} 
          ${zoomEffectOnRender && styles.zoomEffect} 
          ${isVisible ? styles.zoomEffect : ""} 
          ${className}
        `}
        onLoad={() => {
          onImageLoaded && onImageLoaded(true);
          setIsLoaded(true);
        }}
        {...rest}
      />
    </div>
  );
};
