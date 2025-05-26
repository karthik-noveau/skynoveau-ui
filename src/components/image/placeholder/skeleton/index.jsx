import styles from "./skeleton.module.css";

export const Skeleton = ({
  className,
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
        width: width,
        maxWidth: maxWidth,
        minWidth: minWidth,
        height: height,
        padding: padding,
        margin: margin,
        borderRadius: borderRadius,
      }}
    />
  );
};
