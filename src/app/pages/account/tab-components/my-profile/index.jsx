/* eslint-disable react-hooks/exhaustive-deps */
import { AntForm, InputWidget } from "@components/form";
import { Form, Input } from "antd";

import styles from "./profile.module.css";
import { Button } from "@components/button/ripple";
import { useFetchUser } from "@app/service/query";
import { useEcommerceStore } from "@app/store";
import { useEffect, useState } from "react";
import { userService } from "@app/service/service";
import { Toast } from "@components/form/toast/default";
import { TOAST_TYPES } from "@components/form/toast/constant";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";
import { ProfileSkeleton } from "./skeleton-loader";
import { endApiLoading, startApiLoading } from "@utils";

export const MyProfile = () => {
  const [fields, setFields] = useState({});
  const { showMessage, toastContext } = Toast();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const { invalidateQuery } = useInvalidateQuery();

  const accountInfo = useEcommerceStore((state) => state.accountInfo);
  const {
    data: fetchedUser,
    isFetching,
    error,
  } = useFetchUser({
    userId: accountInfo["userId"],
  });

  console.log("isFetching", isFetching, fetchedUser, error);

  useEffect(() => {
    if (fetchedUser) {
      setFields([
        { name: ["email"], value: fetchedUser.email },
        { name: ["firstName"], value: fetchedUser.firstName },
        { name: ["lastName"], value: fetchedUser.lastName },
        { name: ["phoneNumber"], value: fetchedUser.phoneNumber },
      ]);
    }
  }, [fetchedUser]);

  useEffect(() => {
    let startTime = startApiLoading({ setLoading });
    if (isFetching || true) {
      endApiLoading({ startTime, setLoading });
    }
  }, []);

  const onSubmit = (values) => {
    setButtonLoading(true);
    userService
      .updateUser({
        userId: accountInfo["userId"],
        ...values,
      })
      .then(() => {
        showMessage({
          type: TOAST_TYPES.SUCCESS,
          message: "Profile updated successfully",
        });
        setButtonLoading(false);
        invalidateQuery([QUERY_KEYS.user]);
      })
      .catch((error) => {
        showMessage({
          type: TOAST_TYPES.ERROR,
          message: "Failed to update profile",
        });
        setButtonLoading(false);
      });
  };

  if (loading) {
    return <ProfileSkeleton />;
  } else {
    return (
      <>
        {toastContext}
        <AntForm
          fields={fields}
          className={`${styles.accountForm}`}
          customButton={true}
          onSubmit={onSubmit}
        >
          <InputWidget
            label="Email"
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
          <Button
            className={`${styles.button}`}
            loading={buttonLoading}
            Button
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </AntForm>
      </>
    );
  }
};
