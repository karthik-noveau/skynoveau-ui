import React, { type MouseEvent, useRef } from "react";

import { Loader } from "../../loader";
import { LOADER_SIZE } from "../../loader/constant";
import { BaseButton } from "../base";

import styles from "./button.module.css";

export type RippleButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const RippleButton: React.FC<RippleButtonProps> = ({
  loading = false,
  children,
  onClick,
  ...rest
}) => {
  const rippleRef = useRef<HTMLDivElement>(null);

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const ripple = rippleRef.current;
    if (!ripple) return;

    const rect = ripple.getBoundingClientRect();
    const circle = ripple.querySelector(
      `.${styles.rippleCircle}`
    ) as HTMLElement;
    if (!circle) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    ripple.classList.add("isActive");
    ripple.addEventListener(
      "animationend",
      () => {
        ripple.classList.remove("isActive");
      },
      { once: true }
    );
  };

  return (
    <BaseButton
      onClick={(e) => {
        handleRipple(e);
        onClick?.(e);
      }}
      loading={loading}
      {...rest}
    >
      <div className={styles.rippleEffect} ref={rippleRef}>
        <span className={styles.rippleCircle}></span>
      </div>

      {loading && (
        <span className={styles.loaderContainer}>
          <Loader size={LOADER_SIZE.tiny} color="var(--white-color)" />
        </span>
      )}
      {children}
    </BaseButton>
  );
};

export default RippleButton;
