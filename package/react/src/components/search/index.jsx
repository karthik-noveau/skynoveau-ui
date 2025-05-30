import { Form, Input } from "antd";
import { RiSearchLine } from "react-icons/ri";

import { AntForm } from "package/react/src/components/form";
import { useDebounce } from "@hooks";

import styles from "./search.module.css";
import { useEffect, useState } from "react";

export const Search = ({ className, onChange, value = "" }) => {
  const [inputValue, setInputValue] = useState(value);
  const debouncedOnChange = useDebounce(onChange);

  // Sync with external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <AntForm className={`${styles.antSearch}`} customButton={true}>
      <div className={styles.container}>
        <Form.Item name="search" className={styles.searchInput}>
          <Input
            placeholder="Search..."
            name="search"
            onChange={handleInputChange}
            value={inputValue}
          />
          <RiSearchLine className={styles.icon} />
        </Form.Item>
      </div>
    </AntForm>
  );
};
