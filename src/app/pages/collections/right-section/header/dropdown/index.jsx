import React from "react";
import { Select } from "antd";
import { VscChevronDown } from "react-icons/vsc";

import styles from "./dropdown.override.module.css";

export const DropDown = (props) => {
  const { className, onChange, value, dataSource = [] } = props;

  return (
    <Select
      className={`${styles.suiDropdown} ${className}`}
      value={value}
      onChange={onChange}
      options={dataSource}
      suffixIcon={<VscChevronDown className={`${styles.customIcon}`} />}
    />
  );
};
