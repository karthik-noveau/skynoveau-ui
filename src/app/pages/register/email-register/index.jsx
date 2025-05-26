import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollToTop } from "@hooks";
import { Register } from "@components/register";
import { cartService, userService } from "@app/service/service";
import { Toast } from "@components/form/toast/default";
import { TOAST_TYPES } from "@components/form/toast/constant";

import logo from "@assets/logo/primary/logo.png";
import { useEcommerceStore } from "@app/store";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";

import styles from "../../login/login.module.css";
import { STORAGE_KEYS } from "@app/config";
import { hasData } from "@utils";

export const EmailRegister = () => {
  const { toastContext, showMessage } = Toast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { invalidateQuery } = useInvalidateQuery();

  useScrollToTop();

  const onSubmit = async (values) => {
    if (loading) return;

    setLoading(true);

    await userService
      .register({ email: values.email })
      .then((result) => {
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
          isAccountActivated: result?.password ? true : false,
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
        emailOnly={true}
        title={"Continue with Email"}
        image={logo}
        redirectPath={"/checkout"}
        className={styles.image}
        showDescription={false}
        buttonContent={"Continue"}
      />
    </React.Fragment>
  );
};
