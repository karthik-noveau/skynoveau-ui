import React from "react";
import { Select } from "antd";
import { VscChevronDown } from "react-icons/vsc";

import styles from "./dropdown.override.module.css";

export const DropDown = ({
  className,
  disabled,
  onChange,
  defaultValue,
  data = DATA,
}) => {
  return (
    <Select
      disabled={disabled}
      className={`${styles.dropdown} ${className}`}
      defaultValue={defaultValue}
      onChange={onChange}
      options={data}
      suffixIcon={<VscChevronDown className={`${styles.customIcon}`} />}
    />
  );
};

const DATA = [
  {
    value: "Cotton-wear",
    label: "Cotton wear",
  },
  {
    value: "Evening-wear",
    label: "Evening wear",
  },
];
