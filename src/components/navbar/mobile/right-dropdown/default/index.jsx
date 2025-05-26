import React, { useState, useEffect } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

import { DropDown } from "./dropdown";
import { EmptySpace } from "@components/navbar/empty-space";

import Logo from "@assets/logo/primary/logo.png";

import styles from "./navbar.style.module.css";
import "./hamburger.override.css";

export const NavbarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [navHeight, setNavHeight] = useState("60px");
  const [navBgColor, setNavBgColor] = useState("white");

  const listenScrollEvent = () => {
    window.scrollY > 10 && setNavBgColor("white");
    window.scrollY > 10 ? setNavHeight("70px") : setNavHeight("60px");
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
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <div className={`${styles.HamburgerMenuContainer}`}>
              <div className={`${styles.rightInfo} hamburgerMenu`}>
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
      <EmptySpace bgColor={navBgColor} height={navHeight} />
    </React.Fragment>
  );
};
