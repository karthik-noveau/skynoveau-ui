import React from "react";

import styles from "./modal.module.css";

export const Modal = ({ className, children, open = true }) => {
  return (
    <>
      <div
        className={`${styles.modalContainer} ${className} ${
          open && styles.openModal
        }`}
      >
        <div className={`${styles.body} ${open && styles.openBody}`}>
          {children}
        </div>
      </div>
    </>
  );
};
