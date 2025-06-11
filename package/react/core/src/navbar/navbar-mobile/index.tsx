import React, { useState, useEffect, ReactNode } from "react";
import { Sling as Hamburger } from "hamburger-react";

import styles from "./styles.module.css";
import NavMenu from "./menu";

export interface NavbarMobileProps {
  logoRenderer: ReactNode;
  hamburgerRenderer?: (
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => ReactNode;
  menuRenderer:
    | ((setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => ReactNode)
    | ReactNode;
}

const NavbarMobile: React.FC<NavbarMobileProps> & {
  Menu?: typeof NavMenu;
} = ({ logoRenderer, hamburgerRenderer, menuRenderer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState<string>("70px");

  useEffect(() => {
    const listenScrollEvent = () => {
      window.scrollY > 10 ? setNavHeight("70px") : setNavHeight("70px");
    };

    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <>
      <div className={`wrapper`} style={{ height: navHeight }}>
        <div className={`container ${styles.container}`}>
          {logoRenderer}

          <div
            className={`${styles.menuToggleIcon} hamburgerMenu ${
              isOpen ? "closeIcon" : "openIcon"
            }`}
          >
            {hamburgerRenderer ? (
              hamburgerRenderer(isOpen, setIsOpen)
            ) : (
              <Hamburger
                direction="right"
                duration={0.7}
                size={29.2}
                toggled={isOpen}
                toggle={setIsOpen}
              />
            )}
          </div>
        </div>
      </div>

      <div className={`${styles.showMenu} ${isOpen ? styles.hideMenu : ""}`}>
        {typeof menuRenderer === "function"
          ? menuRenderer(setIsOpen)
          : menuRenderer}
      </div>
    </>
  );
};

NavbarMobile.Menu = NavMenu;
export default NavbarMobile;
