import React from "react";

import { Loader } from "@components/loader/basic";
import { LOADER_SIZE } from "@components/loader/constant";
import { Button as BaseButton } from "@components/button/base.jsx";

import styles from "./button.module.css";

export const Button = (props) => {
  const { children, loading, onClick, className, ...rest } = props;

  return (
    <>
      <BaseButton
        className={`${!props?.disable && styles.shineEffect} ${className}`}
        onClick={onClick}
        loading={loading}
        {...rest}
      >
        {loading && (
          <span className={`${styles.loaderContainer}`}>
            <Loader
              showText={false}
              size={LOADER_SIZE.TINY}
              color="var(--white-color)"
            />
          </span>
        )}
        {children}
      </BaseButton>
    </>
  );
};
