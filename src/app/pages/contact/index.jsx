import React from "react";
import { Helmet } from "react-helmet";

import { PageBanner } from "@components/banner/page";
import { useScrollToTop } from "@hooks";

import bannerImage from "@assets/contact/contact-banner-img.jpg";

import { ContactComponent } from "@components/contact/contact-form";
import { Footer } from "@app/components/footer";

export default function ContactPage() {
  useScrollToTop();

  return (
    <>
      <Helmet>
        <title>
          Contact Us for Budget-Friendly South Indian Sarees | Dhanika
        </title>
        <meta
          name="description"
          content="Get in touch with Dhanika for inquiries about our saree collections or customer support for online saree shopping."
        />
        <meta
          name="keywords"
          content="Contact us, Dhanika contact, Customer support, Contact for saree orders, Customer support for online saree shopping, Inquiries about saree collections, Contact us for budget-friendly South Indian sarees, Customer support for cotton sarees, Get in touch for questions about Kalamkari sarees and prints"
        />
      </Helmet>

      <PageBanner
        imageSrc={bannerImage}
        alt="Contact us"
        content="Contact us"
      />

      <ContactComponent />

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
