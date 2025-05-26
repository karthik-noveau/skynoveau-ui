import React, { useState, useRef, useEffect } from "react";
import { VscChevronLeft } from "react-icons/vsc";
import styles from "./slider.module.css";

export const ProductCompareSlider = ({ oldImageSrc, newImageSrc }) => {
  const [sliderPosition, setSliderPosition] = useState(0); // Start at 0
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(true);

  // Move the slider to a specific position (clientX is the mouse position)
  const moveSlider = (clientX) => {
    const rect = containerRef.current.getBoundingClientRect();
    let distance = clientX - rect.left;
    let value = distance / rect.width;
    const position = value * 100;

    if (position > 0 && position < 100) {
      setSliderPosition(position);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      if (e.type === "mousemove") {
        moveSlider(e.clientX);
      } else if (e.type === "touchmove") {
        moveSlider(e.touches[0].clientX);
      }
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 } // 10% of the component should be visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Animate the slider from 0 to 50 when the component becomes visible
      setTimeout(() => {
        setSliderPosition(50);
        setTimeout(() => {
          setHasAnimated(false);
        }, 1000);
      }, 300); // Small delay to initiate the animation smoothly
    }
  }, [isVisible]);

  useEffect(() => {
    // Global event listeners to keep dragging outside the container
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    }

    return () => {
      // Cleanup event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <div className={`${styles.sliderContainer}`} ref={containerRef}>
      <div
        className={`${styles.oldImageContainer}`}
        style={{ backgroundImage: `url(${oldImageSrc})` }}
      />
      <div
        className={`${styles.newImageContainer}`}
        style={{
          backgroundImage: `url(${newImageSrc})`,
          width: `${sliderPosition}%`,
          transition:
            isVisible && hasAnimated ? "width 1s ease-in-out" : "none", // Smooth transition for animation
        }}
      />
      <div
        className={`${styles.verticalSlider}`}
        style={{
          left: `${sliderPosition}%`,
          transition: isVisible && hasAnimated ? "left 1s ease-in-out" : "none", // Smooth transition for the vertical line
        }}
      >
        <span
          className={`${styles.sliderButton}`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <VscChevronLeft className={styles.leftIcon} />
          <VscChevronLeft className={styles.rightIcon} />
        </span>
      </div>
    </div>
  );
};
