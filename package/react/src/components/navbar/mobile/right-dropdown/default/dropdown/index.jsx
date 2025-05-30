import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";

import { MENU_LIST } from "./constants";

import styles from "./dropdown.style.module.css";
import "./csstransition.override.css";

export const DropDown = ({ setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState("homeMenu");
  const navigate = useNavigate();
  const location = useLocation();

  // dropdown item
  function MenuItem({ allowArrowIcon = false, data, children }) {
    const onClicked = () => {
      if (allowArrowIcon) {
        setActiveMenu(data.name);
      }

      if (data?.path && data?.category) {
        data?.id &&
          // useStore.getState().setFilter({
          //   collections: data.id,
          //   availability: [],
          // });
          navigate(data.path);
        setIsOpen(false);
      } else if (data?.path) {
        navigate(data.path);
        setIsOpen(false);
      }
    };

    return (
      <div
        className={`${styles.menuItem} ${
          location?.pathname === data.path &&
          !data?.category &&
          styles.activeMenuItem
        }`}
        onClick={onClicked}
      >
        {children}
        {allowArrowIcon && (
          <div className={styles.arrowIcon}>
            <GoArrowRight />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.dropdownWrapper}>
      <CSSTransition
        in={activeMenu === "homeMenu"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
      >
        <div className={styles.dropdownContainer}>
          {MENU_LIST.map((menu) => {
            return (
              <MenuItem data={menu} allowArrowIcon={menu?.dropdown}>
                {menu.name}
              </MenuItem>
            );
          })}
          {/* <div className={styles.lastMenuItemWrapper}>
            <CartMenu />
          </div> */}
        </div>
      </CSSTransition>

      {/* downdown menus */}
      {MENU_LIST.map((menu) => {
        if (!menu?.dropdown) {
          return null;
        }
        return (
          <CSSTransition
            in={activeMenu === menu.name}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
          >
            <div className={styles.dropdownContainer}>
              <MenuItem data={menu}>
                <div
                  className={styles.dropdownHeader}
                  onClick={() => setActiveMenu("homeMenu")}
                >
                  <div className={styles.backArrowIcon}>
                    <GoArrowLeft />
                  </div>
                  {menu.name}
                </div>
              </MenuItem>
              {menu.dropdown.map((subMenu) => {
                return <MenuItem data={subMenu}>{subMenu.name}</MenuItem>;
              })}
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
};
