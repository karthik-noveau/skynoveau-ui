import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";

import { useScrollToTop } from "@hooks";
import { Login } from "@components/login";
import { cartService, userService } from "@app/service/service";
import { Toast } from "@components/form/toast/compact";
import { TOAST_TYPES } from "@components/form/toast/constant";
import { useEcommerceStore } from "@app/store";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";
import { STORAGE_KEYS } from "@app/config";
import { hasData } from "@utils";

import styles from "./login.module.css";

import logo from "@assets/logo/primary/logo.png";
import { useShallow } from "zustand/react/shallow";

export default function LoginPage() {
  const { toastContext, showMessage } = Toast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { invalidateQuery } = useInvalidateQuery();
  const { accountInfo } = useEcommerceStore(
    useShallow((state) => ({ accountInfo: state.accountInfo }))
  );

  useScrollToTop();

  useEffect(() => {
    if (accountInfo?.["userId"] && accountInfo?.["isAccountActivated"]) {
      navigate(location.state?.redirectPath || "/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    await userService
      .login({ ...payload })
      .then((result) => {
        showMessage({
          message: "Login successful",
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
        showMessage({
          message: error.message,
        });
        setLoading(false);
      });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Login - Dhanika</title>
        <meta
          name="description"
          content="Login to your Dhanika account and access your personalized dashboard, orders, and preferences."
        />
        <meta
          name="keywords"
          content="Dhanika login, user login, dashboard access"
        />
      </Helmet>
      {toastContext}

      <Login
        onSubmit={onSubmit}
        image={logo}
        loading={loading}
        className={styles.image}
        redirectPath={location.state?.redirectPath || "/"}
      />
    </React.Fragment>
  );
}
