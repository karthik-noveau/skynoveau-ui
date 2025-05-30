import { Form, Input } from "antd";

import { AOS_ANIMATION } from "package/react/src/components/aos-animation/index";
import { AntForm } from "package/react/src/components/form";

import styles from "./form.module.css";

export const ContactForm = () => {
  return (
    <AntForm className={styles.contactForm}>
      <div className={`${styles.inputsContainer}`}>
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
      </div>

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
    </AntForm>
  );
};
