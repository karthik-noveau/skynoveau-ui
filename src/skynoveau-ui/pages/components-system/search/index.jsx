import { useRef, useState } from "react";
import { Form, Input } from "antd";
import { v4 as uuidv4 } from "uuid";
import { RiSearchLine } from "react-icons/ri";

import antstyles from "@common/css-override/antform.override.module.css";
import styles from "./search.style.module.css";

export const ComponentSearch = ({ searchOnChange = () => {} }) => {
  let formRef = useRef(null);
  const uniqueId = uuidv4();

  const [inputValue, setInputValue] = useState("");

  const onFinish = (values) => {};
  const onFinishFailed = (errorInfo) => {};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setTimeout(() => {
      searchOnChange(e.target.value);
    }, 200);
  };

  return (
    <Form
      name="basic"
      id={`sui-form-${uniqueId}`}
      ref={formRef}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      className={`${antstyles.antSearch} ${styles.componentSearch}`}
    >
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
    </Form>
  );
};
