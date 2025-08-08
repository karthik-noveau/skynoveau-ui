import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Colors } from "@pages/colors";
import { Shadows } from "@pages/Shadows";

import { ComponentCollections } from "./all-components";
import { ComponentRenderer } from "./component-renderer";
import { Installation } from "./installation";
import { LeftNav } from "./left-nav";
import { NavigationBar } from "./navbar";
import { getLabel } from "./utils";

import styles from "./components.module.css";

export default function ComponentsSystem() {
  const location = useLocation();

  const { componentId } = useParams();

  const { ComponentToRender } = useMemo(() => {
    const path = location.pathname;
    let items = [];
    let component = null;

    if (path === "/components/installation") {
      items = [
        { label: "Home", path: "/" },
        { label: "Installation", path: path, active: true },
      ];
      component = <Installation />;
    } else if (path === "/components/colors") {
      items = [
        { label: "Home", path: "/" },
        { label: "Components", path: path, active: true },
      ];
      component = <Colors />;
    } else if (path === "/components/shadows") {
      items = [
        { label: "Home", path: "/" },
        { label: "Components", path: path, active: true },
      ];
      component = <Shadows />;
    } else if (path === "/components") {
      items = [
        { label: "Home", path: "/" },
        { label: "Components", path: path, active: true },
      ];
      component = <ComponentCollections />;
    } else {
      items = [
        { label: "Home", path: "/" },
        { label: "Components", path: "/components" },
        { label: getLabel(componentId), path: path, active: true },
      ];
      component = <ComponentRenderer />;
    }

    return { breadcrumbItems: items, ComponentToRender: component };
  }, [location.pathname, componentId]);

  return (
    <>
      {/* Top Navigation */}
      <NavigationBar />

      {/* Breadcrumb */}
      {/* <div className={`wrapper ${styles.breadCrumbWrapper}`}>
        <div
          className={`container container-padding ${styles.breadCrumbContainer}`}
        >
          <BreadCrumb
            data={breadcrumbItems}
            onNavigate={(path) => {
              navigate(path);
            }}
          />
        </div>
      </div> */}

      {/* Component Layout */}
      <div className="wrapper">
        <div className={`container ${styles.componentContainer}`}>
          <LeftNav />
          <div className={styles.rightComponent}>{ComponentToRender}</div>
        </div>
      </div>
    </>
  );
}
