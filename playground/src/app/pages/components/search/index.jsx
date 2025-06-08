import { useRef, useState } from "react";
import { Form, Input } from "antd";
import { RiSearchLine } from "react-icons/ri";

import styles from "./search.style.module.css";

export const ComponentSearch = ({ searchOnChange = () => {} }) => {
  let formRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const onFinish = () => {};
  const onFinishFailed = () => {};

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setTimeout(() => {
      searchOnChange(e.target.value);
    }, 200);
  };

  return (
    <Form
      name="basic"
      ref={formRef}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      className={`${styles.componentSearch}`}
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
