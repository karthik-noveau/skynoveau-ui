import React, { ReactNode } from "react";

import { LOADER_SIZE } from "./constant";
// import { LOADER_SIZE } from "./constant";
import { LoaderWrapper } from "./wrapper";

import styles from "./loader.module.css";

type LoaderProps = {
  children?: ReactNode;
  size?: keyof typeof LOADER_SIZE;
  loading?: boolean;
  transparent?: boolean;
  bgColor?: string;
  color?: string;
  type?: "fullscreen" | "inline";
};

const BaseLoader: React.FC<LoaderProps> = ({
  children,
  size = LOADER_SIZE.small,
  color,
}) => {
  return (
    <div
      style={{
        color: color,
      }}
      className={styles.loaderContainer}
    >
      <div
        className={`${styles.circle} 
      ${size === LOADER_SIZE.base ? styles.base : ""}
      ${size === LOADER_SIZE.medium ? styles.medium : ""}
      ${size === LOADER_SIZE.small ? styles.small : ""}
      ${size === LOADER_SIZE.tiny ? styles.tiny : ""}
      `}
      />
      {children}
    </div>
  );
};

export const Loader: React.FC<LoaderProps> = ({
  children,
  size = LOADER_SIZE.medium,
  loading = true,
  color = "var(--black-color)",
  bgColor = "var(--white-color)",
  type,
}) => {
  if (!loading) return null;

  const baseLoaderProps = { children, size, color };

  return type === "fullscreen" ? (
    <LoaderWrapper bgColor={bgColor}>
      <BaseLoader {...baseLoaderProps} />
    </LoaderWrapper>
  ) : (
    <BaseLoader {...baseLoaderProps} />
  );
};

export default Loader;
