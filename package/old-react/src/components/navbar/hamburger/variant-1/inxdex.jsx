import { Sling as Hamburger } from "hamburger-react";

import "./hamburger.override.css";

export const HamburgerMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <div className={`hamburgerMenu1 ${isMenuOpen ? "closeIcon" : "openIcon"}`}>
      <Hamburger
        direction="right"
        duration={0.7}
        size={29.2}
        toggled={isMenuOpen}
        toggle={() => setIsMenuOpen(!isMenuOpen)}
      />
    </div>
  );
};
