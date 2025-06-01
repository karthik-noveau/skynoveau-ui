import React, { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./button.module.css";

type BaseButtonProps = {
  children: ReactNode;
  disable?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  disable = false,
  loading = false,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`text-14 weight-300 ${styles.buttonContainer} 
        ${disable ? styles.disabled : ""} 
        ${className} button`}
      onClick={(e) => {
        if (disable || loading) return;
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
