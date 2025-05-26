import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MENU_LIST } from "../constants";

import styles from "./dropdown.style.module.css";

export const Dropdown = () => {
  const navigate = useNavigate();
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const handleMouseEnter = (e) => {
    const dropdownContainer = e.currentTarget.querySelector(
      `.${styles.dropdownContainer}`
    );
    if (dropdownContainer) {
      const fullHeight = dropdownContainer.scrollHeight;
      setDropdownHeight(fullHeight);
    }
  };

  const handleMouseLeave = () => {
    setDropdownHeight(0);
  };

  return (
    <div className={styles.menuContainer}>
      {MENU_LIST.map((menu) => {
        return (
          <div
            className={styles.dropdownMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              "--dropdownHeight": `${dropdownHeight}px`,
            }}
          >
            {/* ---------- menus ---------- */}
            <div
              className={`text-16 ${styles.menuItem}`}
              onClick={() => !menu?.dropdown && navigate(menu.path)}
            >
              {menu.name}
            </div>

            {/* ---------- dropdown menus ---------- */}
            {menu?.dropdown && (
              <div className={styles.dropdownContainer}>
                <div className={styles.section}>
                  {menu.dropdown.map((dropdown) => {
                    return (
                      <div
                        className={`text-16 ${styles.menuItem}`}
                        onClick={() => {
                          navigate(dropdown.path);
                        }}
                      >
                        {dropdown.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
