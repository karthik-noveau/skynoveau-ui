import React, { useState, useEffect } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

import { DropDown } from "./dropdown";

import "./hamburger.override.css";
import styles from "./navbar.style.module.css";

import Logo from "@skynoveau-ui/assets/skyui-logo/skyui-logo.png";

export const NavbarMobileRightVariant1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [navHeight, setNavHeight] = useState("70px");
  const [navBgColor, setNavBgColor] = useState("white");

  const listenScrollEvent = () => {
    window.scrollY > 10 && setNavBgColor("white");
    window.scrollY > 10 ? setNavHeight("70px") : setNavHeight("70px");
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
        }}
        className={styles.headerContainer}
      >
        {/* header */}
        <div
          className={styles.topHeaderWrapper}
          style={{
            height: navHeight,
            transition: "all 0.5s",
          }}
        >
          <div className={styles.topHeaderContainer}>
            <div className={styles.leftInfo}>
              <Link to="/" onClick={() => setIsOpen(false)}>
                <img src={Logo} alt="skyui-logo" />
                <p className={`weight-500 ${styles.logoname}`}>SkyUI</p>
              </Link>
            </div>
            <div
              className={`${styles.rightInfo} hamburgerMenu ${
                isOpen ? "closeIcon" : "openIcon"
              }`}
            >
              <Hamburger
                direction="right"
                duration={0.7}
                size={29.2}
                toggled={isOpen}
                toggle={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>

        {/* dropdown */}
        <div
          className={`${styles.dropDownWrapper} ${
            isOpen && styles.dropDownHide
          }`}
        >
          <DropDown setIsOpen={setIsOpen} />
        </div>
      </div>

      {/* empty space */}
      {/* <EmptySpace bgColor={navBgColor} height={navHeight} /> */}
    </React.Fragment>
  );
};
