import React from "react";

import styles from "./button.module.css";

export const BaseButton = ({
  children,
  disable,
  loading,
  className,
  onClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`text-14 weight-300 ${styles.buttonContainer}
       ${disable && styles.disabled}
       ${className} button`}
      onClick={(e) => {
        if (disable || loading) {
          return;
        } else {
          onClick && onClick(e);
        }
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
