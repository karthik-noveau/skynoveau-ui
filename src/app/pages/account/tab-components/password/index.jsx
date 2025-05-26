import { AntForm, InputWidget } from "@components/form";
import { Form, Input } from "antd";
import { useState } from "react";

import { Button } from "@components/button/ripple";
import { Toast } from "@components/form/toast/default";
import { useEcommerceStore } from "@app/store";
import { userService } from "@app/service/service";
import { TOAST_TYPES } from "@components/form/toast/constant";

import styles from "./password.module.css";

export const Password = () => {
  const { showMessage, toastContext } = Toast();
  const [loading, setLoading] = useState(false);

  const accountInfo = useEcommerceStore((state) => state.accountInfo);

  const onSubmit = (data) => {
    setLoading(true);

    if (data.newPassword !== data.confirmPassword) {
      showMessage({
        message: "Passwords do not match",
      });
      setLoading(false);
      return;
    }

    userService
      .updateUser({
        userId: accountInfo["userId"],
        payload: {
          password: data.newPassword,
        },
      })
      .then(() => {
        showMessage({
          type: TOAST_TYPES.SUCCESS,
          message: "Password updated successfully",
        });
        setLoading(false);
        // invalidateQuery([QUERY_KEYS.user]);
      })
      .catch((error) => {
        showMessage({
          type: TOAST_TYPES.ERROR,
          message: "Failed to update password",
        });
        setLoading(false);
      });
  };

  return (
    <>
      {toastContext}

      <AntForm
        className={`${styles.passwordForm}`}
        onSubmit={onSubmit}
        customButton={true}
      >
        <InputWidget
          label="New Password"
          Component={
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="newPassword" />
            </Form.Item>
          }
        />

        <InputWidget
          label="Confirm Password"
          Component={
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "",
                },
              ]}
            >
              <Input name="confirmPassword" />
            </Form.Item>
          }
        />

        <Button
          className={`${styles.button}`}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          Save
        </Button>
      </AntForm>
    </>
  );
};
