import React from "react";

import styles from "./login.module.css";
import { AntForm } from "@components/form";
import { Form, Input } from "antd";
import { Button } from "@components/button/ripple";
import { useNavigate } from "react-router-dom";
import { Image } from "@components/image";

export const Login = ({
  loading = false,
  onSubmit,
  image,
  title = "Login",
  allowLink = true,
  redirectPath,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.loginSection} ${className}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginContainer}`}>
          <Image
            imageSrc={image}
            className={`logo ${styles.logo}`}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <h1 className={`text-22 weight-300 ${styles.title}`}>{title}</h1>
          <AntForm
            onSubmit={onSubmit}
            className={`${styles.loginForm}`}
            customButton={true}
          >
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
              <Input placeholder="Enter your mail id" name="email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "",
                },
                {
                  validator: (_, value) => {
                    if (!value || value.trim() === "") {
                      return Promise.reject(
                        new Error("Password cannot be empty")
                      );
                    }
                    if (value.trim().length < 4) {
                      return Promise.reject(
                        new Error("Password must be at least 4 characters")
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input placeholder="Password" name="password" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={`${styles.submitButton}`}
            >
              <p className={`text-16 weight-300`}>Submit</p>
            </Button>
            {allowLink && (
              <>
                <p className={`text-14 weight-300 ${styles.description}`}>
                  Don’t have an account ?
                  <span
                    onClick={() => {
                      navigate("/register", {
                        state: {
                          redirectPath,
                        },
                      });
                    }}
                  >
                    <u>Register here</u>
                  </span>
                </p>
              </>
            )}
          </AntForm>
        </div>
      </div>
    </div>
  );
};
