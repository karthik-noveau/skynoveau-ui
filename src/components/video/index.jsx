/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";

import styles from "./video.module.css";

export const Video = ({
  videoSrc,
  className,
  zoomEffectOnRender = true,
  zoomEffectOnScroll = false,
  // attributes
  controls = true,
  autoPlay = true,
  loop = true,
  playsInline = true,
  muted = true,
}) => {
  const [isVisible, setIsVisible] = useState(false); // Track if image is in viewport
  const videoRef = useRef(null);

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
        { threshold: 0.5 } // Trigger when 10% of the image is visible
      );

      if (videoRef.current) observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current && observer) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        width="100%"
        controls={controls}
        autoPlay={autoPlay}
        loop={loop}
        playsInline={playsInline}
        muted={muted}
        className={`
          ${zoomEffectOnRender && styles.zoomEffect} 
          ${isVisible ? styles.zoomEffect : ""} 
          ${className}
        `}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};
