import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

import { Loader } from "../../loader";
import { BaseButton } from "../base";

import styles from "./button.module.css";

export type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
  disable?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  onClick,
  disable = false,
  className = "",
  ...rest
}) => {
  return (
    <BaseButton
      className={className}
      onClick={onClick}
      disable={disable}
      loading={loading}
      {...rest}
    >
      {!disable && loading && (
        <span className={styles.loaderContainer}>
          <Loader size="tiny" color="inherit" />
        </span>
      )}
      {children}
    </BaseButton>
  );
};

export default Button;
