import React, {
  useState,
  useEffect,
  useRef,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./image.module.css";
import { Skeleton } from "./placeholder/skeleton";

type ResponsiveSrc = {
  mobile: string;
  web: string;
};

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imgSrc: string | ResponsiveSrc;
  responsivePoint?: number;
  alt?: string;
  className?: string;
  placeholder?: ReactNode;
  allowPlaceholder?: boolean;
  zoomEffectOnRender?: boolean;
  zoomEffectOnScroll?: boolean;
  hoverEffect?: boolean;
  zoomScale?: number;
  hoverScale?: number;
  cursorPointer?: boolean;
  borderRadius?: string;
  onImageLoaded?: (loaded: boolean) => void;
}

const Image: React.FC<ImageProps> = ({
  imgSrc,
  responsivePoint = 768,
  alt = "",
  className = "",
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
  width,
  height,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [src, setSrc] = useState<string>("");

  const containerRef = useRef<HTMLImageElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Handle responsive image src
  useEffect(() => {
    if (typeof imgSrc === "string") {
      setSrc(imgSrc);
    } else {
      const handleResize = () => {
        const width = window.innerWidth;
        const selectedSrc =
          width <= responsivePoint ? imgSrc.mobile : imgSrc.web;
        setSrc(selectedSrc);
      };

      handleResize(); // Set initial src
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [imgSrc, responsivePoint]);

  // Handle scroll animation effect
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (zoomEffectOnScroll) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true);
        },
        { threshold: 0.9 }
      );
      if (imageRef.current) observer.observe(imageRef.current);
    }
    return () => {
      if (imageRef.current && observer) observer.unobserve(imageRef.current);
    };
  }, [zoomEffectOnScroll]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--image-zoom-scale": zoomScale,
          "--image-hover-scale": hoverScale,
          "--border-radius": borderRadius,
          width: width || "100%",
          height: height || "100%",
          ...style,
        } as React.CSSProperties
      }
      className={`${styles.imageContainer} ${className}`}
    >
      {(placeholder || allowPlaceholder) &&
        !isLoaded &&
        (placeholder ? (
          placeholder
        ) : (
          <Skeleton
            parentRef={containerRef}
            width={width || "100%"}
            height={height || "100%"}
          />
        ))}

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`
          ${!allowPlaceholder || isLoaded ? styles.showImg : styles.hideImg} 
          ${cursorPointer ? styles.cursorPointer : ""} 
          ${hoverEffect ? styles.imageHover : ""} 
          ${zoomEffectOnRender ? styles.zoomEffect : ""} 
          ${isVisible ? styles.zoomEffect : ""} 
          ${className}
        `}
        onLoad={() => {
          onImageLoaded?.(true);
          setIsLoaded(true);
        }}
        width={width || "100%"}
        height={height || "100%"}
        {...rest}
      />
    </div>
  );
};

export default Image;
