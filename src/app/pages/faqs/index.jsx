import React from "react";
import { Helmet } from "react-helmet";

import { useScrollToTop } from "@hooks";
import { PageBanner } from "@components/banner/page";
import { Accordian } from "./accordian";
import { Footer } from "@app/components/footer";

import styles from "./faqs.module.css";

import FaqsBannerImg from "@assets/faqs/faqs-banner-img.jpg";

export default function FaqsPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions About Sarees | Dhanika</title>
        <meta
          name="description"
          content="Find answers to common questions about saree fabrics, prints, and care. Learn how to care for your cotton, and georgette sarees."
        />
        <meta
          name="keywords"
          content="Saree FAQs, Saree care, Online saree shopping, Frequently asked questions about sarees, How to care for sarees, Common questions about saree fabrics and prints, How to wash and care for cotton, and georgette sarees, Frequently asked questions about Kalamkari and hand block printed sarees, Online saree shopping tips and care instructions"
        />
      </Helmet>

      {/* ---------- page banner ---------- */}
      <PageBanner
        imageSrc={FaqsBannerImg}
        alt="Dhanika FAQ's"
        content="Dhanika FAQ's"
      />

      {/* ---------- Faqs ---------- */}
      <div className={`wrapper wrapper-margin`}>
        <h1 className={`text-44 weight-200 ${styles.title}`} id={`sui-aos`}>
          FAQ's
        </h1>
        <div className={`container container-margin ${styles.faqsContainer}`}>
          <Accordian />
        </div>
      </div>

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
