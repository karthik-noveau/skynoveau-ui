import React from "react";
import { LOADER_SIZE } from "../../loader/constant";
import { BaseButton } from "../base";
import { Loader } from "../../loader";
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

export default ShineButton;
