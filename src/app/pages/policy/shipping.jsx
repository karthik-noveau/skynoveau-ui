import React from "react";
import { Helmet } from "react-helmet";

import { useScrollToTop } from "@hooks";
import { Footer } from "@app/components/footer";

import styles from "./policy.module.css";

export default function ShippingPolicyPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Shipping Policy - Dhanika Sarees</title>
        <meta
          name="description"
          content="Find out more about the shipping options and delivery times for your Dhanika Sarees order. We ensure timely and reliable delivery across India."
        />
        <meta
          name="keywords"
          content="shipping policy, saree delivery, shipping information, delivery times, free shipping"
        />
      </Helmet>

      <div className={`wrapper wrapper-margin`}>
        <h1 className={`text-30 ${styles.title}`}>Shipping Policy</h1>
        <div
          className={`container container-margin-top ${styles.policyContainer}`}
        >
          <p className={`text-16 weight-400 ${styles.sectionText}`}>
            At Dhanika, we aim to deliver your products as efficiently and
            swiftly as possible. We currently ship to addresses within India.
            Orders are processed within 2-3 business days, and standard shipping
            typically takes 5-7 business days. Shipping costs are calculated
            based on the weight and destination of your order, with free
            standard shipping for orders over Rs.5000/-
          </p>
          <p
            className={`text-16 weight-400 ${styles.sectionText} ${styles.sectionTextPadding}`}
          >
            Once your order has shipped, you will receive a confirmation email
            with a tracking number to monitor the delivery status. For any
            issues with delivery, please contact our customer service team at
            9500342171
          </p>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
