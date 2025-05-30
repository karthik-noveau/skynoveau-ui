import React from "react";

import { BaseButton } from "../base/index.jsx";

import styles from "./button.module.css";
import { LOADER_SIZE } from "../../loader/constant.js";

const Button = ({
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

export default Button;
