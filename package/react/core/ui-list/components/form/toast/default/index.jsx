import { notification } from "antd";

import { TOAST_TYPES } from "../constant";

import styles from "./notification.module.css";

export const Toast = () => {
  const [api, contextHolder] = notification.useNotification({
    top: 100,
  });

  const showMessage = ({
    autoClose = true,
    message = "",
    type = TOAST_TYPES.ERROR,
    showProgress = true,
    duration,
  }) => {
    let delay = type === TOAST_TYPES.ERROR ? 10 : 4;
    if (duration) {
      delay = duration;
    }

    api[type]({
      message: message,
      className: `${styles.notification}`,
      showProgress: showProgress,
      pauseOnHover: true,
      duration: autoClose ? delay : 0,
    });
  };

  const destroy = () => {
    if (api && typeof api.destroy === "function") {
      api.destroy();
    } else {
      console.warn("Destroy is not available on API.");
    }
  };

  return {
    toastContext: contextHolder,
    showMessage,
    destroy,
  };
};
