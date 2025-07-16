import React from "react";
import { useNavigate } from "react-router-dom";
import { COMPONENTS } from "@list/index";

import { getPath } from "../utils";

import styles from "./collections.module.css";

export const ComponentCollections = () => {
  return (
    <div className={`${styles.collectionsContaier}`}>
      <h1 className={`text-24 weight-400 ${styles.title}`}>
        Components overview
      </h1>
      <p className={`text-16 ${styles.description}`}>
        Components use custom variants to allow you to completely customize the
        look and feel of each component.
      </p>
      <div className={`${styles.collectionsCards}`}>
        <Section
          label="Installation"
          className={`${styles.installationSection}`}
        >
          <Menu path="/components/installation">
            <MenuItem
              label="CLI"
              path="/installation"
              isActive={location.pathname === `/components/installation`}
            />
          </Menu>
        </Section>

        <Section label="Components">
          {Object.keys(COMPONENTS).map((categoryName, index) => {
            let components = COMPONENTS[categoryName];

            return (
              <Menu key={index} label={categoryName}>
                {Object.keys(components).map((componentName) => {
                  return (
                    <React.Fragment key={componentName}>
                      <MenuItem
                        label={componentName}
                        path={`/${getPath(componentName)}`}
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

const Section = ({ label, className, children }) => {
  return (
    <div className={`${styles.section} ${className}`}>
      <div className={`text-16 ${styles.label}`}>{label}</div>

      {children}
    </div>
  );
};
const Menu = ({ label, children }) => {
  return (
    <div className={`${styles.menuContainer}`}>
      <div className={`text-16 ${styles.label}`}>{label}</div>

      <div className={`${styles.menuItems}`}>{children}</div>
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
