import React from "react";
import { useNavigate } from "react-router-dom";

import { AntForm } from "package/react/src/components/form";
import { Form, Input } from "antd";
import { Button } from "package/react/src/components/button/basic";

import styles from "@components/login/login.module.css";

export const Register = ({
  image,
  title = "Register",
  buttonContent = "Submit",
  emailOnly = false,
  loading,
  fields = [],
  onSubmit,
  redirectPath,
  showDescription = true,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.loginSection} ${className}`}>
      <div className={`${styles.loginWrapper}`}>
        <div className={`${styles.loginContainer}`}>
          <img
            className={`logo ${styles.logo}`}
            src={image}
            alt="logo"
            onClick={() => navigate("/")}
          />
          <h1 className={`text-22 weight-300 ${styles.title}`}>{title}</h1>
          <AntForm
            onSubmit={onSubmit}
            fields={fields}
            className={`${styles.loginForm}`}
            customButton={true}
          >
            {!emailOnly && (
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "",
                  },
                ]}
              >
                <Input placeholder="Name" name="name" />
              </Form.Item>
            )}

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
              <Input
                placeholder="Enter your mail id"
                name="email"
                readOnly={!!fields.length}
              />
            </Form.Item>

            {!emailOnly && (
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
            )}

            <Button
              loading={loading}
              type="primary"
              className={`text-16 weight-300 ${styles.submitButton}`}
            >
              {buttonContent}
            </Button>
            {showDescription && (
              <p className={`text-14 weight-300 ${styles.description}`}>
                Already have an account ?
                <span
                  onClick={() => {
                    navigate("/login", {
                      state: {
                        redirectPath,
                      },
                    });
                  }}
                >
                  <u>Login here</u>
                </span>
              </p>
            )}
          </AntForm>
        </div>
      </div>
    </div>
  );
};
