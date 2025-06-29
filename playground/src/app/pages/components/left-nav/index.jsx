import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";

import styles from "./left.module.css";

export const LeftNav = () => {
  const location = useLocation();

  return (
    <div className={`${styles.leftWrapper}`}>
      <div className={`scrollbar ${styles.leftComponent}`}>
        <Menu title="Installation" path="/components/installation">
          <MenuItem
            label="CLI"
            path="/installation"
            isActive={location.pathname === `/components/installation`}
          />
        </Menu>

        <Menu title="Components">
          <MenuItem
            label="All Components"
            path=""
            isActive={location.pathname === `/components`}
          />

          {Object.values(COMPONENTS_LIST).map((item, index) => {
            let path = item.path;
            let isActive = location.pathname === `/components${path}`;
            if (item?.categories) {
              path = item.categories[0].path;
              isActive = false;
            }
            return (
              <>
                <MenuItem
                  label={item.name}
                  index={index}
                  path={path}
                  isActive={isActive}
                />

                {item?.categories &&
                  item.categories.map((subItem, index) => {
                    let isActive = false;
                    if (`/components${subItem.path}` === location.pathname) {
                      isActive = true;
                    } else {
                      isActive = false;
                    }
                    return (
                      <SubMenuItem
                        key={index}
                        label={subItem.name}
                        index={index}
                        path={`/components${subItem.path}`}
                        isActive={isActive}
                      />
                    );
                  })}
              </>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};

const Menu = ({ title, children }) => {
  return (
    <div className={`${styles.menuContainer}`}>
      {/* ---------- title ---------- */}
      <div
        className={`text-16 weight-500 ${styles.menuTitle} ${styles.componentsOverview}  `}
      >
        {title}
      </div>
      {/* ---------- menu item ---------- */}
      {children}
    </div>
  );
};

const MenuItem = ({ isActive, index, path, label }) => {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      className={`text-16 weight-400 ${styles.menuItem} ${
        isActive && styles.active
      }`}
      onClick={() => {
        navigate(`/components${path}`);
      }}
    >
      {label}
    </div>
  );
};

const SubMenuItem = ({ isActive, index, path, label }) => {
  const navigate = useNavigate();
  return (
    <div
      key={index}
      className={`text-16 ${styles.menuItem} ${styles.subMenuItem} ${
        isActive && styles.active
      }`}
      onClick={() => {
        navigate(`/components${path}`);
      }}
    >
      {label}
    </div>
  );
};
