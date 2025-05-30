import React from "react";
import { useNavigate } from "react-router-dom";

import { FOOTER_MENU_LINKS, SOCIAL_MEDIA_LINKS } from "./constant";
import { ImageLazyLoader } from "@common/lazy-loader/image";
import { AOS_ANIMATION } from "package/react/src/components/aos-animation";

import Logo from "@assets/logo/secondary/logo.png";

import styles from "./footer.style.module.css";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.logoLinkcontainer}>
          {/* ---------- logo section ----------- */}
          <div className={styles.logoContainerInfo}>
            <ImageLazyLoader
              image={Logo}
              className={styles.logo}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            />
            <div
              className={`text-18 ${styles.companyName}`}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              Skynoveau Technology
            </div>
            <div
              className={`text-14 ${styles.slogan}`}
              data-aos={AOS_ANIMATION.FADE_UP.TYPE}
              data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
            >
              The making wonders
            </div>
            <div className={styles.mediaIconContainer}>
              {SOCIAL_MEDIA_LINKS.map((item, index) => {
                return (
                  <a
                    href={item.path}
                    target="_blank"
                    key={index}
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                    rel="noreferrer"
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* ---------- link sections ---------- */}
          {FOOTER_MENU_LINKS.map((item, index) => {
            return (
              <div className={styles.menuLinksContainer} key={index}>
                <div className={`text-16 ${styles.title}`}>{item.title}</div>
                {item["links"].map((data, index) => {
                  return (
                    <div className={`${styles.linkInfoContainer}`}>
                      <div
                        className={`text-14 ${styles.linkInfo}`}
                        key={index}
                        onClick={() => data?.path && navigate(data.path)}
                        id={`sui-aos`}
                      >
                        {data.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* --------- copy rights ---------- */}
        <div className={styles.copyRightsContainer}>
          <div className={`text-14 ${styles.leftInfo}`}>
            All rights reserved by Skynoveau technology.
          </div>
          <div className={`text-14 ${styles.rightInfo}`}>
            <span>Powered by </span>
            <a href="https://skynoveau.in/" target="_blank" rel="noreferrer">
              Skynoveau Technology
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
