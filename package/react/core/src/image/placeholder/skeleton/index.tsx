import React, { useEffect, useState, useRef } from "react";
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
  parentRef,
}) => {
  const [computedHeight, setComputedHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    let isHeightPx = typeof height === "string" && height.includes("px");
    console.log("isHeightPx :: in ", parentRef?.current?.offsetHeight);
    if (!isHeightPx && parentRef?.current) {
      const parentHeight = parentRef.current.offsetHeight;
      if (parentHeight > 0) {
        setComputedHeight(parentHeight);
      }
    }
  }, [height, parentRef]);

  console.log("isHeightPx :: out ", parentRef?.current?.offsetHeight);

  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        maxWidth,
        minWidth,
        height: computedHeight || "100px", // fallback if parent height is 0
        padding,
        margin,
        borderRadius,
      }}
    />
  );
};
