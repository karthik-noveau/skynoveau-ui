import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ComponentCollections } from "./all-components";
import { ComponentRenderer } from "./component-renderer";
import { LeftNav } from "./left-nav";
import { NavigationBar } from "./navbar";

import styles from "./components.module.css";
import { Installation } from "./installation";
import { BreadCrumb } from "@skynoveau-ui/core";

export default function ComponentsSystem() {
  const location = useLocation();
  const { componentId } = useParams();
  const { breadCrumbList, renderComponent } = useMemo(() => {
    let breadCrumbList = [];
    let renderComponent = null;

    if (location.pathname === "/components/installation") {
      breadCrumbList = [
        { label: "Home", path: "/" },
        {
          label: "Intallation",
          path: "/components/installation",
          active: true,
        },
      ];
      renderComponent = <Installation />;
    } else if (location.pathname === "/components") {
      breadCrumbList = [
        { label: "Home", path: "/" },
        { label: "Components", path: "/components", active: true },
      ];
      renderComponent = <ComponentCollections />;
    } else {
      breadCrumbList = [
        { label: "Home", path: "/" },
        { label: "Components", path: "/components" },
        {
          label: componentId,
          path: `/components/${componentId}`,
          active: true,
        },
      ];
      renderComponent = <ComponentRenderer />;
    }

    return { breadCrumbList, renderComponent };
  }, [location.pathname, componentId]);

  return (
    <>
      <NavigationBar />

      <div className={`wrapper`}>
        <div
          className={`container container-margin-top ${styles.breadCrumbContainer}`}
        >
          <BreadCrumb data={breadCrumbList} />
        </div>
      </div>

      <div className={`wrapper`}>
        <div className={`container ${styles.componentContainer}`}>
          <LeftNav />
          <div className={`${styles.rightComponent}`}>{renderComponent}</div>
        </div>
      </div>
    </>
  );
}
