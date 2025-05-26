import React from "react";
import { RxCross1 } from "react-icons/rx";
import "./styles.css"; // Import your custom styles
import styles from "./modal.module.css";

export const VideoModal = ({ close, open, videoSrc }) => {
  return (
    <div className={`modal ${open ? "show" : ""}`} onClick={() => close(false)}>
      <div
        className={`modal-content ${styles.zoomEffect}`}
        onClick={(e) => e.stopPropagation()}
      >
        <video width="100%" controls autoPlay loop playsInline muted>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <span className="close" onClick={() => close(false)}>
          <RxCross1 />
        </span>
      </div>
    </div>
  );
};
