import React from "react";
import styles from "./skeleton.module.css";

export interface SkeletonProps {
  className?: string;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  padding?: string | number;
  margin?: string | number;
  borderRadius?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "100%",
  minWidth,
  maxWidth,
  height = "100%",
  padding,
  margin,
  borderRadius = "3px",
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        maxWidth,
        minWidth,
        height,
        padding,
        margin,
        borderRadius,
      }}
    />
  );
};
