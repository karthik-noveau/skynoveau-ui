import React, { type ReactNode, type ButtonHTMLAttributes } from "react";

import { Loader } from "../../loader";
import { LOADER_SIZE } from "../../loader/constant";
import styles from "./button.module.css";
import { BaseButton } from "../base";

export type ButtonOldProviderProps = {
  children: ReactNode;
  loading?: boolean;
  disable?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonOldProvider: React.FC<ButtonOldProviderProps> = ({
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

export default ButtonOldProvider;
