import React, {
  Children,
  cloneElement,
  FC,
  isValidElement,
  ReactNode,
} from "react";

import styles from "./styles.module.css";

export type TextProps = {
  children: ReactNode;
  className?: string;
  space?: number;
  descriptionSpacing?: {
    single: number;
    middle: number;
    last: number;
  };
};

// Title
export const Title: FC<TextProps> = ({
  children,
  className = "",
  space = 8,
}) => (
  <h2
    style={{ marginBottom: `${space}px` }}
    className={`${styles.title} ${className}`}
  >
    {children}
  </h2>
);

// Description
export const Description: FC<TextProps> = ({
  children,
  className = "",
  space = 0,
}) => (
  <p
    style={{ marginBottom: `${space}px` }}
    className={`${styles.description} ${className}`}
  >
    {children}
  </p>
);

// Bold
export const Bold: FC<TextProps> = ({ children, className = "" }) => (
  <strong className={`${styles.bold} ${className}`}>{children}</strong>
);

// UnderLine
export const UnderLine: FC<TextProps> = ({ children, className = "" }) => (
  <span className={`${styles.underline} ${className}`}>{children}</span>
);

// Table
export const Table: FC<{ columns: any[]; data: any[]; space?: number }> = ({
  space = 15,
}) => (
  <div style={{ marginTop: `${space}px` }} className={styles.table}>
    <p style={{ fontStyle: "italic", color: "#666" }}>Table placeholder</p>
  </div>
);

// Text — dynamic spacing logic
export const Text: FC<TextProps> = ({
  children,
  className = "",
  descriptionSpacing = {
    single: 0,
    middle: 8,
    last: 0,
  },
}) => {
  const childrenArray = Children.toArray(children);

  const descriptionIndexes = childrenArray
    .map((child, index) =>
      isValidElement(child) && (child.type as any).name === "Description"
        ? index
        : null
    )
    .filter((i) => i !== null) as number[];

  const onlyOneDescription = descriptionIndexes.length === 1;

  const enhancedChildren = childrenArray.map((child, index) => {
    if (isValidElement(child) && (child.type as any).name === "Description") {
      let space = 0;

      if (onlyOneDescription) {
        space = descriptionSpacing.single;
      } else {
        const isLast =
          index === descriptionIndexes[descriptionIndexes.length - 1];
        space = isLast ? descriptionSpacing.last : descriptionSpacing.middle;
      }

      return cloneElement(child as React.ReactElement<TextProps>, { space });
    }

    return child;
  });

  return (
    <div className={`${styles.container} ${className}`}>{enhancedChildren}</div>
  );
};
