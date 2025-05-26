import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollToTop } from "@hooks";
import { Register } from "@components/register";
import { userService } from "@app/service/service";
import { Toast } from "@components/form/toast/compact";
import { TOAST_TYPES } from "@components/form/toast/constant";
import { useEcommerceStore } from "@app/store";

import styles from "../../login/login.module.css";

import logo from "@assets/logo/primary/logo.png";
import { useShallow } from "zustand/react/shallow";

export const CompleteRegister = () => {
  const { toastContext, showMessage } = Toast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [fields, setFields] = useState([]);

  const { accountInfo } = useEcommerceStore(
    useShallow((state) => ({ accountInfo: state.accountInfo }))
  );

  useScrollToTop();

  useEffect(() => {
    setFields([{ name: ["email"], value: accountInfo.email }]);
  }, [accountInfo.email, location]);

  const onSubmit = async (values) => {
    if (loading) return;

    const payload = {
      userId: accountInfo.userId,
      firstName: values.firstName,
      email: values.email,
      password: values.password,
    };
    setLoading(true);

    await userService
      .updateUser({ ...payload })
      .then((result) => {
        showMessage({
          message: "Account created successful",
          type: TOAST_TYPES.SUCCESS,
        });

        useEcommerceStore.getState().setAccountInfo({
          userId: result._id,
          email: values.email,
          isAccountActivated: true,
        });
        setLoading(false);
        navigate("/account/orders", { state: null });
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          message: error.message,
          type: TOAST_TYPES.ERROR,
        });
      });
  };

  return (
    <React.Fragment>
      {toastContext}

      <Register
        onSubmit={onSubmit}
        loading={loading}
        image={logo}
        fields={fields}
        redirectPath={"/account/orders"}
        className={styles.image}
        title="Continue to Account"
        showDescription={false}
      />
    </React.Fragment>
  );
};
