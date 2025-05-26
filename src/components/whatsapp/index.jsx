import React from "react";

import { IoLogoWhatsapp } from "react-icons/io";

import styles from "./style.module.css";

const WHATSAPP_MESSAGE =
  "Hi there! I would like to know more about your services.";

export const WhatsApp = ({
  className,
  phoneNumber,
  message = WHATSAPP_MESSAGE,
}) => {
  return (
    <React.Fragment>
      <a
        href={WhatsappAPI({
          phoneNumber: phoneNumber,
          message: message,
        })}
        target="_blank"
        rel="noreferrer"
        className={`${styles.whatsappContainer} ${className}`}
      >
        <IoLogoWhatsapp className={styles.icon} />
      </a>
    </React.Fragment>
  );
};

export const WhatsappAPI = ({ phoneNumber, message }) => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
