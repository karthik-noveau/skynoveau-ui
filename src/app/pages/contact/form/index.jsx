import { useRef, useState } from "react";
import { Button, Form, Input } from "antd";
import emailjs from "@emailjs/browser";
import { v4 as uuidv4 } from "uuid";

import { AOS_ANIMATION } from "@components/aos-animation/index";

import antstyles from "@common/css-override/antform.override.module.css";
import styles from "./contactform.style.module.css";

const SERVICE_ID = "service_jo8uwra";
const TEMPLATE_ID = "template_wmzwm2a";
const PUBLICK_KEY = "YP-g34Pu1ZK4OB0bU";

export const ContactForm = () => {
  const [buttonText, setButtonText] = useState("Submit");
  let formRef = useRef(null);
  const uniqueId = uuidv4();

  const onFinish = (values) => {
    setButtonText("Sending...");
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, `#sui-form-${uniqueId}`, {
        publicKey: PUBLICK_KEY,
      })
      .then(
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
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your name!",
          },
        ]}
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <Input placeholder="First name" name="firstName" />
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
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
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
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <Input placeholder="Phone number" name="phoneNumber" />
      </Form.Item>

      <Form.Item
        name="subject"
        rules={[
          {
            required: true,
            message: "Please enter your Subject!",
          },
        ]}
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <Input placeholder="Subject" name="subject" />
      </Form.Item>

      <Form.Item
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
      </Form.Item>

      <Form.Item
        className="btn"
        data-aos={AOS_ANIMATION.FADE_UP.TYPE}
        data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
      >
        <Button type="primary" htmlType="submit">
          {buttonText}
        </Button>
      </Form.Item>
    </Form>
  );
};
