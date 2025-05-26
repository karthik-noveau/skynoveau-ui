import React from "react";
import { Helmet } from "react-helmet";

import { useScrollToTop } from "@hooks";
import { Footer } from "@app/components/footer";

import styles from "./policy.module.css";

export default function TermsConditionsPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Terms & Conditions - Dhanika Sarees</title>
        <meta
          name="description"
          content="Read the terms and conditions for purchasing sarees from Dhanika. Understand your rights and responsibilities when buying from our website."
        />
        <meta
          name="keywords"
          content="terms and conditions, saree purchase terms, Dhanika sarees terms, website terms of use, online shopping terms"
        />
      </Helmet>

      <div className={`wrapper wrapper-margin`}>
        <h1 className={`text-30 ${styles.title}`}>Terms & Conditions</h1>
        <div
          className={`container container-margin-top ${styles.policyContainer}`}
        >
          <p className={`text-16 weight-400 ${styles.sectionText}`}>
            By accessing and using the Dhanika website, you agree to comply with
            and be bound by these Terms & Conditions. We make every effort to
            ensure that product descriptions, images, and prices are accurate,
            but we do not guarantee error-free content. We reserve the right to
            refuse or cancel any order at our discretion.
          </p>
          <p
            className={`text-16 weight-400 ${styles.sectionText} ${styles.sectionTextPadding}`}
          >
            Payments are processed securely, and we accept UPI id related
            payments through Googlepay, Phonepe, PayTM, BharatPe etc. All
            content on our website, including text, images, and logos, is owned
            by Sanskriti parent co. of brand Dhanika and may not be used without
            permission. Our liability is limited to direct damages, and we are
            not responsible for any indirect or consequential damages or damages
            due to natural calamity.
          </p>
          <p
            className={`text-16 weight-400 ${styles.sectionText} ${styles.sectionTextPadding}`}
          >
            We may update these Terms & Conditions periodically. Changes will be
            posted on our website, and your continued use signifies acceptance
            of the revised terms. These Terms & Conditions are governed by the
            laws of India.
          </p>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
