import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NavbarWrapper } from "../wrapper";
import { NavMenu } from "./menu";

import styles from "./styles.module.css";

type LayoutType = "twoColumn" | "threeColumn";

export interface NavbarWebProps {
  layoutType: LayoutType;
  logoRenderer?: ReactNode;
  menuRenderer?: ReactNode;
  rightMenuRenderer?: ReactNode;
  allowSticky?: boolean;
  navHeight?: number;
}

type NavbarWebComponent = React.FC<NavbarWebProps> & { Menu?: typeof NavMenu };

export const NavbarWeb: NavbarWebComponent = (props: NavbarWebProps) => {
  const {
    layoutType,
    logoRenderer,
    menuRenderer,
    rightMenuRenderer,
    allowSticky = true,
    navHeight: height = 70,
  } = props;
  const [navHeight, setNavHeight] = useState(`${height}px`);

  const listenScrollEvent = useCallback(() => {
    const scrolled = window.scrollY > 10;

    setNavHeight(
      scrolled ? `${allowSticky ? height + 5 : height}px` : `${height}px`
    );
  }, [allowSticky, height]);

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

  return <NavbarWrapper navHeight={navHeight}>{RenderLayout}</NavbarWrapper>;
};

NavbarWeb.Menu = NavMenu;
export default NavbarWeb;
