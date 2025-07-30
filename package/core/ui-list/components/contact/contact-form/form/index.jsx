import { useRef, useState } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

import antstyles from "@components/form/antform.override.module.css";
import styles from "./contactform.style.module.css";
import { CheckBox } from "@app/pages/collections/left-section/filter/checkbox";

const SERVICE_ID = "service_elabuly";
const TEMPLATE_ID = "template_ni7r3tp";
const PUBLICK_KEY = "AqjIy8zs2ojCDKpHM";

export const ContactForm = () => {
  const [buttonText, setButtonText] = useState("Submit");
  let formRef = useRef(null);
  const uniqueId = uuidv4();

  const onFinish = (values) => {
    setButtonText("Sending...");

    const templateParams = {
      firstName: values.firstName,
      email: values.email,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth?.format("DD-MM-YYYY") || "",
      anniversaryDate: values.anniverseryDate?.format("DD-MM-YYYY") || "",
      recieveUpdates: values.RecieveUpdates ? "Yes" : "No",
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLICK_KEY).then(
      () => {
        setButtonText("Mail Sent");
        setTimeout(() => {
          setButtonText("Submit");
        }, 2000);
      },
      (error) => {
        setButtonText("Mail not send");
        setTimeout(() => {
          setButtonText("Submit");
        }, 4000);
      }
    );
  };
  const onFinishFailed = (errorInfo) => {};

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
      className={`${antstyles.antForm} ${styles.contactForm}`}
    >
      <div className={`${styles.inputsContainer}`}>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder="Name" name="firstName" />
        </Form.Item>

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

        <Form.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: "Please enter your Phone number!",
            },
          ]}
        >
          <Input placeholder="Phone number" name="phoneNumber" />
        </Form.Item>

        <Form.Item name="RecieveUpdates" valuePropName="checked">
          <CheckBox className={`text-14 ${styles.checkboxText}`}>
            Would you like to receive updates on our products?
          </CheckBox>
        </Form.Item>
      </div>

      {/* <Form.Item
        name="message"
        rules={[
          {
            required: true,
            message: "Please enter your Message!",
          },
        ]}
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <Input.TextArea
          placeholder="Tell us about yourself..."
          name="message"
        />
      </Form.Item> */}

      <div className={`${styles.inputsSection}`}>
        <Form.Item
          name="dateOfBirth"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a date!",
          //   },
          // ]}
        >
          <DatePicker placeholder="Date of Birth" />
        </Form.Item>
        <Form.Item
          name="anniverseryDate"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please select a date!",
          //   },
          // ]}
        >
          <DatePicker placeholder="Anniversary Date" />
        </Form.Item>
      </div>

      <Form.Item className="btn">
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
