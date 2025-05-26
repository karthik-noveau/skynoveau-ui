import React from "react";

import { Button as BaseButton } from "../base.jsx";
import { Loader } from "@components/loader/basic";
import { LOADER_SIZE } from "@components/loader/constant.js";

import styles from "./button.module.css";

export const Button = ({
  children,
  loading,
  onClick,
  disable,
  className,
  ...rest
}) => {
  return (
    <BaseButton
      className={className}
      onClick={onClick}
      disable={disable}
      loading={loading}
      {...rest}
    >
      {!disable && loading && (
        <span className={`${styles.loaderContainer}`}>
          {" "}
          <Loader
            showText={false}
            size={LOADER_SIZE.TINY}
            color="inherit"
          />{" "}
        </span>
      )}
      {children}
    </BaseButton>
  );
};
