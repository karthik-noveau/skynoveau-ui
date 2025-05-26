import { useRef } from "react";
import { Form, Input } from "antd";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@components/button/basic";

import antstyles from "@components/form/antform.override.module.css";
import styles from "./form.module.css";

const SERVICE_ID = "service_jo8uwra";
const TEMPLATE_ID = "template_wmzwm2a";
const PUBLICK_KEY = "YP-g34Pu1ZK4OB0bU";

export const AntForm = ({
  className,
  fields,
  children = defaultFormValues(),
  onSubmit = null,
  onSubmitError = null,
  customButton,
  sendMail,
  loading,
}) => {
  // const [isLoading, setIsLoading] = useState(false);
  let formRef = useRef(null);
  const uniqueId = uuidv4();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (onSubmit && !loading) {
      onSubmit(values);
    }

    if (sendMail) {
      // setIsLoading(true);
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, `#sui-form-${uniqueId}`, {
          publicKey: PUBLICK_KEY,
        })
        .then(
          () => {
            // setIsLoading(false);
          },
          (error) => {
            // setIsLoading(false);
          }
        );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

    // Focus on the first error field
    if (errorInfo?.errorFields?.length) {
      const firstErrorFieldName = errorInfo.errorFields[0].name[0];
      formRef.current?.scrollToField(firstErrorFieldName, {
        behavior: "smooth",
      });
      const inputElement = document.querySelector(
        `[name="${firstErrorFieldName}"]`
      );
      inputElement?.focus();
    }

    onSubmitError && onSubmitError(errorInfo);
  };

  return (
    <Form
      name="basic"
      fields={fields}
      id={`sui-form-${uniqueId}`}
      ref={formRef}
      initialValues={{
        remember: true,
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      className={`${antstyles.antForm} ${className}`}
    >
      {children}

      {!customButton && (
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      )}
    </Form>
  );
};

export const InputWidget = ({ label, Component }) => {
  return (
    <div className={`${styles.inputWidgetContainer}`}>
      <label className={`text-14 ${styles.label}`}>{label}</label>
      {Component}
    </div>
  );
};

const defaultFormValues = () => {
  return (
    <>
      {/* ---------- text with label ---------- */}
      <InputWidget
        label="First Name"
        Component={
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input name="firstName" />
          </Form.Item>
        }
      />

      {/* ---------- text ---------- */}
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
      >
        <Input placeholder="First name" name="firstName" />
      </Form.Item>

      {/* ---------- email ---------- */}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please enter your Email Id!",
            type: "email",
          },
        ]}
      >
        <Input placeholder="Email Id" name="email" />
      </Form.Item>

      {/* ---------- text area ---------- */}
      <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: "Please enter your Message!",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Tell us about yourself..."
          name="message"
        />
      </Form.Item>
    </>
  );
};
