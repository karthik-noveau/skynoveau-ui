import React, {
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { NavMenu } from "./menu";
import { NavbarWrapper } from "../wrapper";

import styles from "./styles.module.css";

type LayoutType = "twoColumn" | "threeColumn";

export interface NavbarWebProps {
  layoutType: LayoutType;
  logoRenderer?: ReactNode;
  menuRenderer?: ReactNode;
  rightMenuRenderer?: ReactNode;
}

type NavbarWebComponent = React.FC<NavbarWebProps> & { Menu?: typeof NavMenu };

export const NavbarWeb: NavbarWebComponent = ({
  layoutType,
  logoRenderer,
  menuRenderer,
  rightMenuRenderer,
}) => {
  const [navHeight, setNavHeight] = useState("70px");

  const listenScrollEvent = useCallback(() => {
    const scrolled = window.scrollY > 10;

    setNavHeight(scrolled ? "75px" : "70px");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, [listenScrollEvent]);

  const RenderLayout = useMemo(() => {
    switch (layoutType) {
      case "twoColumn":
        return (
          <div className={styles.twoColumn}>
            {logoRenderer}
            {menuRenderer}
          </div>
        );
      case "threeColumn":
        return (
          <div className={styles.threeColumn}>
            {logoRenderer}
            {menuRenderer}
            {rightMenuRenderer}
          </div>
        );
      default:
        return null;
    }
  }, [layoutType, logoRenderer, menuRenderer, rightMenuRenderer]);

  return (
    <>
      <NavbarWrapper navHeight={navHeight}>{RenderLayout}</NavbarWrapper>
    </>
  );
};

NavbarWeb.Menu = NavMenu;
export default NavbarWeb;
