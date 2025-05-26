import React from "react";
import { Helmet } from "react-helmet";
import { GoDot } from "react-icons/go";

import { useScrollToTop } from "@hooks";
import { Footer } from "@app/components/footer";

import styles from "./policy.module.css";

export default function ReturnPolicyPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Return & Exchange Policy - Dhanika Sarees</title>
        <meta
          name="description"
          content="Learn about our return and exchange policies for Dhanika Sarees, ensuring customer satisfaction with every purchase."
        />
        <meta
          name="keywords"
          content="return policy, exchange policy, saree return, saree exchange, customer satisfaction"
        />
      </Helmet>

      <div className={`wrapper wrapper-margin`}>
        <h1 className={`text-30 ${styles.title}`}>Returns & Exchange Policy</h1>
        <div
          className={`container container-margin-top ${styles.policyContainer}`}
        >
          <p className={`text-18 weight-400 ${styles.sectionTitle}`}>
            Eligibility for Returns & Exchanges
          </p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} /> Items can be returned or
              exchanged within 10 days of receipt.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> Products must be in their
              original condition: unworn, unwashed, and with all original tags
              and packaging intact.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> Any saree with
              manufacturing defects can be returned or exchanged.
            </li>
          </ul>

          <p className={`text-18 weight-400 ${styles.sectionTitle}`}>
            How to Initiate a Return or Exchange
          </p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} /> Contact our customer
              service team at +91 9500342171 or +91 9500343171 to request a
              return or exchange.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> Provide your order number,
              details of the item you wish to return or exchange, and the reason
              for return or exchange.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} />
              Our team will revert in 48 hours. hours.
            </li>
          </ul>

          <p className={`text-18 weight-400 ${styles.sectionTitle}`}>
            Shipping Costs
          </p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} /> Return shipping costs are
              the responsibility of the customer unless the item received is
              defective or incorrect.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> Exchanges for any
              manufacturing defect or incorrect supply will be shipped back to
              you at no additional cost.
            </li>
          </ul>

          <p className={`text-18 weight-400 ${styles.sectionTitle}`}>Refunds</p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} /> Refunds will be processed
              once the returned item has been received and inspected.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> Refunds will be issued
              using the original payment method.
            </li>
            <li>
              <GoDot className={`${styles.icon}`} /> The refund will reflect in
              the original payment method within 10 -15 business days after
              receipt of the original product.
            </li>
          </ul>

          <p className={`text-18 weight-400 ${styles.sectionTitle}`}>
            Non-Returnable Items
          </p>
          <ul className="text-14 weight-300">
            <li>
              <GoDot className={`${styles.icon}`} /> Sale items and items marked
              as non-returnable cannot be returned or exchanged.
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
