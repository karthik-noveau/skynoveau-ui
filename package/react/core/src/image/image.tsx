import React, {
  useState,
  useEffect,
  useRef,
  ImgHTMLAttributes,
  ReactNode,
} from "react";

import styles from "./image.module.css";
import { Skeleton } from "./placeholder/skeleton";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  imgSrc: string;
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
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    if (zoomEffectOnScroll) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
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
      style={
        {
          "--image-zoom-scale": zoomScale,
          "--image-hover-scale": hoverScale,
          "--border-radius": borderRadius,
          width: rest?.width || "100%",
          height: rest?.height || rest?.width || "100%",
        } as React.CSSProperties
      }
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
          ${cursorPointer ? styles.cursorPointer : ""} 
          ${hoverEffect ? styles.imageHover : ""} 
          ${zoomEffectOnRender ? styles.zoomEffect : ""} 
          ${isVisible ? styles.zoomEffect : ""} 
          ${className}
        `}
        onLoad={() => {
          onImageLoaded && onImageLoaded(true);
          setIsLoaded(true);
        }}
        height={rest?.height || rest?.width || "100%"}
        {...rest}
      />
    </div>
  );
};

export default Image;
