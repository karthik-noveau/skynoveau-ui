import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

import styles from "./button.module.css";
import { Loader } from "@components/loader/basic";
import { LOADER_SIZE } from "@components/loader/constant";
import { Button } from "@components/button/basic";

export const QuantityButton = ({
  quantity,
  addCount,
  disabled,
  className,
  handleIncreaseCount,
  handleReduceCount,
  loading = false,
}) => {
  return (
    <Button
      className={`text-16  ${styles.quantityButton} ${
        disabled && styles.disabled
      } ${className}`}
    >
      <FiMinus
        className={`${styles.minusIcon} ${
          (disabled || addCount === 1) && styles.iconDisabled
        }`}
        onClick={() => {
          !disabled && addCount > 1 && handleReduceCount();
        }}
      />
      {loading ? (
        <Loader showText={false} size={LOADER_SIZE.TINY} />
      ) : (
        <span className={`text-12 default-font ${styles.quantity}`}>
          {addCount}
        </span>
      )}

      <FiPlus
        className={`${styles.plusIcon} ${
          (disabled || addCount === quantity) && styles.iconDisabled
        }`}
        onClick={() => {
          if (!disabled && addCount < quantity) {
            handleIncreaseCount();
          }
        }}
      />
    </Button>
  );
};
