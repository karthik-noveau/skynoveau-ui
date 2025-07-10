import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";

import { getLabel, getPath } from "../utils";

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
            path=" "
            isActive={location.pathname === `/components`}
          />

          {Object.keys(COMPONENTS_LIST).map((componentName, index) => {
            let { subComponents } = COMPONENTS_LIST[componentName];

            let isActive =
              location.pathname === `/components/${getPath(componentName)}`;

            return (
              <>
                <MenuItem
                  label={getLabel(componentName)}
                  index={index}
                  path={subComponents ? "" : `/${getPath(componentName)}`}
                  isActive={isActive}
                />

                {subComponents &&
                  Object.keys(subComponents).map((subComponentName, index) => {
                    let isActive =
                      `/components/${getPath(subComponentName)}` ===
                      location.pathname
                        ? true
                        : false;

                    return (
                      <SubMenuItem
                        key={index}
                        label={getLabel(subComponentName)}
                        index={index}
                        path={`/${getPath(subComponentName)}`}
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
        className={`text-16 weight-400 ${styles.menuTitle} ${styles.componentsOverview}  `}
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
      className={`text-14 weight-400 ${styles.menuItem} ${
        path && styles.hover
      } ${path && isActive && styles.active}`}
      onClick={() => {
        path && navigate(`/components${path}`);
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
      className={`text-14 weight-400 ${styles.menuItem} ${styles.subMenuItem} ${
        path && styles.hover
      } ${isActive && styles.active}`}
      onClick={() => {
        navigate(`/components${path}`);
      }}
    >
      {label}
    </div>
  );
};
