import React from "react";
import { HiSlash } from "react-icons/hi2";
import { MdArrowForwardIos } from "react-icons/md";

import styles from "./styles.module.css";

export interface BreadCrumbItem {
  label: string;
  path: string;
  active?: boolean;
}

export interface BreadCrumbProps {
  data?: BreadCrumbItem[];
  iconType?: "arrow" | "slash";
  className?: string;
  onNavigate?: (path: string) => void;
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({
  data = [],
  iconType = "arrow",
  className = "",
  onNavigate,
}) => {
  const RenderIcon = iconType === "slash" ? <HiSlash /> : <MdArrowForwardIos />;

  return (
    <div className={`${styles.container} ${className}`}>
      {data.map(({ label, path, active }, id) => (
        <div key={path} className={styles.menuItem}>
          <span
            className={`text-16 weight-400 ${styles.label} ${
              active ? styles.active : ""
            }`}
            onClick={() => onNavigate?.(path)}
          >
            {label}
          </span>
          <span className={styles.icon}>
            {id < data.length - 1 && RenderIcon}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumb;
