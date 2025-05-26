import { Form, Input } from "antd";

import styles from "./form.module.css";
import { InputWidget } from "@components/form";

export const CheckoutForm = () => {
  return (
    <>
      <div className={`${styles.twoColumn}`}>
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
        <InputWidget
          label="Last Name"
          Component={
            <Form.Item
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="lastName" />
            </Form.Item>
          }
        />
      </div>
      <InputWidget
        label="Flat / Apartment / House No."
        Component={
          <Form.Item
            name="flatNo"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input name="flatNo" />
          </Form.Item>
        }
      />
      <InputWidget
        label="Street"
        Component={
          <Form.Item
            name="street"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input name="street" />
          </Form.Item>
        }
      />
      <div className={`${styles.threeColumn}`}>
        <InputWidget
          label="City"
          Component={
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="city" />
            </Form.Item>
          }
        />
        <InputWidget
          label="State"
          Component={
            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="state" />
            </Form.Item>
          }
        />
        <InputWidget
          label="Pincode"
          Component={
            <Form.Item
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="pincode" />
            </Form.Item>
          }
        />
      </div>
      <InputWidget
        label="Phone Number"
        Component={
          <Form.Item
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <Input name="phoneNumber" />
          </Form.Item>
        }
      />
      <InputWidget
        label="email"
        Component={
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "",
                type: "email",
              },
            ]}
          >
            <Input name="email" />
          </Form.Item>
        }
      />
    </>
  );
};
