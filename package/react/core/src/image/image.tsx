import React, {
  ImgHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { Skeleton } from "./placeholder/skeleton";

import styles from "./image.module.css";

type ResponsiveSrc = {
  mobile: string;
  web: string;
};

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imgSrc: string | ResponsiveSrc;
  responsivePoint?: number;
  alt?: string;
  className?: string;
  placeholder?: string | ReactNode | boolean;
  zoomScale?: number | boolean;
  hoverScale?: number | boolean;
  zoomEffectOnRender?: boolean;
  zoomEffectOnScroll?: boolean;
  cursorPointer?: boolean;
  borderRadius?: string;
  onImageLoaded?: (loaded: boolean) => void;
  aspectRatio?: string;
}

const Image: React.FC<ImageProps> = ({
  imgSrc,
  responsivePoint = 768,
  alt = "",
  className = "",
  placeholder = <Skeleton />,
  zoomScale = 1.2,
  hoverScale = false,
  zoomEffectOnRender,
  zoomEffectOnScroll,
  cursorPointer,
  borderRadius = "0px",
  onImageLoaded,
  width = "100%",
  height = "auto",
  aspectRatio,
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [src, setSrc] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const allowZoomScale = typeof zoomScale === "number";
  const allowHoverScale = typeof hoverScale === "number";

  const allowZoomEffectOnRender =
    allowZoomScale && zoomEffectOnRender !== false;
  const allowZoomEffectOnScroll =
    allowZoomScale && zoomEffectOnScroll !== false;

  // Handle responsive image src
  useEffect(() => {
    if (typeof imgSrc === "string") {
      setSrc(imgSrc);
    } else {
      const handleResize = () => {
        const width = window.innerWidth;
        setSrc(width <= responsivePoint ? imgSrc.mobile : imgSrc.web);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [imgSrc, responsivePoint]);

  // Scroll-based zoom effect
  useEffect(() => {
    if (!allowZoomEffectOnScroll) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.9 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, [allowZoomEffectOnScroll]);

  return (
    <div
      ref={containerRef}
      style={
        {
          "--image-hover-scale": allowHoverScale ? hoverScale : undefined,
          "--image-zoom-scale": allowZoomScale ? zoomScale : undefined,
          "--border-radius": borderRadius,
          width,
          height,
          ...style,
        } as React.CSSProperties
      }
      className={`${styles.imageContainer} ${className}`}
    >
      {!isLoaded &&
        (placeholder === false ? null : typeof placeholder === "string" ? (
          <img src={placeholder} alt="placeholder" className={styles.showImg} />
        ) : React.isValidElement(placeholder) ? (
          React.cloneElement(placeholder as React.ReactElement<any>, {
            ...(typeof placeholder.type === "string"
              ? {}
              : {
                  width:
                    !(placeholder as React.ReactElement<any>).props?.width &&
                    width
                      ? width
                      : (placeholder as React.ReactElement<any>).props?.width,
                  height:
                    !(placeholder as React.ReactElement<any>).props?.height &&
                    height
                      ? height
                      : (placeholder as React.ReactElement<any>).props?.height,
                  borderRadius,
                  aspectRatio,
                }),
          })
        ) : null)}

      <img
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
        ${isLoaded ? styles.showImg : styles.hideImg}
        ${allowHoverScale ? styles.imageHover : ""}
        ${allowZoomEffectOnRender ? styles.zoomEffect : ""}
        ${allowZoomEffectOnScroll && isVisible ? styles.zoomEffect : ""}
        ${cursorPointer ? styles.cursorPointer : ""}
        ${className}
        `}
        onLoad={() => {
          onImageLoaded?.(true);
          setIsLoaded(true);
        }}
        {...rest}
        style={style}
      />
    </div>
  );
};

export default Image;
