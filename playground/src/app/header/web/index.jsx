import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { FiLinkedin } from "react-icons/fi";

import Logo from "@skynoveau-ui/assets/skyui-logo/skyui-logo.png";

import styles from "./navbar.style.module.css";
import { Dropdown } from "./dropdown";

export const NavbarWebVariant1 = ({ className }) => {
  const [navHeight, setNavHeight] = useState("100px");
  const [navBgColor, setNavColor] = useState("white");
  // const [navFontColor, setNavFontColor] = useState("#e2e2e2");

  const listenScrollEvent = () => {
    if (window.scrollY < 10) {
      // -------- intial scroll -----------
      setNavColor("white");
      setNavHeight("100px");
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
        className={`${styles.headerWrapper} ${className}`}
      >
        <LeftRight />
      </div>

      {/* empty space  */}
      {/* <EmptySpace bgColor={navBgColor} height={navHeight} /> */}
    </React.Fragment>
  );
};

const LeftRight = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${styles.leftRightContainer} webNavbar`}>
      {/* ------- left Info -------- */}
      <div
        className={`${styles.leftInfo} webNavbarLogo`}
        onClick={() => navigate("/")}
      >
        <img className={styles.Logo} src={Logo} alt="Logo" />
        <p className={`text-22 weight-400`}>SkyUI</p>
      </div>

      {/* --------right Info------- */}
      <div className={styles.rightInfo}>
        <Dropdown />
        <div
          className={` ${styles.boxMenu} ${
            location.pathname.includes("components") && styles.active
          }`}
          onClick={() => navigate("/components")}
        >
          Components
        </div>
        <div
          className={` ${styles.mediaMenu}`}
          onClick={() =>
            window.open(
              "https://github.com/karthik-noveau/react-project-template.git",
              "_blank"
            )
          }
        >
          <FaGithub />
        </div>
        <div
          className={` ${styles.mediaMenu}`}
          onClick={() =>
            window.open(
              "https://www.linkedin.com/company/skynoveau-technology/",
              "_blank"
            )
          }
        >
          <FiLinkedin />
        </div>
      </div>
    </div>
  );
};
