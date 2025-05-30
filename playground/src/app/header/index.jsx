import React from "react";

import { NavbarMobileRightVariant1 } from "./mobile";
import { NavbarWebVariant1 } from "./web";

import styles from "./sui.navbar.module.css";

export const Navbar = ({ className }) => {
  return (
    <React.Fragment>
      {/* ---------- web ---------- */}
      <div className={styles.deskHeader}>
        <NavbarWebVariant1 className={`${className}`} />
      </div>
      {/* ---------- mobile ---------- */}
      <div className={styles.mobileHeader}>
        <NavbarMobileRightVariant1 className={`${className}`} />
      </div>
    </React.Fragment>
  );
};
