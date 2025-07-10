import { FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Navbar, NavbarMobile, NavbarWeb } from "@skynoveau-ui/core";

import { NAV_CONFIG } from "./constants";

import styles from "./styles.module.css";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Navbar
      responsivePoint={768}
      web={
        <NavbarWeb
          allowSticky={false}
          layoutType="twoColumn"
          shadow={true}
          logoRenderer={<LogoRenderer />}
          menuRenderer={
            <NavbarWeb.Menu
              menuList={NAV_CONFIG.menus}
              location={location}
              navigate={navigate}
            >
              <LastMenu />
            </NavbarWeb.Menu>
          }
        />
      }
      mobile={
        <NavbarMobile
          allowSticky={false}
          logoRenderer={<LogoRenderer />}
          menuRenderer={
            <NavbarMobile.Menu
              menuList={NAV_CONFIG.menus}
              location={location}
              navigate={navigate}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <LastMenu />
              </div>
            </NavbarMobile.Menu>
          }
        />
      }
    />
  );
};

const LogoRenderer = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles.logoContainer}`} onClick={() => navigate("/")}>
      <Image
        width="35px"
        height="35px"
        borderRadius="4px"
        imgSrc={NAV_CONFIG.logo.imgSrc}
      />
      <p className={`text-20 weight-400`}>Skynoveau UI</p>
    </div>
  );
};

const LastMenu = () => {
  return (
    <a
      href="https://github.com/karthik-noveau/skynoveau-ui"
      target="_blank"
      rel="noreferrer"
    >
      <FaGithub className={`text-20 ${styles.icon}`} />
    </a>
  );
};
