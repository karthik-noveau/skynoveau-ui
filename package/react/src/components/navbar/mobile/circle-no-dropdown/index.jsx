import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ImageLazyLoader } from "@common/lazy-loader";
import { EmptySpace } from "package/react/src/components/navbar/empty-space";
import { HamburgerMenu } from "package/react/src/components/navbar/hamburger/variant-1/inxdex";

import styles from "./navbar.style.module.css";
import "./aos.style.css";

import Logo from "@assets/logo/primary/logo.png";

export const NavbarMobile = ({ className }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSize, setNavSize] = useState("60px");
  const [navColor, setNavColor] = useState("white");

  const location = useLocation();

  const listenScrollEvent = () => {
    if (window.scrollY > 10) {
      setNavColor("white");
      setNavSize("70px");
    } else {
      setNavColor("white");
      setNavSize("60px");
    }
  };

  // scroll animation
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  //open and close animation
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const onMenuClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  return (
    <React.Fragment>
      <div
        className={`wrapper ${styles.headerWrapper} ${className}`}
        style={{
          backgroundColor: navColor,
          height: navSize,
          transition: "all 0.5s",
        }}
      >
        <div className={`container ${styles.headerContainer}`}>
          {/* ---------- left info ---------- */}
          <Link
            to="/"
            className={styles.leftInfo}
            onClick={() => setIsMenuOpen(false)}
          >
            <ImageLazyLoader image={Logo} alt="Logo" />
          </Link>

          {/* ---------- right info ---------- */}
          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      {/* ---------- dropdown ---------- */}
      <div
        className={`${styles.popup} ${
          isMenuOpen ? styles.popupShow : styles.popupHide
        }`}
      >
        <div className={styles.menuContainer}>
          <div className={styles.menuItemsContainer}>
            <p
              className={`text-16 ${styles.menuItem} ${
                isMenuOpen ? "sui-aos-down1" : "sui-aos-up"
              } ${location.pathname === "/" ? styles.active : ""}`}
              onClick={() => onMenuClick("/")}
            >
              Home
            </p>
            <p
              className={`text-16 ${styles.menuItem} ${
                isMenuOpen ? "sui-aos-down2" : "sui-aos-up"
              } ${location.pathname === "/story" ? styles.active : ""}`}
              onClick={() => onMenuClick("/story")}
            >
              Story
            </p>
            <p
              className={`text-16 ${styles.menuItem} ${
                isMenuOpen ? "sui-aos-down3" : "sui-aos-up"
              } ${location.pathname === "/portfolio" ? styles.active : ""}`}
              onClick={() => onMenuClick("/portfolio")}
            >
              Portfolio
            </p>
          </div>
          <div
            className={`text-16 ${styles.lastItem} ${
              isMenuOpen ? "sui-aos-down4" : "sui-aos-up"
            }`}
            onClick={() => onMenuClick("/connect")}
          >
            Connect
          </div>
        </div>
      </div>

      {/* empty space  */}
      <EmptySpace bgColor={navColor} height={navSize} />
    </React.Fragment>
  );
};
