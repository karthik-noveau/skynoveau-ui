import {
  Button,
  Image,
  Navbar,
  NavbarMobile,
  NavbarWeb,
} from "@skynoveau-ui/core";

import { NAV_CONFIG } from "./constants";

import styles from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Navbar
      responsivePoint={768}
      web={
        <NavbarWeb
          layoutType="twoColumn"
          shadow={true}
          logoRenderer={<LogoRenderer />}
          menuRenderer={
            <NavbarWeb.Menu
              menuList={NAV_CONFIG.menus}
              location={location}
              navigate={navigate}
            >
              <Button>Contact</Button>
            </NavbarWeb.Menu>
          }
        />
      }
      mobile={
        <NavbarMobile
          logoRenderer={<LogoRenderer />}
          menuRenderer={
            <NavbarMobile.Menu
              menuList={NAV_CONFIG.menus}
              location={location}
              navigate={navigate}
            >
              <Button>Contact</Button>
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
      <Image width="35px" imgSrc={NAV_CONFIG.logo.imgSrc} />
      <p className={`text-20 weight-400`}>Skynoveau UI</p>
    </div>
  );
};
