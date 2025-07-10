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
  parentRef?: React.RefObject<HTMLElement>;
  aspectRatio?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  width = "100%",
  minWidth,
  maxWidth,
  height,
  padding,
  margin,
  borderRadius = "3px",
  aspectRatio,
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        ...(!aspectRatio && { width, maxWidth, minWidth, height }),
        padding,
        margin,
        borderRadius,
        aspectRatio,
      }}
    />
  );
};
