import React, { ReactNode } from "react";

import styles from "./wrapper.module.css";

interface LoaderWrapperProps {
  children: ReactNode;
  bgColor?: string;
}

export const LoaderWrapper: React.FC<LoaderWrapperProps> = ({
  children,
  bgColor,
}) => {
  return (
    <div className={styles.loaderWrapper} style={{ backgroundColor: bgColor }}>
      {children}
    </div>
  );
};
