import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptySpace } from "../empty-space";

import Logo from "@assets/logo/primary/logo.png";

import styles from "./navbar.style.module.css";
import { Dropdown } from "./dropdown";
import { CartMenu } from "../cart-menu";

export const NavbarWeb = ({ headerMenuList }) => {
  const [navHeight, setNavHeight] = useState("80px");
  const [navBgColor, setNavColor] = useState("white");
  // const [navFontColor, setNavFontColor] = useState("#e2e2e2");
  const navigate = useNavigate();

  const listenScrollEvent = () => {
    if (window.scrollY < 10) {
      // -------- intial scroll -----------
      setNavColor("white");
      setNavHeight("80px");
      // setNavFontColor("#e2e2e2");
    } else {
      //-------- after scroll ----------
      setNavColor("white");
      setNavHeight("90px");
      // setNavFontColor("#e2e2e2");
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
        className={styles.headerWrapper}
      >
        <div className={styles.leftCenterRightContainer}>
          {/* ------- left menu -------- */}
          <img
            className={styles.logo}
            src={Logo}
            alt="logo"
            onClick={() => navigate("/")}
          />

          {/* ------- center menu -------- */}
          <div className={styles.centerInfo}>
            <Dropdown headerMenuList={headerMenuList} />
          </div>

          {/* --------right menu ------- */}
          <div className={styles.rightInfo}>
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
  return <CartMenu className={styles.cartMenu} />;
};
