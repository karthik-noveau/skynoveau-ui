import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptySpace } from "../../empty-space";
import { Dropdown } from "./dropdown";

import Logo from "@assets/logo/primary/logo.png";

import styles from "./navbar.style.module.css";

export const NavbarWeb = ({ className }) => {
  const [navHeight, setNavHeight] = useState("80px");
  const [navBgColor, setNavColor] = useState("white");

  const navigate = useNavigate();

  const listenScrollEvent = () => {
    if (window.scrollY < 10) {
      // -------- intial scroll -----------
      setNavColor("white");
      setNavHeight("80px");
    } else {
      //-------- after scroll ----------
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
        style={{
          "--header-bg-color": navBgColor,
          height: navHeight,
          backgroundColor: navBgColor,
        }}
        className={`wrapper ${styles.headerWrapper} ${className}`}
      >
        <div className={`container ${styles.headerContainer}`}>
          {/* ------- left Info -------- */}
          <div className={styles.leftInfo}>
            <img
              className={styles.Logo}
              src={Logo}
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          {/* --------right Info------- */}
          <div className={styles.rightInfo}>
            <Dropdown />
            <LastMenuButton />
          </div>
        </div>
      </div>

      {/* empty space  */}
      <EmptySpace bgColor={navBgColor} height={navHeight} />
    </React.Fragment>
  );
};

const LastMenuButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`text-16 ${styles.lastMenuButton}`}
      onClick={() => navigate("/contact")}
    >
      Connect !
    </div>
  );
};
