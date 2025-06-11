import React, { useState, ReactNode, MouseEvent } from "react";

import styles from "./menu.module.css";

interface DropdownItem {
  label: string;
  path?: string;
  url?: string;
}

interface MenuItem {
  label: string;
  path: string;
  dropdown?: DropdownItem[];
}

export interface NavMenuProps {
  menuList: MenuItem[];
  navigate: (path: string) => void;
  location: Location;
  children?: ReactNode;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  menuList,
  navigate,
  location,
  children,
}) => {
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const dropdownContainer = e.currentTarget.querySelector(
      `.${styles.dropdownContainer}`
    ) as HTMLDivElement | null;

    if (dropdownContainer) {
      setDropdownHeight(dropdownContainer.scrollHeight);
    }
  };

  const handleMouseLeave = () => {
    setDropdownHeight(0);
  };

  return (
    <div className={styles.menuContainer}>
      {menuList.map((menu) => (
        <div
          key={menu.label}
          className={styles.dropdownMenu}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            // @ts-ignore: CSS custom properties allowed by build tools
            "--dropdownHeight": `${dropdownHeight}px`,
          }}
        >
          {/* ---------- menus ---------- */}
          <div
            className={`${styles.menuItem} ${
              location.pathname === menu?.path ? styles.active : ""
            }`}
            onClick={() => !menu?.dropdown && navigate(menu.path)}
          >
            {menu.label}
          </div>

          {/* ---------- dropdown menus ---------- */}
          {menu?.dropdown && (
            <div className={styles.dropdownContainer}>
              <div className={styles.section}>
                {menu.dropdown.map((dropdown) => (
                  <div
                    key={dropdown.label}
                    className={`${styles.menuItem} ${
                      location.pathname === dropdown?.path ? styles.active : ""
                    }`}
                    onClick={() => {
                      if (dropdown?.url) {
                        window.open(dropdown.url, "_blank");
                      } else if (dropdown?.path) {
                        navigate(dropdown.path);
                      }
                    }}
                  >
                    {dropdown.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {children}
    </div>
  );
};
