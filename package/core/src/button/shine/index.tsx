import React from "react";

import { Loader } from "../../loader";
import { LOADER_SIZE } from "../../loader/constant";
import { BaseButton } from "../base";

import styles from "./button.module.css";

export type ShineButtonProps = {
  children: React.ReactNode;
  loading?: boolean;
  disable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ShineButton: React.FC<ShineButtonProps> = ({
  children,
  loading = false,
  onClick,
  className = "",
  disable = false,
  ...rest
}) => {
  return (
    <BaseButton
      className={`${!disable ? styles.shineEffect : ""} ${className}`}
      onClick={onClick}
      loading={loading}
      disable={disable}
      {...rest}
    >
      {loading && (
        <span className={styles.loaderContainer}>
          <Loader size={LOADER_SIZE.tiny} color="var(--white-color)" />
        </span>
      )}
      {children}
    </BaseButton>
  );
};

export default ShineButton;
