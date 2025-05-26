import React from "react";
import { Helmet } from "react-helmet";

import CartRender from "./index.jsx";
import { Footer } from "@app/components/footer/index.jsx";

export default function Cart() {
  return (
    <>
      <Helmet>
        <title>Shopping Cart | Dhanika - Your Selected Sarees</title>
        <meta
          name="description"
          content="Review your selected sarees, including cotton, and hand block printed sarees. Complete your purchase and enjoy budget-friendly sarees for any occasion."
        />
        <meta
          name="keywords"
          content="Shopping cart, Buy sarees online, Cotton sarees, Kalamkari sarees, Hand block printed sarees, Affordable South Indian sarees, Complete purchase, Saree checkout, Cart review"
        />
      </Helmet>

      <CartRender />

      {/* ---------- footer ---------- */}
      <Footer />
    </>
  );
}
