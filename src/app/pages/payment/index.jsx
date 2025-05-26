import { useShallow } from "zustand/react/shallow";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { RAZORPAY_KEY_ID } from "@app/config";
import { QUERY_KEYS } from "@app/constant.js";
import { orderService } from "@app/service/service";
import { useEcommerceStore } from "@app/store";
import { useInvalidateQuery } from "@utils/react-query";
import { Loader } from "@components/loader/basic/fullscreen";

export default function Payment() {
  const navigate = useNavigate();
  const { invalidateQuery } = useInvalidateQuery();
  const rzpRef = useRef();

  const { checkoutInfo = {}, accountInfo } = useEcommerceStore(
    useShallow((state) => ({
      checkoutInfo: state.checkoutInfo,
      accountInfo: state.accountInfo,
    }))
  );

  const { products, couponInfo, deliveryInfo, payableAmount, cartAmount } =
    checkoutInfo;

  useEffect(() => {
    const createOrder = async ({ razorpayPaymentId, paymentInfo }) => {
      await orderService
        .createOrder({
          userId: accountInfo.userId,
          products,
          couponInfo,
          deliveryInfo,
          paidAmount: payableAmount,
          cartAmount,
          razorpayPaymentId,
          paymentInfo,
        })
        .then(() => {
          navigate("/checkout/payment/status/success", {
            state: {
              paymentStatus: "success",
            },
          });
        })
        .catch((error) => {
          navigate("/checkout/payment/status/failed", {
            state: {
              paymentStatus: "failed",
            },
          });
        });
    };
    const handleCheckout = async () => {
      try {
        // if (accountInfo.userId === "7cc3a908-25d6-46f4-8db3-0dde1fea4d0b") {
        //   createOrder({
        //     paymentInfo: {
        //       paidAt: "2025-05-03T15:57:00Z",
        //       paymentId: "pay_QQQI1ELsK1SNBL",
        //       paidAmount: payableAmount,
        //       paymentStatus: "Paid",
        //       paymentMode: "upi",
        //       paymentInstance: JSON.stringify({}),
        //       cartAmount,
        //     },
        //   });
        //   return;
        // }

        // Razorpay Options
        const options = {
          key: RAZORPAY_KEY_ID,
          amount: payableAmount * 100, // convert to paisa
          currency: "INR",
          name: "Dhanika",
          description: "Purchase Order",
          order_id: null, // order id set to null
          handler: async (paymentResponse) => {
            try {
              createOrder({
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
              });
              invalidateQuery([QUERY_KEYS.orders]);

              document.body.style.overflow = "";
            } catch (error) {
              document.body.style.overflow = "";
              navigate("/checkout/payment/status/failed", {
                state: {
                  paymentStatus: "failed",
                },
              });
            }
          },
          prefill: {
            name: deliveryInfo.firstName,
            email: deliveryInfo.email,
            contact: deliveryInfo.phoneNumber,
          },
          modal: {
            escape: false,
            ondismiss: function () {
              navigate("/checkout");
              document.body.style.overflow = "";
              useEcommerceStore.getState().setCheckoutInfo({});
              invalidateQuery([QUERY_KEYS.orders]);
            },
          },
          theme: {
            color: "black",
          },
        };

        rzpRef.current = new window.Razorpay(options);
        rzpRef.current.open();
      } catch (error) {
        document.body.style.overflow = "";
        navigate("/checkout/payment/status/failed", {
          state: {
            paymentStatus: "failed",
          },
        });
        useEcommerceStore.getState().setCheckoutInfo({});
        invalidateQuery([QUERY_KEYS.orders]);
      }
    };

    if (!deliveryInfo || !products || typeof payableAmount !== "number") {
      navigate("/checkout");
      return;
    } else {
      handleCheckout();
    }

    return () => {
      rzpRef.current = null;
      useEcommerceStore.getState().setCheckoutInfo({});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutInfo]);

  return <Loader />;
}
