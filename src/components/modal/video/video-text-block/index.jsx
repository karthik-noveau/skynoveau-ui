import { PiPlayCircleLight } from "react-icons/pi";

import styles from "./style.module.css";

export const VideoTextBlock = ({ setOpenVideo, src }) => {
  return (
    <div className={` ${styles.videoPlayerContainer}`}>
      <video autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={`${styles.textSection}`}>
        <h2 className={`text-32 weight-200 ${styles.title}`} id={`sui-aos`}>
          Weaving Traditions, Stories & Passion.
        </h2>
        <div
          className={`text-16 ${styles.watchButton}`}
          onClick={() => {
            setOpenVideo(true);
          }}
          id={`sui-aos`}
        >
          <PiPlayCircleLight className={`${styles.icon}`} /> Watch
        </div>
      </div>
    </div>
  );
};
