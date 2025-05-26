import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import styles from "./bread.module.css";

export const BreadCrumb = ({ data = [], activePath, className }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {data.map((menu, index) => {
        return (
          <>
            <p
              className={`text-16 ${styles.menu} ${
                activePath === menu?.path && styles.activeMenu
              }`}
              onClick={() => menu?.path && navigate(menu.path)}
            >
              {menu.label}
            </p>
            {index !== data.length - 1 && (
              <IoIosArrowForward className={`${styles.icon}`} />
            )}
          </>
        );
      })}
    </div>
  );
};
