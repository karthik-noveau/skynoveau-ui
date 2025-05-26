import { message as antMessage } from "antd";
import { TOAST_TYPES } from "../constant";

export const Toast = () => {
  const [messageApi, contextHolder] = antMessage.useMessage();

  const showMessage = ({
    top = "5vh",
    autoClose = true,
    type = TOAST_TYPES.ERROR,
    message = "",
  }) => {
    messageApi.open({
      style: {
        marginTop: top,
      },
      type: type,
      content: message,
      duration: autoClose ? 4 : 0,
    });
  };

  const destroy = () => {
    if (messageApi && typeof messageApi.destroy === "function") {
      messageApi.destroy();
    } else {
      console.warn("Destroy is not available on API.");
    }
  };

  return {
    destroy,
    showMessage,
    toastContext: contextHolder,
  };
};
