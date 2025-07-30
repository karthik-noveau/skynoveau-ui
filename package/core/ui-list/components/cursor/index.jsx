import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styles from "./cursor.style.module.css";

export const CustomCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isHidden, setIsHidden] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 20, stiffness: 300 };

  const cursorOuterX = useSpring(mouseX, springConfig);
  const cursorOuterY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      setIsHidden(true);
    };

    const handleMouseLeave = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseenter", handleMouseLeave);
    window.addEventListener("mouseleave", handleMouseEnter);

    const inputs = document.querySelectorAll("input, textarea, select, button");
    inputs.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseenter", handleMouseLeave);
      window.removeEventListener("mouseleave", handleMouseEnter);

      inputs.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className={`${styles.cursor} ${styles.cursorOuter} ${
          isHidden ? "hidden" : ""
        }`}
        ref={cursorOuterRef}
        style={{
          translateX: cursorOuterX,
          translateY: cursorOuterY,
        }}
      />
      <motion.div
        className={`${styles.cursor} ${styles.cursorInner} ${
          isHidden ? "hidden" : ""
        }`}
        ref={cursorInnerRef}
        style={{
          translateX: mouseX,
          translateY: mouseY,
        }}
      />
    </>
  );
};
