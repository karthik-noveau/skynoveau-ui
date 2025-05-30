import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { EmptySpace } from "package/react/src/components/navbar/empty-space";
import { Dropdown } from "./dropdown";
import { HamburgerMenu } from "package/react/src/components/navbar/hamburger/variant-3/inxdex";

import styles from "./navbar.module.css";

import Logo from "@assets/logo/primary/logo.png";

export const NavbarMobile = ({ className }) => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState("60px");
  const [navBgColor, setNavColor] = useState("white");

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  const listenScrollEvent = () => {
    if (window.scrollY < 10) {
      setNavColor("white");
      setNavHeight("80px");
    } else {
      setNavColor("white");
      setNavHeight("90px");
    }
  };

  return (
    <>
      <div
        className={`wrapper ${styles.headerWrapper} ${className}`}
        style={{
          height: navHeight,
          "--header-bg-color": navBgColor,
          transition: "all 0.5s",
        }}
      >
        <div className={`container ${styles.headerContainer}`}>
          <div className={styles.leftInfo}>
            <img
              src={Logo}
              alt="logo"
              toggle={() => {
                setIsMenuOpen(false);
              }}
              onClick={() => navigate("/home")}
            />
          </div>

          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      <Dropdown isMenuOpen={isMenuOpen} />

      {/* ---------- empty space ---------- */}
      <EmptySpace height={navHeight} />
    </>
  );
};
