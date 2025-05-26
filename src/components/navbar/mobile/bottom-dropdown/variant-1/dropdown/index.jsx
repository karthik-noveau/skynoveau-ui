import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";

import { MENU_LIST } from "../constants";

import styles from "./dropdown.module.css";

import ArrowIcon from "./assets/arrow.svg";

export const Dropdown = ({ isMenuOpen }) => {
  const [dropdownTitles, setDropdownTitles] = useState([]);

  const locatiion = useLocation();
  const navigate = useNavigate();

  const onMenuClick = (menu) => {
    if (dropdownTitles.length) {
      setDropdownTitles((prev) => {
        if (prev.includes(menu.name)) {
          return prev.filter((item) => item !== menu.name);
        }
        return [...prev, menu.name];
      });
    } else {
      let list = [menu.name];
      setDropdownTitles(list);
    }
  };

  return (
    <div
      className={`${styles.bottomHeaderWrapper} ${
        isMenuOpen && styles.showDrawer
      }`}
    >
      <div className={styles.bottomHeaderContainer}>
        {MENU_LIST.map((menu) => {
          if (menu?.dropdown) {
            return null;
          }
          return (
            <div
              className={styles.menuItemContainer}
              onClick={() => navigate(menu.path)}
            >
              <div
                className={`text-16 ${styles.item} ${
                  menu.path === locatiion.pathname && styles.active
                }`}
              >
                {menu.name}
              </div>
            </div>
          );
        })}

        {/* dropdown */}
        {MENU_LIST.map((menu) => {
          if (!menu?.dropdown) {
            return null;
          }
          return (
            <div className={styles.dropdownMenu}>
              <div
                className={`text-16 ${styles.menuItemContainer} ${
                  dropdownTitles.includes(menu.name) && styles.active
                }`}
                onClick={() => onMenuClick(menu)}
              >
                <div className={styles.item}>{menu.name}</div>
                <MdOutlineArrowForwardIos
                  className={`${styles.icon} ${
                    dropdownTitles.includes(menu.name) && styles.animateIcon
                  }`}
                />
              </div>

              <div
                className={`${styles.dropdownWrapper} ${
                  dropdownTitles.includes(menu.name) &&
                  styles.showDropdownContainer
                }`}
              >
                <div className={styles.dropdownContainer}>
                  {menu.dropdown.map((dropdownItem) => {
                    return (
                      <div
                        className={`text-16 ${styles.menuItem} ${
                          styles.subMenuItem
                        } ${
                          dropdownItem.path === locatiion.pathname &&
                          styles.active
                        }`}
                        onClick={() => navigate(dropdownItem.path)}
                      >
                        {dropdownItem.name}

                        <img
                          src={ArrowIcon}
                          className={styles.icon}
                          alt="icon"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div className={styles.lastMenuWrapper}>
          <div
            className={`text-16 ${styles.lastMenuContainer} ${
              "/contact" === locatiion.pathname && styles.active
            }`}
            onClick={() => navigate("/contact")}
          >
            Connect us
          </div>
        </div>
      </div>
    </div>
  );
};
