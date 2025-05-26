import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "./style.module.css";

export const VideoModal = ({ close, open, src }) => {
  return (
    <div
      className={`${styles.modal} ${open ? styles.show : ""}`}
      onClick={() => close(false)}
    >
      <div
        className={`${styles.modalContent}`}
        onClick={(e) => e.stopPropagation()}
      >
        <video width="100%" controls autoPlay loop>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <span className={styles.close} onClick={() => close(false)}>
          <RxCross1 />
        </span>
      </div>
    </div>
  );
};
