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
              Call us :{" "}
              <span className="text-14 default-font">+91 9043222190</span>
            </p>
            <p className={`text-18`} id={`sui-aos`}>
              Mall us : demomail@gmail.com
            </p>
            <p className={`text-18`} id={`sui-aos`}>
              Address: Ramaniyam Abhishek No.
              <span className={`text-14 default-font`}>68</span>, ECR Road,
              Block <span className={`text-14 default-font`}>5</span>, flat
              <span className={`text-14 default-font`}>8</span>c, Thiruvanmiyur,
              Chennai - <span className={`text-14 default-font`}>600041</span>
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
