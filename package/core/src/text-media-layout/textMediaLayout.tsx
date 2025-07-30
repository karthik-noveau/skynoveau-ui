import React, { FC, ReactNode, useEffect, useState } from "react";

import styles from "./styles.module.css";

// ---------- Types ----------
export interface TextMediaLayoutProps {
  breakPoint?: number;
  layout?: [string, string];
  children?: ReactNode;
}

interface MediaProps {
  children: ReactNode;
  breakPointConfig?: Array<Record<number, string>>; // e.g., [{ 900: "350px" }, { 480: "90%" }]
}

interface ContentProps {
  children: ReactNode;
}

// ---------- Media Component ----------
const Media: FC<MediaProps> = (props) => {
  const { children, breakPointConfig = [] } = props;
  const [width, setWidth] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;
      let matchedWidth: string | undefined = undefined;

      for (const config of breakPointConfig) {
        const breakpoint = Number(Object.keys(config)[0]);
        const value = config[breakpoint];

        if (currentWidth <= breakpoint) {
          matchedWidth = value;
        }
      }

      setWidth(matchedWidth);
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakPointConfig]);

  return (
    <div className={styles.leftLayout} style={{ width: width || "100%" }}>
      {children}
    </div>
  );
};

// ---------- Content Component ----------
const Content: FC<ContentProps> = ({ children }) => {
  return <div className={styles.rightLayout}>{children}</div>;
};

// ---------- Main Layout ----------
export const TextMediaLayout: FC<TextMediaLayoutProps> & {
  Media: typeof Media;
  Content: typeof Content;
} = ({ breakPoint = 768, layout = ["1fr", "1fr"], children }) => {
  const [isLayoutShifted, setIsLayoutShifted] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      setIsLayoutShifted(window.innerWidth <= breakPoint);
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, [breakPoint]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isLayoutShifted
          ? "1fr"
          : `${layout[0]} ${layout[1]}`,
      }}
      className={`${styles.container} ${
        isLayoutShifted ? styles.layoutShift : ""
      }`}
    >
      {children}
    </div>
  );
};

TextMediaLayout.Media = Media;
TextMediaLayout.Content = Content;
export default TextMediaLayout;
