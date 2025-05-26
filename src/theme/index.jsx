import { useEffect } from "react";

import "./theme.css";

import "./text.css";
import "./weight.css";
import "./color.css";
import "./global.css";

import "./global.override.css";

export const ThemeProvider = ({ children, theme = {} }) => {
  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(theme)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  return <>{children}</>;
};
