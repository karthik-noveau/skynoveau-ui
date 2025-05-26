import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineVerifiedUser } from "react-icons/md";
import ReactGA from "react-ga4";
import { TbTag } from "react-icons/tb";

import { Card } from "./card";
import { Button } from "@components/button/shine";
import { Button as BaseButton } from "@components/button/basic";
import { useShallow } from "zustand/react/shallow";
import { useScrollToTop } from "@hooks/index";
import { useEcommerceStore } from "@app/store";
import { cartService, productService } from "@app/service/service";
import { endApiLoading, hasData, startApiLoading } from "@utils";
import { CartModal } from "./modal";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";
import { CartSkeleton } from "./skeleton-loader";

import styles from "./cart.module.css";

import EmptyCartIcon from "./assets/empty-cart-icon.svg";
import verifyImg from "./assets/verify-img.jpg";
import { AntForm } from "@components/form";
import { Form, Input } from "antd";
import { REGISTER_TYPE } from "../register";

export default function CartRender() {
  const [buttonLoading, setButtonLoading] = useState({
    id: null,
    loading: false,
  });
  const [loading, setLoading] = useState(false);
  const [soldProducts, setSoldProducts] = useState([]);
  const [fetchedCartProdcuts, setFetchedCartProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { invalidateQuery } = useInvalidateQuery();
  const deleteRef = useRef({ isDeleting: false });
  const [couponData, setCouponData] = useState({
    buttonValue: "Apply",
    errorMessage: "",
    inputValue: "",
    couponPrice: null,
    loading: false,
  });

  const { accountInfo, storedCart, storedCouponCode } = useEcommerceStore(
    useShallow((state) => ({
      accountInfo: state.accountInfo,
      storedCart: state.storedCart,
      storedCouponCode: state.storedCouponCode,
    }))
  );

  useScrollToTop();

  useEffect(() => {
    fetchCartData();
    validateCoupon(storedCouponCode);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(storedCart).length) {
      productService
        .fetchProductsByIdList({
          productIdList: Object.keys(storedCart),
        })
        .then((result) => {
          setFetchedCartProducts(result.data);
        });
    } else {
      setFetchedCartProducts([]);
    }
  }, [storedCart]);

  const cartAmount = useMemo(() => {
    return fetchedCartProdcuts.reduce((prev, item) => {
      return (
        prev +
        (item?.discountPrice || item.price) * storedCart[item._id]?.addCount
      );
    }, 0);
  }, [fetchedCartProdcuts, storedCart]);

  const payableAmount = useMemo(() => {
    if (couponData["couponPrice"]) {
      let discountTotal = cartAmount - couponData["couponPrice"];
      return discountTotal < 0 ? 0 : discountTotal;
    } else {
      return cartAmount;
    }
  }, [cartAmount, couponData]);

  const validateCoupon = async (couponCode) => {
    if (couponCode) {
      let data = {};
      setCouponData(() => ({
        ...couponData,
        loading: true,
      }));

      await cartService.validateCoupon({ code: couponCode }).then((result) => {
        if (result?.status === "Active") {
          data = {
            ...couponData,
            buttonValue: "Remove",
            inputValue: couponCode,
            couponPrice: result["price"],
            errorMessage: "",
          };
        } else if (result?.status === "Expired") {
          data = {
            ...couponData,
            buttonValue: "Apply",
            inputValue: couponCode,
            couponPrice: null,
            errorMessage: "Code has Expired",
          };
        } else {
          data = {
            ...couponData,
            buttonValue: "Apply",
            inputValue: couponCode,
            couponPrice: null,
            errorMessage: "Invalid code",
          };
        }
        setCouponData(() => ({
          ...couponData,
          loading: false,
          ...data,
        }));
      });
    }
  };

  const fetchCartData = async () => {
    const startTime =
      !deleteRef.current.isDeleting && startApiLoading({ setLoading });

    const onCartUpdate = (result) => {
      useEcommerceStore.getState().setStoredCart(result);
      invalidateQuery([QUERY_KEYS.cartCount]);
      !deleteRef.current.isDeleting && endApiLoading({ startTime, setLoading });
    };

    try {
      if (accountInfo?.userId) {
        let result = await cartService.fetchCartProducts({
          userId: accountInfo.userId,
        });
        let cartObj = {};
        result.data.forEach((item) => {
          cartObj[item.productId] = item;
        });
        onCartUpdate(cartObj);
      } else if (Object.keys(storedCart).length) {
        onCartUpdate(storedCart);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setLoading(false);
    }
  };

  const onQuantityChange = (productId, count) => {
    if (accountInfo?.["userId"]) {
      setButtonLoading({ id: productId, loading: true });
      cartService
        .updateCartProductById({
          userId: accountInfo?.["userId"],
          productId: productId,
          addCount: count,
        })
        .then((data) => {
          setButtonLoading({ id: null, loading: false });
          useEcommerceStore.getState().setStoredCart({
            [data.productId]: data,
          });
        })
        .catch((error) => {
          console.error(error);
          setButtonLoading({ id: null, loading: false });
        });
    } else {
      useEcommerceStore.getState().setStorageCart({
        data: {
          [productId]: {
            productId,
            addCount: count,
          },
        },
      });
      useEcommerceStore.getState().setStoredCart({
        [productId]: {
          ...storedCart[productId],
          addCount: count,
        },
      });
    }
  };

  const onDelete = (productId) => {
    deleteRef.current.isDeleting = true;

    if (accountInfo?.["userId"]) {
      cartService
        .deleteCartProductById({
          userId: accountInfo?.["userId"],
          productId: productId,
        })
        .then(({ data }) => {
          invalidateQuery([QUERY_KEYS.cartCount]);
          useEcommerceStore.getState().setRemoveFetchedCartProduct([productId]);
          let list = fetchedCartProdcuts.filter(
            (item) => item._id !== productId
          );
          setFetchedCartProducts(list);
          deleteRef.current.isDeleting = false;
        })
        .catch((error) => {
          deleteRef.current.isDeleting = false;
          invalidateQuery([QUERY_KEYS.cartCount]);
        });
    } else {
      useEcommerceStore.getState().setRemoveFetchedCartProduct([productId]);
      let list = fetchedCartProdcuts.filter((item) => item._id !== productId);
      setFetchedCartProducts(list);
      deleteRef.current.isDeleting = false;
    }
  };

  const onCouponSubmit = (values) => {
    useEcommerceStore.getState().setStoredCouponCode("");
    if (!values.couponCode) {
      setCouponData((state) => ({
        ...state,
        errorMessage: "Enter valid code",
      }));
      return;
    }

    if (couponData["couponPrice"]) {
      setCouponData({
        buttonValue: "Apply",
        errorMessage: "",
        inputValue: "",
        couponPrice: null,
        loading: false,
      });
      useEcommerceStore.getState().setStoredCouponCode(null);
    } else {
      useEcommerceStore.getState().setStoredCouponCode(values.couponCode);
      validateCoupon(values.couponCode);
    }
  };

  const onCouponValueChange = (e) => {
    if (!e.target.value) {
      setCouponData((state) => ({
        ...state,
        inputValue: "",
        errorMessage: "Enter valid code",
      }));
    } else {
      setCouponData((state) => ({
        ...state,
        inputValue: e.target.value,
        errorMessage: "",
      }));
    }
  };

  if (loading) {
    return <CartSkeleton />;
  } else if (!Object.keys(storedCart).length && !fetchedCartProdcuts.length) {
    return (
      <div className={`${styles.emptyCart}`}>
        <img
          src={EmptyCartIcon}
          className={`${styles.icon}`}
          alt="empty-cart"
        />
        <div className={`text-18 ${styles.emptyText}`}>Your Cart is Empty</div>
        <Link to="/collections">
          <Button className={`${styles.button}`}>
            <span className={`text-18 ${styles.buttonName}`}>
              Continue Shop
            </span>
          </Button>
        </Link>
      </div>
    );
  } else if (Object.keys(storedCart).length && fetchedCartProdcuts.length) {
    let fetchedCartList = Object.values(storedCart);
    let cartProductInfoObj = {};
    fetchedCartProdcuts.forEach((item) => {
      cartProductInfoObj[item._id] = item;
    });

    return (
      <>
        <div className={`wrapper wrapper-margin`}>
          <div className={`container ${styles.cartContainer}`}>
            <div className={`${styles.leftCart}`}>
              <h1 className={`text-22 weight-400 ${styles.headerTitle}`}>
                Cart
                <span className="text-18 weight-300">
                  {" "}
                  {`(${fetchedCartList.length})`}
                </span>
              </h1>
              <div className={`${styles.cardContainer}`}>
                {fetchedCartList.map((product, index) => {
                  let productInfo = cartProductInfoObj[product.productId];
                  if (!productInfo) {
                    onDelete(product.productId);
                    return null;
                  }
                  return (
                    <Card
                      key={index}
                      image={productInfo.images[0]}
                      alt="dhanika-product"
                      title={productInfo.name}
                      quantity={productInfo.quantity}
                      addedCount={storedCart[productInfo._id].addCount}
                      price={productInfo?.discountPrice || productInfo.price}
                      productId={productInfo._id}
                      collectionId={productInfo.collectionId}
                      buttonLoading={
                        buttonLoading.id === productInfo._id &&
                        buttonLoading.loading
                      }
                      limit={productInfo.quantity}
                      hideBottomBorder={index === storedCart.length - 1}
                      handleReduceCount={() => {
                        onQuantityChange(
                          productInfo._id,
                          storedCart[productInfo._id].addCount - 1
                        );
                      }}
                      handleIncreaseCount={() => {
                        onQuantityChange(
                          productInfo._id,
                          storedCart[productInfo._id].addCount + 1
                        );
                      }}
                      onDelete={() => onDelete(productInfo._id)}
                    />
                  );
                })}
              </div>
            </div>

            <div className={`${styles.rightCart}`}>
              <p
                className={`text-16 weight-500 ${styles.couponContainerTitle}`}
              >
                <TbTag className={`${styles.icon}`} /> Apply Coupon
              </p>
              <AntForm
                customButton={true}
                className={`${styles.couponContainer}`}
                onSubmit={onCouponSubmit}
                fields={[{ name: "couponCode", value: couponData.inputValue }]}
              >
                <Form.Item name="couponCode">
                  <Input
                    placeholder="Coupon Code"
                    name="couponCode"
                    onChange={onCouponValueChange}
                    onBlur={() =>
                      setCouponData((state) => ({
                        ...state,
                        errorMessage: "",
                      }))
                    }
                    onFocus={() => {
                      console.log("onFocus");
                    }}
                  />
                </Form.Item>

                <BaseButton
                  type="primary"
                  className={`${styles.couponApplyButton}`}
                  loading={couponData.loading}
                >
                  {couponData.buttonValue}
                </BaseButton>
              </AntForm>
              {couponData.errorMessage && (
                <p className={`text-14 ${styles.couponErrorMessage}`}>
                  {couponData.errorMessage}
                </p>
              )}
              {!couponData.errorMessage && couponData["couponPrice"] && (
                <p className={`text-14 ${styles.couponStatus}`}>
                  You saved ₹{couponData["couponPrice"]}
                </p>
              )}

              <div className={`${styles.summaryCard}`}>
                <div className={`text-16 weight-500 ${styles.title}`}>
                  Cart Summary
                </div>
                <div className={`${styles.row}`}>
                  <p className={`text-16 weight-400 ${styles.rowTitle}`}>
                    Cart Total
                  </p>
                  <p
                    className={`text-14 default-font weight-400 ${styles.rowValue}`}
                  >
                    ₹&thinsp;
                    {cartAmount}
                  </p>
                </div>

                {couponData["couponPrice"] && (
                  <div className={`${styles.row}`}>
                    <p
                      className={`text-16 weight-400 ${styles.rowTitle} ${styles.couponTitle}`}
                    >
                      Coupon Discount
                    </p>
                    <p
                      className={`text-14 default-font weight-400 ${styles.rowValue} ${styles.couponValue}`}
                    >
                      - ₹&thinsp;
                      {couponData["couponPrice"]}
                    </p>
                  </div>
                )}

                <div className={`${styles.row}`}>
                  <p className={`text-16 weight-400 ${styles.rowTitle}`}>
                    Shipping
                  </p>
                  <p
                    className={`text-14 default-font weight-400 ${styles.rowValue}`}
                  >
                    FREE
                  </p>
                </div>

                <div className={`${styles.row} ${styles.totalPayable}`}>
                  <p className={`text-16 weight-500 ${styles.rowTitle}`}>
                    Total Amount
                  </p>
                  <p
                    className={`text-14 default-font weight-400  ${styles.rowValue}`}
                  >
                    ₹&thinsp;
                    {payableAmount}
                  </p>
                </div>

                <Button
                  // disable={true}
                  className={`text-16 ${styles.orderButton}`}
                  onClick={() => {
                    ReactGA.event({
                      category: "Product",
                      action: "Click",
                      label: "Checkout",
                      value: "cart",
                    });

                    let soldList = fetchedCartProdcuts.filter((item) => {
                      return item.quantity === 0;
                    });

                    if (soldList.length) {
                      setSoldProducts(soldList);
                      setShowModal(true);
                    } else {
                      accountInfo?.["userId"]
                        ? navigate("/checkout")
                        : navigate("/register", {
                            state: {
                              registerType: REGISTER_TYPE.EMAIL,
                              redirectPath: "/checkout",
                            },
                          });
                    }
                  }}
                >
                  <p>Checkout</p>
                </Button>
              </div>

              <div className={`${styles.paymentInfoContainer}`}>
                <div className={`text-16 ${styles.description}`}>
                  <MdOutlineVerifiedUser className={`${styles.verifiyIcon}`} />{" "}
                  100% Safe and Secure Payments
                </div>
                <img
                  src={verifyImg}
                  className={styles.verifyImg}
                  alt="verify-img"
                />
              </div>
            </div>
          </div>
        </div>

        {hasData(soldProducts) && (
          <CartModal
            soldProducts={soldProducts}
            storedCart={storedCart}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </>
    );
  }
}
