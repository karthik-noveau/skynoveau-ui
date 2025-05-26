import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";

import styles from "./cart.module.css";
import { useEcommerceStore } from "@app/store";
import { useShallow } from "zustand/react/shallow";
import { useFetchCartCount } from "@app/service/query";
import { REGISTER_TYPE } from "@app/pages/register";

export const CartMenu = ({ showText = false, className }) => {
  const [count, setCount] = useState(0);

  const {
    accountInfo,
    storedCart = {},
    storageCart,
  } = useEcommerceStore(
    useShallow((state) => ({
      accountInfo: state.accountInfo,
      storedCart: state.storedCart,
      storageCart: state.storageCart,
    }))
  );

  const navigate = useNavigate();

  const { data } = useFetchCartCount({
    userId: accountInfo?.["userId"],
    enabled: !!accountInfo?.["userId"],
  });

  useEffect(() => {
    if (!accountInfo?.["userId"]) {
      setCount(Object.keys(storageCart).length);
    }
  }, [storedCart, storageCart, accountInfo]);

  useEffect(() => {
    if (accountInfo?.["userId"] && typeof data?.count === "number") {
      setCount(data.count);
    }
  }, [accountInfo, data]);

  return (
    <div className={`${styles.cartContainer} ${className}`}>
      <AiOutlineUser
        className={`${styles.profileIcon}`}
        onClick={() => {
          if (accountInfo?.["userId"] && accountInfo?.["isAccountActivated"]) {
            navigate("/account/profile");
          } else if (
            accountInfo?.["userId"] &&
            !accountInfo?.["isAccountActivated"]
          ) {
            navigate("/register", {
              state: {
                redirectPath: "/account/profile",
                registerType: REGISTER_TYPE.COMPLETE,
              },
            });
          } else {
            navigate("/login", {
              state: { redirectPath: "/account/profile" },
            });
          }
        }}
      />
      <div
        className={`${styles.iconContainer}`}
        onClick={() => navigate("/cart")}
      >
        <FaCartShopping className={`${styles.icon}`} />
        <span className={`${styles.count}`}>{count}</span>
      </div>

      {showText && <p className={`text-18 weight-400`}>Cart</p>}
    </div>
  );
};
