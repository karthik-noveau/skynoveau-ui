import React, { ReactNode } from "react";
import { EmptyNavbar } from "../empty";

import styles from "./styles.module.css";

interface NavbarWrapperProps {
  navHeight: string | number;
  className?: string;
  children: ReactNode;
}

export const NavbarWrapper: React.FC<NavbarWrapperProps> = ({
  navHeight,
  className,
  children,
}) => {
  return (
    <>
      <div
        className={`wrapper ${styles.wrapper}`}
        style={{ height: navHeight }}
      >
        <div className={`container ${className || ""}`}>{children}</div>
      </div>
      <EmptyNavbar height={navHeight} />
    </>
  );
};
