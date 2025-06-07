import { ParallaxBanner as Parallax } from "react-scroll-parallax";
import { ParallaxProvider } from "react-scroll-parallax";

import { DownButton } from "../../scroll-widget/down-button/variant-1";

import styles from "./parallax.style.module.css";
import "@14islands/r3f-scroll-rig/css";

import fallbackVideo from "@skynoveau-ui/assets/banner/parallax/banner-video.mp4";

export const ParallaxBanner = ({ video = fallbackVideo }) => {
  return (
    <ParallaxProvider>
      <Parallax
        layers={[
          {
            // translateY: [0, 50],
            opacity: [1, 0.3],
            scale: [1, 2, "easeOutCubic"],
            shouldAlwaysCompleteAnimation: true,
            children: (
              <div className={styles.bannerWrapper}>
                <video className={styles.video} autoPlay loop muted>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className={styles.insetBoxShadow}>
                  <DownButton id="#view-section" />
                </div>
              </div>
            ),
          },
        ]}
        style={{ height: "calc(100vh - 100px)" }} // Set the height as needed
      />
    </ParallaxProvider>
  );
};
