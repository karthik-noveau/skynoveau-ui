import React from "react";
import { Button } from "antd";

import styles from "./button.module.css";

export const LoadingButton = ({
  className,
  children,
  disabled,
  onClick,
  loading,
}) => {
  return (
    <>
      <Button
        disabled={disabled}
        className={`${styles.container} ${className}`}
        onClick={onClick}
        loading={loading}
      >
        {!loading && children}
      </Button>
    </>
  );
};
