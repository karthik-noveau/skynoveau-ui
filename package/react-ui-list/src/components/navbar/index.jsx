import React from "react";

import styles from "./navbar.style.module.css";
import { NavbarWeb } from "./web/default";
import { NavbarMobile } from "./mobile/right-dropdown/default";

export const Navbar = () => {
  return (
    <React.Fragment>
      {/* ---------- web ---------- */}
      <div className={styles.deskHeader}>
        <NavbarWeb />
      </div>

      {/* ---------- mobile ---------- */}
      <div className={styles.mobileHeader}>
        <NavbarMobile />
      </div>
    </React.Fragment>
  );
};
