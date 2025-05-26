import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CheckoutForm } from "./form";
import { Button } from "@components/button/ripple";
import { AntForm } from "@components/form";
import { useEcommerceStore } from "@app/store";
import { BreadCrumb } from "@components/breadcrumb";
import { Footer } from "@app/components/footer";
import { CheckoutSkeleton } from "./skeleton-loader";
import { Image } from "@components/image";
import { endApiLoading, startApiLoading } from "@utils";
import { cartService, productService } from "@app/service/service";

import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [fetchedCartProducts, setFetchedCartProducts] = useState([]);
  const navigate = useNavigate();
  const { accountInfo, storedCouponCode, storedCollections } =
    useEcommerceStore((state) => ({
      accountInfo: state.accountInfo,
      storedCouponCode: state.storedCouponCode,
      storedCollections: state.storedCollections,
    }));
  const [couponData, setCouponData] = useState({
    price: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      let startedTime = startApiLoading({ setLoading });
      setStartTime(startedTime);
      await cartService
        .fetchCartProducts({
          userId: accountInfo.userId,
        })
        .then(async (result) => {
          if (!result.data.length) {
            navigate("/cart");
            return;
          }
          setFetchedCartProducts(result.data);

          let promiseList = [
            productService.fetchProductsByIdList({
              productIdList: result.data.map((product) => product.productId),
            }),
          ];
          storedCouponCode &&
            promiseList.push(
              cartService.validateCoupon({ code: storedCouponCode })
            );

          await Promise.all(promiseList).then((result) => {
            setCartData(result[0].data);
            result[1]?.status === "Active" &&
              setCouponData({ price: result[1].price });
            endApiLoading({ startTime, setLoading });

            let soldProducts = result[0].data.find(
              (product) => product.quantity === 0
            );
            if (soldProducts) {
              navigate("/cart", {
                isSoldProductsInCheckoutPage: true,
              });
            }
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartAmount = useMemo(() => {
    let total = 0;
    if (fetchedCartProducts && cartData?.length) {
      let cartDataObj = {};
      fetchedCartProducts.forEach((cart) => {
        cartDataObj[cart.productId] = cart;
      });

      if (cartData.length) {
        cartData.forEach((product, index) => {
          total =
            total +
            (product.discountPrice || product.price) *
              cartDataObj[product._id].addCount;
        });
      }
    }
    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData]);

  const payableAmount = useMemo(() => {
    if (couponData["price"]) {
      let discountTotal = cartAmount - couponData["price"];
      return discountTotal < 0 ? 0 : discountTotal;
    } else {
      return cartAmount;
    }
  }, [cartAmount, couponData]);

  const onSubmit = (values) => {
    const cartProductMap = fetchedCartProducts.reduce((acc, product) => {
      acc[product.productId] = product;
      return acc;
    }, {});
    useEcommerceStore.getState().setCheckoutInfo({
      cartAmount,
      payableAmount,
      products: Object.values(cartData).map(
        ({ _id, code, collectionId, name, images, price, discountPrice }) => {
          return {
            productId: _id,
            code: String(code),
            collectionId: collectionId,
            productName: name,
            collectionName: storedCollections.data.find(
              (item) => item.id === collectionId
            ).name,
            image: images[0],
            price: discountPrice || price,
            quantity: cartProductMap[_id].addCount,
          };
        }
      ),
      ...(storedCouponCode && {
        couponInfo: {
          code: storedCouponCode,
          price: couponData.price,
        },
      }),
      deliveryInfo: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        flatNo: values.flatNo,
        street: values.street,
        city: values.city,
        state: values.state,
        pincode: values.pincode,
      },
    });
    navigate(`/checkout/payment`);
  };

  if (loading || !cartData) {
    return <CheckoutSkeleton />;
  } else {
    return (
      <>
        <AntForm
          className={styles.checkoutForm}
          onSubmit={onSubmit}
          customButton={true}
        >
          <div className={`wrapper wrapper-padding wrapper-margin-bottom`}>
            <div className={`container ${styles.breadCrumbWrapper}`}>
              <BreadCrumb />
            </div>
            <div
              className={`container container-margin container-padding-bottom ${styles.checkoutContainer}`}
            >
              <div className={`${styles.checkoutLeftSection}`}>
                {/* ---------- delivery ---------- */}
                <Badge count={1} name={"Delivery"} />
                <CheckoutForm />

                {/* ---------- payment ---------- */}
                <Badge
                  count={2}
                  name={"Payment"}
                  className={`${styles.paymentBadge}`}
                />
                <p className={`text-16 ${styles.paymentInfo}`}>
                  Credit Card/Debit Card/NetBanking/UPI, All transactions are
                  secure and encrypted.
                </p>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={`text-16 ${styles.orderButton}`}
                >
                  Place order
                </Button>
              </div>

              <div className={`${styles.checkoutRightSection}`}>
                <p className={`text-18 weight-400 ${styles.SummeryTitle}`}>
                  Your order
                </p>
                {cartData && fetchedCartProducts && (
                  <CartList
                    data={cartData}
                    fetchedCartProducts={fetchedCartProducts}
                  />
                )}
                <div className={`${styles.summeryRow}`}>
                  <p className={`text-16 ${styles.rowTitle}`}>Cart Total</p>
                  <p className={`text-16 ${styles.rowValue}`}>₹ {cartAmount}</p>
                </div>
                {couponData.price && (
                  <div className={`${styles.summeryRow} ${styles.couponCode}`}>
                    <p className={`text-16 ${styles.rowTitle}`}>
                      Coupon discount
                    </p>
                    <p className={`text-16 ${styles.rowValue}`}>
                      - ₹ {couponData["price"]}
                    </p>
                  </div>
                )}
                <div className={`${styles.summeryRow}`}>
                  <p className={`text-16 ${styles.rowTitle}`}>Shipping</p>
                  <p className={`text-16 ${styles.rowValue}`}>FREE</p>
                </div>
                <div
                  className={`weight-400 ${styles.summeryRow} ${styles.totalAmountRow}`}
                >
                  <p className={`text-16 weight-500 ${styles.rowTitle}`}>
                    Total Amount
                  </p>
                  <p className={`text-16 weight-500 ${styles.rowValue}`}>
                    ₹ {payableAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AntForm>

        {/* ---------- footer ---------- */}
        <Footer />
      </>
    );
  }
}

const Badge = ({ count, name, className }) => {
  return (
    <div className={`${styles.badgeContainer} ${className}`}>
      <div className={`text-14 ${styles.badge}`}>{count}</div>
      <div className={`text-18 weight-500 ${styles.badgeText}`}>{name}</div>
    </div>
  );
};

const CartList = ({ data, fetchedCartProducts }) => {
  let cartProducts = {};
  fetchedCartProducts.forEach((product) => {
    cartProducts[product.productId] = product;
  });
  return (
    <div className={`${styles.ordersListWrapper}`}>
      {data.map((product) => {
        return (
          <>
            <div className={`${styles.ordersContainer}`}>
              <div className={`${styles.imageContainer}`}>
                <Image
                  imageSrc={product.images[0]}
                  alt={product.name}
                  className={`${styles.productImage}`}
                  borderRadius="6px"
                />
                <span className={`${styles.count}`}>
                  {cartProducts[product._id].addCount}
                </span>
              </div>
              <p className={`text-16 ${styles.orderItemName}`}>
                {product.name}
              </p>

              <p className={`text-16 ${styles.orderItemPrice}`}>
                ₹
                {(product?.discountPrice || product.price) *
                  cartProducts[product._id].addCount}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};
