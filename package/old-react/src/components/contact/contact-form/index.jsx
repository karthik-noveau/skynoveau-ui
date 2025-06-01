import React from "react";

import { ContactForm } from "./form";

import styles from "./styles.module.css";

export const ContactComponent = ({ className }) => {
  return (
    <div className={`wrapper wrapper-margin-top ${className}`}>
      <div className={styles.contactContainer}>
        <div className={styles.titleSection}>
          <h1 id="sui-aos">Get In Touch</h1>
          <p id="sui-aos">Thank you for your interest</p>
        </div>

        <div className={`${styles.addressWrapper}`}>
          <div className={`${styles.addressConatiner}`}>
            <p className={`text-18`} id={`sui-aos`}>
              Call us :
              <span className={`text-16 ${styles.addressValue}`}>
                &ensp;+91 9500342171
              </span>
            </p>
            <p className={`text-18`} id={`sui-aos`}>
              Mail us :
              <span className={`text-16 ${styles.addressValue}`}>
                &ensp;hello@dhanika.co.in
              </span>
            </p>
            <p className={`text-18`} id={`sui-aos`}>
              Address: &ensp;
              <span className={`text-16 ${styles.addressValue}`}>
                Old No. 9, New No. 6 Pachaiappan Colony, 3rd Street, Zamin
                Pallavaram, Chennai - 600043
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ------------ contact form ----------- */}
      <div className={`wrapper wrapper-margin-bottom`}>
        <div
          className={`container container-margin-top ${styles.formContainer}`}
        >
          <ContactForm />
        </div>
      </div>
    </div>
  );
};
