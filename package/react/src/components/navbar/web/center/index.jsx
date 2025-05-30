import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ImageLazyLoader } from "@common/lazy-loader/image";
import { EmptySpace } from "package/react/src/components/navbar/empty-space";

import Logo from "@assets/logo/primary/logo.png";

import styles from "./navbar.style.module.css";

export const NavbarWeb = ({ className }) => {
  const navigate = useNavigate();
  const [navHeight, setNavHeight] = useState("80px");
  const [navBgColor, setNavColor] = useState("white");

  const location = useLocation();

  const listenScrollEvent = () => {
    if (window.scrollY < 10) {
      setNavColor("white");
      setNavHeight("80px");
    } else {
      setNavColor("white");
      setNavHeight("90px");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);
  return (
    <React.Fragment>
      <div
        className={`wrapper ${styles.headerWrapper} ${className}`}
        style={{
          "--header-bg-color": navBgColor,
          height: navHeight,
          transition: "all 0.5s",
        }}
      >
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.leftInfo}>
            <ImageLazyLoader image={Logo} onClick={() => navigate("/")} />
          </div>
          <div className={styles.centerInfo}>
            <p
              onClick={() => navigate("/home")}
              className={`text-16 ${
                location.pathname === "/" || location.pathname === "/home"
                  ? styles.active
                  : ""
              }`}
            >
              Home
            </p>
            <p
              onClick={() => navigate("/story")}
              className={`text-16 ${
                location.pathname === "/story" ? styles.active : ""
              }`}
            >
              Story
            </p>
            <p
              onClick={() => navigate("/portfolio")}
              className={`text-16 ${
                location.pathname === "/portfolio" ? styles.active : ""
              }`}
            >
              Portfolio
            </p>
          </div>
          <p
            onClick={() => navigate("/connect")}
            className={`text-16 ${styles.rightInfo}`}
          >
            Connect
          </p>
        </div>
      </div>

      {/* empty space  */}
      <EmptySpace bgColor={navBgColor} height={navHeight} />
    </React.Fragment>
  );
};
