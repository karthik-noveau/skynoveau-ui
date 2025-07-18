import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { COMPONENTS_LIBRARY } from "@list/index";

import { getLabel, getPath } from "../utils";

import styles from "./left.module.css";

export const LeftNav = () => {
  const location = useLocation();

  return (
    <div className={`${styles.leftWrapper}`}>
      <div className={`scrollbar ${styles.leftComponent}`}>
        <Section label="Installation">
          <Menu path="/components/installation">
            <MenuItem
              label="CLI"
              path="/installation"
              isActive={location.pathname === `/components/installation`}
            />
          </Menu>
        </Section>

        <Section label="Components">
          <Menu>
            <MenuItem
              label="All Components"
              path=" "
              isActive={location.pathname === `/components`}
            />
          </Menu>

          {Object.keys(COMPONENTS_LIBRARY).map((categoryName, index) => {
            let components = COMPONENTS_LIBRARY[categoryName];

            return (
              <Menu key={index} label={categoryName}>
                {Object.keys(components).map((componentName) => {
                  const { subComponents } = components[componentName];
                  let subComponentName = null;

                  if (subComponents) {
                    subComponentName = Object.keys(subComponents)[0];
                  }
                  return (
                    <React.Fragment key={componentName}>
                      <MenuItem
                        label={getLabel(componentName)}
                        path={`/${
                          subComponentName
                            ? `${getPath(componentName)}/${getPath(
                                subComponentName
                              )}`
                            : getPath(componentName)
                        }`}
                        isActive={
                          `/components/${getPath(componentName)}` ===
                          location.pathname
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </Menu>
            );
          })}
        </Section>
      </div>
    </div>
  );
};

const Section = ({ label, children }) => {
  return (
    <div className={`${styles.section}`}>
      <div className={`text-16 weight-400 ${styles.label}`}>{label}</div>

      {children}
    </div>
  );
};

const Menu = ({ label = "", children }) => {
  return (
    <div className={`${styles.menuContainer}`}>
      {label && (
        <div className={`text-14 weight-400 ${styles.label}`}>{label}</div>
      )}

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
