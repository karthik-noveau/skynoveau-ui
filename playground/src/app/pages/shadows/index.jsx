import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.css";

const SHADOWS = [""];

export const Shadows = () => {
  return (
    <>
      <h3 className={`text-24 weight-500 ${styles.baseTitle}`}>
        System Colors
      </h3>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          {SHADOWS.map((shadow, index) => {
            const SHADOW_VARIANTS = [
              `--${shadow && `${shadow}-`}shadow-100`,
              `--${shadow && `${shadow}-`}shadow-200`,
              `--${shadow && `${shadow}-`}shadow-300`,
              `--${shadow && `${shadow}-`}shadow-400`,
            ];

            return (
              <div
                className={`${styles.colorsContainer} ${styles.dynamicVariants}`}
                key={index}
              >
                {SHADOW_VARIANTS.map((color, idx) => (
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

  useEffect(() => {
    if (ref.current) {
      const computedColor = getComputedStyle(ref.current).getPropertyValue(
        cssVar
      );
      const trimmedColor = computedColor.trim();
      setColorCode(trimmedColor);
    }
  }, [cssVar]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);

    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1000);
  };

  return (
    <div
      className={`${styles.box} ${index === 0 && styles.rootBox} ${
        styles.copiedCode
      }`}
      ref={ref}
      style={{ boxShadow: `var(${cssVar})` }}
      onClick={() => copyToClipboard(colorCode)}
    >
      {copiedCode ? (
        <p
          className={`text-12 ${styles.copyText}`}
          style={{ cursor: "pointer" }}
          title="Click to copy color code"
        >
          Copied!
        </p>
      ) : (
        <>
          <p
            className={`ellipsis text-14 ${styles.colorName}`}
            style={{ cursor: "pointer" }}
            title="Click to copy variable"
          >
            {cssVar.replaceAll("--shadow-", "shadow ")}
          </p>
          {/* <p
            className={`text-10 ${styles.colorName}`}
            style={{ cursor: "pointer" }}
            title="Click to copy color code"
          >
            {colorCode}
          </p> */}
        </>
      )}
    </div>
  );
};
