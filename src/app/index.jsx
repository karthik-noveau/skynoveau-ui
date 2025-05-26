import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import ReactGA from "react-ga4";

import { Navbar } from "@app/components/navbar";
import { WhatsApp } from "@components/whatsapp";
import { SuspenseLazyLoader } from "@components/lazyloader";
import { useFetchCollections } from "./service/query";
import { useEcommerceStore } from "./store";
import { hasData } from "@utils";
import { QUERY_KEYS } from "@app/constant.js";

import shopByCollection_01 from "@assets/home/shop-by-collections/shop-by-collection-01.jpg";
import shopByCollection_02 from "@assets/home/shop-by-collections/shop-by-collection-02.jpg";
import shopByCollection_03 from "@assets/home/shop-by-collections/shop-by-collection-03.jpg";
import { useInvalidateQuery } from "@utils/react-query";
import { Loader } from "@components/loader/basic/fullscreen";
import { GA4_TRACKING_ID } from "./config";
import { userService } from "./service/service";
import { Theming } from "./pages/theme";
import { useAosApply } from "@hooks/index";

// --------- Lazy-loaded components ----------
const HomePage = SuspenseLazyLoader(() => import("./pages/home"), "home");
const NotFound = SuspenseLazyLoader(() => import("@components/page-not-found"));
const AboutPage = SuspenseLazyLoader(() => import("./pages/about"));
const FaqsPage = SuspenseLazyLoader(() => import("./pages/faqs"));
const ContactPage = SuspenseLazyLoader(() => import("./pages/contact"));
const CollectionsPage = SuspenseLazyLoader(() => import("./pages/collections"));
const ProductPage = SuspenseLazyLoader(() => import("./pages/product"));
const CartPage = SuspenseLazyLoader(() => import("./pages/cart/render"), null);
const ReturnPolicyPage = SuspenseLazyLoader(() =>
  import("./pages/policy/return.exchange")
);
const ShippingPolicyPage = SuspenseLazyLoader(() =>
  import("./pages/policy/shipping")
);
const TermsConditionPage = SuspenseLazyLoader(() =>
  import("./pages/policy/terms.conditions")
);
const PrivacyPage = SuspenseLazyLoader(() => import("./pages/policy/privacy"));
const CheckoutPage = SuspenseLazyLoader(() => import("./pages/checkout"), null);
const LoginPage = SuspenseLazyLoader(() => import("./pages/login"));
const RegisterPage = SuspenseLazyLoader(() => import("./pages/register"));
const AccountPage = SuspenseLazyLoader(() => import("./pages/account"));
const Payment = SuspenseLazyLoader(() => import("./pages/payment"));
const PaymentSuccessPage = SuspenseLazyLoader(() =>
  import("./pages/payment/status/success")
);
const PaymentFailedPage = SuspenseLazyLoader(() =>
  import("./pages/payment/status/failed")
);

const Renderer = ({ fetchedCollections }) => {
  const [allowHeader, setAllowHeader] = useState(true);
  const { accountInfo } = useEcommerceStore(
    useShallow((state) => {
      return {
        accountInfo: state.accountInfo,
      };
    })
  );
  const location = useLocation();
  let navigate = useNavigate();
  const { invalidateQuery } = useInvalidateQuery();
  const suspenseRef = useRef({ loading: true });

  useAosApply();

  useEffect(() => {
    // ---------- google analytics ----------
    ReactGA.initialize(GA4_TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname + window.location.search,
    });

    checkUser();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- update images with collections ----------

  useEffect(() => {
    if (hasData(fetchedCollections?.data)) {
      const imageList = [
        shopByCollection_01,
        shopByCollection_02,
        shopByCollection_03,
      ];
      let updatedData = JSON.parse(JSON.stringify(fetchedCollections));
      updatedData["data"] = updatedData["data"].map((item, index) => {
        return {
          name: item.name,
          id: item._id,
          image: imageList[index],
        };
      });
      useEcommerceStore.getState().setStoredCollections(updatedData);
    }
  }, [fetchedCollections]);

  // ---------- path specific logic ----------
  useEffect(() => {
    if (
      (location.pathname === "/login" || location.pathname === "/register") &&
      accountInfo?.["userId"] &&
      accountInfo?.["isAccountActivated"]
    ) {
      setAllowHeader(false);
      navigate("/");
    } else {
      setAllowHeader(true);
    }

    // ---------- fetch count ----------
    invalidateQuery([QUERY_KEYS.cartCount]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLazyLoadComplete = () => {
    suspenseRef.current.loading = false;
  };

  const checkUser = async () => {
    if (accountInfo?.["userId"]) {
      try {
        await userService.fetchUser({ userId: accountInfo.userId });
      } catch {
        useEcommerceStore.getState().setLogout();
      }
    }
  };

  return (
    <>
      {allowHeader && <Navbar />}
      <>
        {/* ---------- Routes ---------- */}
        <Routes>
          <Route path="/theming" element={<Theming />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route
            path="/collections/:collectionId"
            element={<CollectionsPage />}
          />
          <Route
            path={"/collections/:collectionId/products/:productId"}
            element={<ProductPage />}
          />
          <Route path="/account/:tabId" element={<AccountPage />} />
          <Route
            path="/"
            element={
              <HomePage handleLazyLoadComplete={handleLazyLoadComplete} />
            }
          />
          <Route path="/story" element={<AboutPage />} />
          <Route path="/faqs" element={<FaqsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/return-exchange-policy"
            element={<ReturnPolicyPage />}
          />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionPage />} />
          <Route path="/privacy-policy" element={<PrivacyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/payment" element={<Payment />} />
          <Route
            path="/checkout/payment/status/success"
            element={<PaymentSuccessPage />}
          />
          <Route
            path="/checkout/payment/status/failed"
            element={<PaymentFailedPage />}
          />
          {/* ---------- no matched routes ---------- */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <WhatsApp phoneNumber={919500342171} />
      </>
    </>
  );
};

export default function App() {
  const { data: fetchedCollections, isFetching } = useFetchCollections();

  if (isFetching) {
    return (
      <div className="shop-theme">
        <Loader loading={isFetching} />
      </div>
    );
  } else {
    return (
      <div className="shop-theme">
        <Renderer fetchedCollections={fetchedCollections} />
      </div>
    );
  }
}
