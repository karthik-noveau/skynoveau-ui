import React, {
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

import { FixedBar } from "../fixed-bar/fixed.bar";

import styles from "./styles.module.css";
import { NavMenu } from "./menu";

type LayoutType = "twoColumn" | "threeColumn";

export interface NavbarWebProps {
  layoutType: LayoutType;
  logoRenderer?: ReactNode;
  menuRenderer?: ReactNode;
  rightMenuRenderer?: ReactNode;
  shadow?: Boolean;
}

type NavbarWebComponent = React.FC<NavbarWebProps> & { Menu?: typeof NavMenu };

export const NavbarWeb: NavbarWebComponent = ({
  layoutType,
  logoRenderer,
  menuRenderer,
  rightMenuRenderer,
  shadow = true,
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
      <div
        className={`wrapper ${styles.wrapper} ${shadow && styles.shadow}`}
        style={{ height: navHeight }}
      >
        <div className="container">{RenderLayout}</div>
      </div>
      <FixedBar height={navHeight} />
    </>
  );
};

NavbarWeb.Menu = NavMenu;
export default NavbarWeb;
