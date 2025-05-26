import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { GrLocation } from "react-icons/gr";

import { ContactForm } from "./form";
import { AOS_ANIMATION } from "@components/aos-animation";

import styles from "./styles.module.css";

export const ContactComponent = ({ className }) => {
  return (
    <div className={`${styles.sectionWrapper} ${className}`}>
      <div className={styles.contactWrapper}>
        <div className={styles.titleInfo}>
          <h1
            data-aos={AOS_ANIMATION.FADE_UP.TYPE}
            data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
          >
            Get In Touch
          </h1>
          <p
            data-aos={AOS_ANIMATION.FADE_UP.TYPE}
            data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
          >
            Thank you for your interest
          </p>
        </div>

        <div className={styles.contactContainer}>
          <div className={styles.leftInfo}>
            <div className={styles.leftInfoWrapper}>
              <ContactForm />
            </div>
          </div>
          <div className={styles.rightInfo}>
            <div className={styles.rightInfoWrapper}>
              <div className={styles.contactItemContainer}>
                <div
                  className={styles.iconWrapper}
                  data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                  data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                >
                  <FiPhoneCall />
                </div>
                <div className={styles.infoWrapper}>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    Call us
                  </p>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    +91 6380561849
                  </p>
                </div>
              </div>
              <div className={styles.contactItemContainer}>
                <div
                  className={styles.iconWrapper}
                  data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                  data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                >
                  <IoMailOutline />
                </div>
                <div className={styles.infoWrapper}>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    Mail us
                  </p>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    skynoveau.in@gmail.com
                  </p>
                </div>
              </div>
              <div className={styles.contactItemContainer}>
                <div
                  className={styles.iconWrapper}
                  data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                  data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                >
                  <GrLocation />
                </div>
                <div className={`${styles.infoWrapper}`}>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    Address
                  </p>
                  <p
                    data-aos={AOS_ANIMATION.FADE_UP.TYPE}
                    data-aos-duration={AOS_ANIMATION.FADE_UP.DURATION}
                  >
                    door number , street name , city - pincode
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
