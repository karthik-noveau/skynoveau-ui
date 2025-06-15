import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { ComponentCollections } from "./all-components";
import { ComponentRenderer } from "./component-renderer";
import { LeftNav } from "./left-nav";
import { NavigationBar } from "./navbar";

import styles from "./components.module.css";
import { Installation } from "./installation";

export default function ComponentsSystem() {
  const location = useLocation();

  const renderComponent = useMemo(() => {
    if (location.pathname === "/components/installation") {
      return <Installation />;
    } else if (location.pathname === "/components") {
      return <ComponentCollections />;
    } else {
      return <ComponentRenderer />;
    }
  }, [location.pathname]);

  return (
    <>
      <NavigationBar />

      <div className={`wrapper`}>
        <div className={`container ${styles.componentContainer}`}>
          <LeftNav />
          <div className={`${styles.rightComponent}`}>{renderComponent}</div>
        </div>
      </div>
    </>
  );
}
