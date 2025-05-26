import React from "react";

import { useScrollToTop } from "@hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

import { Button } from "@components/button/basic";
import { Image } from "@components/image";
import { useEcommerceStore } from "@app/store";
import { useFetchUser } from "@app/service/query";
import { Loader } from "@components/loader/basic/compact";

import styles from "./success.module.css";

import successIcon from "../icon/success-icon.png";
import { REGISTER_TYPE } from "@app/pages/register";

export default function PaymentSuccessStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentStatus } = location?.state || {};

  const { accountInfo } = useEcommerceStore(
    useShallow((state) => ({
      accountInfo: state.accountInfo,
    }))
  );

  const { data: fetchedUser, isFetching } = useFetchUser({
    userId: accountInfo.userId,
  });

  useScrollToTop();

  if (paymentStatus !== "success") {
    navigate("/cart");
    return;
  }

  if (isFetching) {
    return (
      <div className={`${styles.loaderContainer}`}>
        <Loader />;
      </div>
    );
  } else {
    return (
      <div className={`${styles.orderWrapper}`}>
        <div className={`${styles.orderContainer}`}>
          <Image
            imageSrc={successIcon}
            alt="order-success"
            className={`${styles.successIcon}`}
          />
          <div className={`${styles.textContainer}`}>
            <p className={`text-22 ${styles.title}`}>
              Order placed successfully!
            </p>

            {fetchedUser?.password ? (
              <>
                <p className={`text-18 weight-300 ${styles.description}`}>
                  view your order details.
                </p>
                <Button
                  className={`${styles.button}`}
                  onClick={() => {
                    navigate("/account/orders");
                  }}
                >
                  Go to Orders
                </Button>
              </>
            ) : (
              <>
                <p className={`text-18 weight-300 ${styles.description}`}>
                  Set a password to view your order and track future purchases
                </p>
                <Button
                  className={`${styles.button}`}
                  onClick={() => {
                    navigate("/register", {
                      state: {
                        registerType: REGISTER_TYPE.COMPLETE,
                      },
                    });
                  }}
                >
                  Complete your account
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
