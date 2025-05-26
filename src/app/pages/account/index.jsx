import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { BsBox } from "react-icons/bs";
import { TfiLock } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { useScrollToTop } from "@hooks";
import { LeftPanel } from "./left-panel";
import { MyProfile } from "./tab-components/my-profile";
import { Orders } from "./tab-components/orders";
import { Password } from "./tab-components/password";
import { Footer } from "@app/components/footer";

import styles from "./account.module.css";

export const ACCOUNT_TABS = [
  {
    id: "profile",
    tabName: "Profile",
    component: (props) => <MyProfile {...props} />,
    icon: {
      render: (props) => {
        return <FaCartShopping {...props} />;
      },
      style: {
        position: "relative",
        top: "0px",
      },
    },
  },
  {
    id: "orders",
    tabName: "Orders",
    component: (props) => <Orders data {...props} />,
    icon: {
      render: (props) => {
        return <BsBox {...props} />;
      },
      style: {
        position: "relative",
        top: "0px",
      },
    },
  },
  {
    id: "change-password",
    tabName: "Change Password",
    component: (props) => <Password {...props} />,
    icon: {
      render: (props) => {
        return <TfiLock {...props} />;
      },
      style: {
        position: "relative",
        top: "-2px",
      },
    },
  },
  {
    id: "logout",
    tabName: "Logout",
    icon: {
      render: (props) => {
        return <FiLogOut {...props} />;
      },
      style: {
        position: "relative",
        top: "0px",
      },
    },
  },
];

export default function Account() {
  const { tabId: activeTabId } = useParams();
  useScrollToTop();

  const renderActiveComponent = ACCOUNT_TABS.find((tab) => {
    return tab.id === activeTabId;
  });

  return (
    <>
      <div
        className={`wrapper wrapper-margin wrapper-padding-bottom ${styles.accountWrapper}`}
      >
        <h1 className={`text-26 weight-400 container ${styles.accountTitle}`}>
          My Account
        </h1>
        <div
          className={`container container-margin-top container-padding-top ${styles.accountContainer}`}
        >
          <LeftPanel tabsList={ACCOUNT_TABS} activeTabId={activeTabId} />
          <div className={`${styles.rightPanelWrapper}`}>
            {renderActiveComponent?.component()}
          </div>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
