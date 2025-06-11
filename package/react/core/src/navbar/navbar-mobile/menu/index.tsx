import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";

import styles from "./menu.module.css";
import "./csstransition.override.css";

// Types
export interface DropdownItem {
  label: string;
  path?: string;
  url?: string;
}

export interface MenuItemType {
  label: string;
  path?: string;
  url?: string;
  dropdown?: DropdownItem[];
}

export interface NavMenuProps {
  menuList: MenuItemType[];
  navigate: (path: string) => void;
  location: Location;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
}

interface MenuItemProps {
  data: MenuItemType | DropdownItem;
  allowArrowIcon?: boolean;
  children: React.ReactNode;
  navigate: (path: string) => void;
  setActiveMenu: (label: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  location: Location;
}

const MenuItem: React.FC<MenuItemProps> = ({
  data,
  allowArrowIcon = false,
  children,
  navigate,
  setActiveMenu,
  setIsOpen,
  location,
}) => {
  const onClicked = () => {
    if (allowArrowIcon && "dropdown" in data) {
      setActiveMenu(data.label);
    }
    if (data?.path || data?.url) {
      data?.path && navigate(data.path);
      data?.url && window.open(data.url, "_blank");
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`text-16 ${styles.menuItem} ${
        location?.pathname === data.path ? styles.activeMenuItem : ""
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
};

export const NavMenu: React.FC<NavMenuProps> = ({
  menuList,
  location,
  navigate,
  setIsOpen,
  children,
}) => {
  const [activeMenu, setActiveMenu] = useState("homeMenu");

  const homeMenuRef = useRef<HTMLDivElement>(null);
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <div className={styles.dropdownWrapper}>
      <CSSTransition
        in={activeMenu === "homeMenu"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        nodeRef={homeMenuRef}
      >
        <div ref={homeMenuRef} className={styles.dropdownContainer}>
          {menuList.map((menu) => (
            <MenuItem
              key={menu.label}
              data={menu}
              allowArrowIcon={!!menu.dropdown}
              navigate={navigate}
              setActiveMenu={setActiveMenu}
              setIsOpen={setIsOpen}
              location={location}
            >
              {menu.label}
            </MenuItem>
          ))}

          {children || (
            <div className={styles.lastMenuItemWrapper}>
              <div className={styles.lastMenuItem}>
                <div
                  className={styles.mediaMenu}
                  onClick={() =>
                    window.open(
                      "https://github.com/karthik-noveau/react-project-template.git",
                      "_blank"
                    )
                  }
                >
                  <FaGithub />
                </div>
                <div
                  className={styles.mediaMenu}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/company/skynoveau-technology/",
                      "_blank"
                    )
                  }
                >
                  <FiLinkedin />
                </div>
              </div>
            </div>
          )}
        </div>
      </CSSTransition>

      {menuList.map((menu) =>
        menu.dropdown ? (
          <CSSTransition
            key={menu.label}
            in={activeMenu === menu.label}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            nodeRef={{
              current: submenuRefs.current[menu.label],
            }}
          >
            <div
              ref={(el) => {
                submenuRefs.current[menu.label] = el;
              }}
              className={styles.dropdownContainer}
            >
              <MenuItem
                data={menu}
                navigate={navigate}
                setActiveMenu={setActiveMenu}
                setIsOpen={setIsOpen}
                location={location}
              >
                <div
                  className={styles.dropdownHeader}
                  onClick={() => setActiveMenu("homeMenu")}
                >
                  <div className={styles.backArrowIcon}>
                    <GoArrowLeft />
                  </div>
                  {menu.label}
                </div>
              </MenuItem>
              {menu.dropdown.map((subMenu) => (
                <MenuItem
                  key={subMenu.label}
                  data={subMenu}
                  navigate={navigate}
                  setActiveMenu={setActiveMenu}
                  setIsOpen={setIsOpen}
                  location={location}
                >
                  {subMenu.label}
                </MenuItem>
              ))}
            </div>
          </CSSTransition>
        ) : null
      )}
    </div>
  );
};

export default NavMenu;
