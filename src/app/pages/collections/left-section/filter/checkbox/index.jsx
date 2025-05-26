import React from "react";
import { Checkbox } from "antd";

import styles from "./checkbox.override.module.css";

export const CheckBox = ({
  children,
  checked,
  readOnly,
  className,
  onChange = () => {},
  ...rest
}) => {
  return (
    <Checkbox
      onChange={onChange}
      checked={readOnly ? true : checked}
      className={`${styles.suiCheckBox} ${readOnly && styles.readOnly}  ${className}`}
      {...rest}
    >
      {children}
    </Checkbox>
  );
};
