import React, { useEffect, useState } from "react";

export interface NavbarProps {
  responsivePoint?: number;
  web: React.ReactNode;
  mobile: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({
  responsivePoint = 768,
  web,
  mobile,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= responsivePoint);
    };

    // Check initial size and add resize event listener
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [responsivePoint]);

  return <>{isMobile ? mobile : web}</>;
};

export default Navbar;
