import React from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { HiSlash } from "react-icons/hi2";

import styles from "./styles.module.css";

export interface BreadCrumbItem {
  label: string;
  path: string;
  active?: Boolean;
}

export interface BreadCrumbProps {
  data?: BreadCrumbItem[];
  icon?: React.ReactNode;
  className?: string;
}

interface RenderIconProps {
  type: "arrow" | "slash" | string;
}

const RenderIcon: React.FC<RenderIconProps> = ({ type }) => {
  switch (type) {
    case "arrow":
      return <MdArrowForwardIos />;
    case "slash":
      return <HiSlash />;
    default:
      return <MdArrowForwardIos />;
  }
};


export const BreadCrumb: React.FC<BreadCrumbProps> & {
  icon?: React.FC<RenderIconProps>;
} = ({ data = [], icon = <RenderIcon type="arrow" />, className = "" }) => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.container} ${className}`}>
      {data.map(({ label, path, active }, id) => (
        <div key={path} className={styles.menuItem}>
          <span
            className={`text-16 weight-400 ${styles.label} ${
              active && styles.active
            }`}
            onClick={() => navigate(path)}
          >
            {label}
          </span>
          <span className={styles.icon}>{id < data.length - 1 && icon}</span>
        </div>
      ))}
    </div>
  );
};

BreadCrumb.icon = RenderIcon;

export default BreadCrumb;
