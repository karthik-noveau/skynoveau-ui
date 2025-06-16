import React, { type ReactNode, type ButtonHTMLAttributes } from "react";

import { BaseButton } from "../base";
import { Loader } from "../../loader";
import { LOADER_SIZE } from "../../loader/constant";
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
          <Loader showText={false} size={LOADER_SIZE.TINY} color="inherit" />
        </span>
      )}
      {children}
    </BaseButton>
  );
};

export default Button;
