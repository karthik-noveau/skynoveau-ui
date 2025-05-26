import React from "react";

import { useScrollToTop } from "@hooks";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@components/button/basic";

import styles from "../success/success.module.css";

import errorIcon from "../icon/error-icon.png";
import { Image } from "@components/image";
import { WhatsappAPI } from "@components/whatsapp";
import { useEcommerceStore } from "@app/store";
import { useShallow } from "zustand/react/shallow";

export default function PaymentFailedStatus() {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentStatus } = location?.state || {};
  const { accountInfo } = useEcommerceStore(
    useShallow((state) => ({ accountInfo: state.accountInfo }))
  );

  useScrollToTop();

  if (paymentStatus !== "failed") {
    navigate("/cart");
    return;
  }

  return (
    <div className={`${styles.orderWrapper}`}>
      <div className={`${styles.orderContainer}`}>
        <Image
          imageSrc={errorIcon}
          alt="order-failed"
          className={`${styles.errorIcon}`}
        />
        <div className={`${styles.textContainer}`}>
          <p className={`text-24 ${styles.title}`}>Payment Failed</p>
          <p
            className={`text-18 weight-200 ${styles.title}`}
            onClick={() => {
              window.open(
                WhatsappAPI({
                  phoneNumber: "9360375911",
                  message: `Issue Type : Payment \n App: ${accountInfo?.userId}`,
                })
              );
            }}
          >
            Contact us to check the payment status
          </p>
          <Button
            className={`${styles.button}`}
            onClick={() => {
              navigate("/cart");
            }}
          >
            View Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
