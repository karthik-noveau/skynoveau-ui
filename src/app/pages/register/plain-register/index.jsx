import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Register } from "@components/register";
import { cartService, userService } from "@app/service/service";
import { Toast } from "@components/form/toast/compact";
import { TOAST_TYPES } from "@components/form/toast/constant";

import { useEcommerceStore } from "@app/store";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";

import styles from "../../login/login.module.css";

import logo from "@assets/logo/primary/logo.png";
import { STORAGE_KEYS } from "@app/config";
import { hasData } from "@utils";

export const PlainRegister = () => {
  const { toastContext, showMessage } = Toast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { invalidateQuery } = useInvalidateQuery();

  const onSubmit = async (values) => {
    if (loading) return;

    const payload = {
      firstName: values.firstName,
      email: values.email,
      password: values.password,
      checkUnique: true,
    };
    setLoading(true);

    await userService
      .register({ payload })
      .then((result) => {
        showMessage({
          message: "Register successful",
          type: TOAST_TYPES.SUCCESS,
        });

        // cart sync
        let storageCart =
          JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_CART)) || {};
        if (hasData(storageCart)) {
          cartService
            .createCartProduct({
              userId: result._id,
              products: Object.values(storageCart),
              isAddCountMerge: true,
            })
            .then(() => {
              useEcommerceStore.getState().setStorageCart({ isEmpty: true });
              invalidateQuery([QUERY_KEYS.cartCount]);
            });
        }

        useEcommerceStore.getState().setAccountInfo({
          userId: result._id,
          email: values.email,
          isAccountActivated: false,
        });
        navigate(location.state?.redirectPath || "/", { state: null });
        setLoading(false);
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
        redirectPath={location.state?.redirectPath || "/"}
        className={styles.image}
      />
    </React.Fragment>
  );
};
