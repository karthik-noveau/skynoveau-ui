import React, { useRef } from "react";

import { Loader } from "../../loader/basic";
import { LOADER_SIZE } from "../../loader/constant";
import { BaseButton } from "../../button/base/index.jsx";

import styles from "./button.module.css";

const RippleButton = ({ loading, children, onClick = () => {}, ...rest }) => {
  const rippleRef = useRef(null);

  const handleRipple = (e) => {
    const ripple = rippleRef.current;
    const rect = ripple.getBoundingClientRect();
    const circle = ripple.querySelector(`.${styles.rippleCircle}`);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    ripple.classList.add("isActive");
    ripple.addEventListener("animationend", () => {
      ripple.classList.remove("isActive");
    });
  };

  return (
    <BaseButton
      onClick={(e) => {
        handleRipple(e);
        onClick();
      }}
      loading={loading}
      {...rest}
    >
      <div className={styles.rippleEffect} ref={rippleRef}>
        <span className={styles.rippleCircle}></span>
      </div>

      {loading && (
        <span className={`${styles.loaderContainer}`}>
          <Loader
            showText={false}
            size={LOADER_SIZE.TINY}
            color="var(--white-color)"
          />
        </span>
      )}
      {children}
    </BaseButton>
  );
};

export default RippleButton;
