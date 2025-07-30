import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

export const BackButton = ({ className }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.scrollY > 400) {
        setShowButton(true);
      } else if (showButton && window.scrollY <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", checkScrollHeight);
    return () => {
      window.removeEventListener("scroll", checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${styles.buttonContainer} ${
        showButton && styles.visible
      } ${className}`}
      onClick={scrollToTop}
    >
      <button>top</button>
    </div>
  );
};
