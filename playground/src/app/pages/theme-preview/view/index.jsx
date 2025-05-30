import React from "react";

import styles from "./view.module.css";

export const SizeView = ({ name, show }) => {
  return (
    <>
      {show && (
        <>
          <div className={` ${styles.container}`}>{name}</div>
        </>
      )}
    </>
  );
};
