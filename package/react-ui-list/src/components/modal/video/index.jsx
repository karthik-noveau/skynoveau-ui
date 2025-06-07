import React, { useState } from "react";

import { VideoTextBlock } from "./video-text-block";
import { VideoModal } from "./modal";

import "./styles.css";

import Video from "@skynoveau-ui/assets/modal/process-video.mp4";

export const Modal = ({ src = Video }) => {
  const [openVideo, setOpenVideo] = useState(false);
  return (
    <>
      <VideoTextBlock src={Video} setOpenVideo={setOpenVideo} />
      {openVideo && (
        <VideoModal open={openVideo} src={src} close={setOpenVideo} />
      )}
    </>
  );
};
