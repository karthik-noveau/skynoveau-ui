import React, { useLayoutEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { GrAppsRounded } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";

import { ComponentSearch } from "./search";

import { ComponentCollections } from "./collections";
import { ComponentRenderer } from "./component-renderer";
import { COMPONENTS_LIST } from "@skynoveau-ui/components-list";
import { Navbar } from "@skynoveau-ui/header";

import styles from "./sui.components.module.css";

import Logo from "@skynoveau-ui/assets/skyui-logo/skyui-logo.png";

const PARENT_ID = "Left-Nav";

export default function ComponentsSystem() {
  const [height, setHeight] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    let domHeight = document.getElementById(PARENT_ID).clientHeight;
    setHeight(domHeight);
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>
          Explore Modern UI Components for Web Development | SUI Components
        </title>
        <meta
          name="description"
          content="Discover a wide range of modern UI components with SUI (SkyUI). Enhance your website development with customizable and responsive components designed for modern web applications."
        />
        <meta
          name="keywords"
          content="UI components, web components, modern UI components, customizable web components, responsive UI elements, explore customizable and responsive UI components for web development, modern web components with SUI, SkyUI modern UI components for fast web design"
        />
      </Helmet>

      <div className={`${styles.componentWrapper}`}>
        <div className={`${styles.componentContainer}`}>
          {/* ---------- left component ---------- */}
          <div className={`${styles.leftComponent}`} id={PARENT_ID}>
            <div className={`${styles.logoWrapper}`}>
              <div
                className={`${styles.logoContainer}`}
                onClick={() => navigate("/")}
              >
                <img src={Logo} alt="skyui-logo" />
                <p className={`title-24 weight-400`}>Sky UI</p>
              </div>
            </div>
            <div
              className={`${styles.titleInfo}`}
              onClick={() => navigate("/components")}
            >
              <GrAppsRounded className={`${styles.icon}`} />
              <p className={`text-18 weight-400`}>All Components</p>
            </div>
            {/* ---------- left navigation bar ---------- */}
            <div
              className={`${styles.leftNavWrapper}`}
              style={{ "--parant-height": `${height}px` }}
            >
              <div className={`${styles.leftNavContainer}`}>
                <div className={`scrollbar ${styles.leftNavSection}`}>
                  {COMPONENTS_LIST.map((item) => {
                    let path = item.path;
                    let isActive = location.pathname === `/components${path}`;
                    if (item?.categories) {
                      path = item.categories[0].path;
                      isActive = false;
                    }
                    return (
                      <React.Fragment>
                        <div
                          className={`text-14 weight-400 ${styles.menuItem} ${
                            isActive && styles.active
                          }`}
                          onClick={() => {
                            navigate(`/components${path}`);
                          }}
                        >
                          {item.name}
                        </div>
                        {/* sub item */}
                        {item?.categories &&
                          item.categories.map((subItem) => {
                            let isActive = false;
                            if (
                              `/components${subItem.path}` === location.pathname
                            ) {
                              isActive = true;
                            } else {
                              isActive = false;
                            }
                            return (
                              <div
                                className={`text-14 weight-400 ${
                                  styles.menuItem
                                } ${styles.subMenuItem} ${
                                  isActive && styles.active
                                }`}
                                onClick={() => {
                                  navigate(`/components${subItem.path}`);
                                }}
                              >
                                {subItem.name}
                              </div>
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- right component ---------- */}
          <div className={`${styles.rightComponent}`}>
            {/* header */}
            <div className={`${styles.header}`}>
              <ComponentSearch />
              <Navbar className={`${styles.componentNavbar}`} />
            </div>
            {/* renderer */}
            {location.pathname === "/components" ? (
              <ComponentCollections />
            ) : (
              <ComponentRenderer />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
