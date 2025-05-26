import React from "react";
import { Helmet } from "react-helmet";
import { GoDot } from "react-icons/go";

import { useScrollToTop } from "@hooks";
import { Footer } from "@app/components/footer";

import styles from "./policy.module.css";

export default function PrivacyPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Dhanika Sarees</title>
        <meta
          name="description"
          content="Explore how Dhanika Sarees protects your privacy and personal data. Read about our data collection, usage, and protection practices."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, personal data, customer privacy, online shopping privacy"
        />
      </Helmet>

      <div className={`wrapper wrapper-margin`}>
        <h1 className={`text-30 ${styles.title}`}>Privacy Policy</h1>
        <div
          className={`container container-margin-top ${styles.policyContainer}`}
        >
          <p
            className={`text-16 weight-400 ${styles.sectionText} ${styles.sectionBottom}`}
          >
            We value your trust and are committed to protecting your personal
            information. This Privacy Policy explains how Dhanika collects,
            uses, shares, and processes your data through our website and
            services.
          </p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Collection of Information: </span> When you interact with
              our website, we collect personal data you provide, such as your
              name, email address, shipping address, and payment details. We may
              also track your browsing behavior, preferences, and IP address to
              improve our services and understand user behavior.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Use of Information: </span>We use your data to process
              orders, deliver products, communicate with you about orders and
              promotions, and enhance your experience. We may also use your data
              for internal research, customer support, and to comply with legal
              obligations.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Cookies: </span>We use cookies to analyze website traffic,
              improve user experience, and offer targeted content. Cookies are
              small files stored on your device. You can manage cookie
              preferences through your browser settings.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Sharing of Information: </span>We do not sell your data.
              However, we may share your data with service providers, business
              partners, or legal authorities as required for fulfilling orders,
              enhancing services, or complying with legal obligations.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Data Security: </span>We implement reasonable safeguards to
              protect your personal information. However, data transmission over
              the Internet is not completely secure, and we cannot guarantee
              complete protection.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Your Rights: </span>You may access, correct, or delete your
              data through your account settings or by contacting us. You may
              also withdraw consent for processing by writing to us, though this
              may impact your access to our services.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Changes to Privacy Policy: </span>We may update this Privacy
              Policy to reflect changes in our practices. Significant updates
              will be posted on our website.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              <span>Contact Information: </span>For questions or concerns about
              our Privacy Policy, please contact us at hello@dhanika.co.in
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
