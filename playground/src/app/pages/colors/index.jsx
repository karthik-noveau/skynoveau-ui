import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

const STATIC_COLORS = [
  "white",
  "gray",
  "black",
  "success",
  "error",
  "warning",
  "info",
];

const DYNAMIC_COLORS = ["primary"];

export const Colors = () => {
  return (
    <>
      <h3 className={`text-24 weight-500 ${styles.baseTitle}`}>
        System Colors
      </h3>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          {DYNAMIC_COLORS.map((baseColor, index) => {
            const DYNAMIC_COLOR_VARIANTS = [
              `--${baseColor}-color`,
              `--${baseColor}-color-25`,
              `--${baseColor}-color-50`,
              `--${baseColor}-color-100`,
              `--${baseColor}-color-200`,
              `--${baseColor}-color-300`,
              `--${baseColor}-color-400`,
              `--${baseColor}-color-500`,
              `--${baseColor}-color-600`,
              `--${baseColor}-color-700`,
              `--${baseColor}-color-800`,
              `--${baseColor}-color-900`,
            ];

            return (
              <div
                className={`${styles.colorsContainer} ${styles.dynamicVariants}`}
                key={index}
              >
                {DYNAMIC_COLOR_VARIANTS.map((color, idx) => (
                  <ColorBox key={idx} cssVar={color} index={idx} />
                ))}
              </div>
            );
          })}

          {STATIC_COLORS.map((baseColor, index) => {
            const STATIC_COLOR_VARIANTS = [
              `--${baseColor}-color`,
              `--${baseColor}-color-25`,
              `--${baseColor}-color-50`,
              `--${baseColor}-color-100`,
              `--${baseColor}-color-200`,
              `--${baseColor}-color-300`,
              `--${baseColor}-color-400`,
              `--${baseColor}-color-500`,
              `--${baseColor}-color-600`,
            ];

            return (
              <div
                className={`${styles.colorsContainer} ${styles.staticVariants}`}
                key={index}
              >
                {STATIC_COLOR_VARIANTS.map((color, idx) => (
                  <ColorBox key={idx} cssVar={color} index={idx} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const ColorBox = ({ cssVar, index }) => {
  const ref = useRef(null);
  const [colorCode, setColorCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(false);
  const [textColor, setTextColor] = useState("#000"); // default black

  useEffect(() => {
    if (ref.current) {
      const computedColor = getComputedStyle(ref.current).getPropertyValue(
        cssVar
      );
      const trimmedColor = computedColor.trim();
      setColorCode(trimmedColor);
      setTextColor(getContrastColor(trimmedColor));
    }
  }, [cssVar]);

  const label = cssVar.split("-");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1000);
  };

  // Utility: Calculate contrast text color based on background
  const getContrastColor = (hexColor) => {
    let hex = hexColor.replace("#", "").trim();

    // handle rgb values
    if (hexColor.startsWith("rgb")) {
      const rgb = hexColor.match(/\d+/g).map(Number);
      return getLuminance(rgb[0], rgb[1], rgb[2]) > 0.5 ? "#000" : "#fff";
    }

    // support 3-digit hex
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    }

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return getLuminance(r, g, b) > 0.3 ? "#000" : "#fff";
  };

  const getLuminance = (r, g, b) => {
    const [R, G, B] = [r, g, b].map((c) => {
      c /= 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };

  return (
    <div
      className={`${styles.box} ${index === 0 && styles.rootBox} ${
        copiedCode && styles.copiedCode
      }`}
      ref={ref}
      style={{ backgroundColor: `var(${cssVar})` }}
      onClick={() => copyToClipboard(colorCode)}
    >
      {copiedCode ? (
        <p
          className={`text-12 ${styles.copyText}`}
          style={{ cursor: "pointer", color: textColor }}
          title="Click to copy color code"
        >
          Copied!
        </p>
      ) : (
        <>
          <p
            className={`ellipsis text-13 ${styles.colorName}`}
            style={{ cursor: "pointer", color: textColor }}
            title="Click to copy variable"
          >
            {`${index === 0 ? label[2] : label[4]}`}
          </p>
          <p
            className={`text-12 ${styles.colorName}`}
            style={{ cursor: "pointer", color: textColor }}
            title="Click to copy color code"
          >
            {colorCode}
          </p>
        </>
      )}
    </div>
  );
};
