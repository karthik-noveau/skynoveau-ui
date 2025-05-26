import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaCopyright } from "react-icons/lia";

import { FOOTER_MENU_LINKS, SOCIAL_MEDIA_LINKS } from "./constant";
import { formatDate } from "@utils";

import WhiteLogo from "@assets/logo/primary/logo.png";

import styles from "./footer.style.module.css";

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.logoLinkcontainer}>
          {/* ---------- logo section ----------- */}
          <div className={styles.logoContainerInfo}>
            <img alt="dhanika-logo" src={WhiteLogo} className={styles.logo} />
            <p className={`text-16 weight-400 ${styles.followUsText}`}>
              Follow Us
            </p>
            <div className={styles.mediaIconContainer}>
              {SOCIAL_MEDIA_LINKS.map((item, index) => {
                return (
                  <a
                    href={item.path}
                    target="_blank"
                    key={index}
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
                {/* <div className={`text-18 ${styles.title}`}>{item.title}</div> */}
                {item["links"].map((data, index) => {
                  return (
                    <div className={`${styles.linkInfoContainer}`} key={index}>
                      <div
                        className={`text-16 weight-300 ${styles.linkInfo} ${
                          data?.path && styles.pathStyles
                        }`}
                        key={index}
                        onClick={() => data?.path && navigate(data.path)}
                        dangerouslySetInnerHTML={{
                          __html: data.name,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* --------- copy rights ---------- */}
        <div className={`text-16 weight-300 ${styles.copyRightWrapper}`}>
          <div className={`${styles.copyRightContainer}`}>
            <span>
              <span>
                <LiaCopyright className={`${styles.icon}`} />
              </span>
              {formatDate().year} Dhanika All rights reserved | Powered by
              Woodhead Creative
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
