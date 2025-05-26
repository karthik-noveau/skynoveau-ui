import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./dropdown.style.module.css";
import { useEcommerceStore } from "@app/store";

export const Dropdown = ({ headerMenuList }) => {
  const navigate = useNavigate();
  const location = useLocation();
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
      {headerMenuList.map((menu, index) => {
        return (
          <div
            key={index}
            className={styles.dropdownMenu}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              "--dropdownHeight": `${dropdownHeight}px`,
            }}
          >
            {/* ---------- menus ---------- */}
            <div
              className={`text-18 ${styles.menuItem} ${
                location.pathname === menu?.path && styles.active
              }`}
              onClick={() => !menu?.dropdown && navigate(menu.path)}
            >
              {menu.name}
            </div>

            {/* ---------- dropdown menus ---------- */}
            {menu?.dropdown && (
              <div className={styles.dropdownContainer}>
                <div className={styles.section}>
                  {menu.dropdown.map((dropdown, index) => {
                    return (
                      <div
                        key={index}
                        className={`text-20 ${styles.menuItem}
                        `}
                        onClick={() => {
                          useEcommerceStore
                            .getState()
                            .setCollectionPageFilter({ searchValue: null });
                          navigate(`${dropdown.path}`);
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
