import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";

import { useNavigate, useParams } from "react-router-dom";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { Helmet } from "react-helmet";

import { Preview } from "./preview";
import { QuantityButton } from "./button";

import { Accordian } from "./accordian";
import { ProductsSlider } from "@app/pages/home/featured-products";
import useWindowWidth, { useScrollToTop } from "@hooks";
import { useFetchProductById, useFetchProducts } from "@app/service/query";
import { useEcommerceStore } from "@app/store";
import { endApiLoading, hasData, startApiLoading } from "@utils";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@components/button/shine";
import { cartService } from "@app/service/service";
import { Toast } from "@components/form/toast/default";
import { TOAST_TYPES } from "@components/form/toast/constant";
import { useInvalidateQuery } from "@utils/react-query";
import { QUERY_KEYS } from "@app/constant.js";
import { Footer } from "@app/components/footer";
import { CollectionSkeleton } from "./skeleton-loader/similar-collections";
import { ProductWebSkeleton } from "./skeleton-loader/product-preview-web";
import { ProductMobileSkeleton } from "./skeleton-loader/product-preview-mobile";

import styles from "./product.module.css";
import { BreadCrumb } from "../collections/bread-crumb";

export default function ProductPage() {
  const [loading, setLoading] = useState(true);
  const [startTime, setStartTime] = useState(null);
  const [accordianData, setAccordianData] = useState(null);
  const [productAddCount, setProductAddCount] = useState(1);
  const { showMessage, toastContext } = Toast();
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const { collectionId, productId } = useParams();
  const { storedCart, accountInfo } = useEcommerceStore(
    useShallow((state) => ({
      storedCart: state.storedCart,
      accountInfo: state.accountInfo,
    }))
  );
  const { invalidateQuery } = useInvalidateQuery();
  const windowWidth = useWindowWidth();

  const navigate = useNavigate();

  const {
    data: fetchedProduct,
    isFetching: isProductFetching,
    refetch,
    error,
  } = useFetchProductById({
    productId,
    enabled: false,
  });

  const { data: fetchedProducts, isFetching: isProductsFetching } =
    useFetchProducts({
      collectionId,
      enabled: true,
    });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useScrollToTop();

  useEffect(() => {
    if (isProductFetching) {
      let startedTime = startApiLoading({ setLoading });
      setStartTime(startedTime);
    } else if (fetchedProduct) {
      endApiLoading({ startTime, setLoading, delay: 0.5 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedProduct, isProductFetching, error]);

  useEffect(() => {
    if (fetchedProduct) {
      let data = [];
      data.push({
        title: "Product details",
        description: fetchedProduct.description,
        pairData: [
          {
            "Blouse Type": fetchedProduct.blouseType,
          },
        ],
      });
      setAccordianData(data);
    }
  }, [fetchedProduct]);

  const handleIncreaseCount = () => {
    setProductAddCount(productAddCount + 1);
  };
  const handleReduceCount = () => {
    setProductAddCount(productAddCount - 1);
  };

  const onAddToCart = async () => {
    setIsButtonLoading(true);

    let updatedAddCount;
    let existAddCount;
    if (accountInfo?.userId) {
      let cartProduct = await cartService.fetchCartProducts({
        userId: accountInfo.userId,
        productId,
      });
      existAddCount = cartProduct?.addCount || 0;
    } else {
      existAddCount = storedCart[productId]?.addCount || 0;
    }

    updatedAddCount = productAddCount + existAddCount;
    if (updatedAddCount > fetchedProduct.quantity) {
      showMessage({
        type: TOAST_TYPES.ERROR,
        message: `Sorry, only ${fetchedProduct.quantity} are in stock and you've requested more.`,
        showProgress: false,
      });
      setIsButtonLoading(false);
      return;
    }

    // if user is logged in
    if (accountInfo?.["userId"]) {
      cartService
        .createCartProduct({
          userId: accountInfo?.["userId"],
          products: [
            {
              productId,
              addCount: updatedAddCount,
            },
          ],
        })
        .then((result) => {
          showMessage({
            type: TOAST_TYPES.SUCCESS,
            message: "Item added successfully",
            showProgress: false,
          });
          invalidateQuery([QUERY_KEYS.cartCount]);
          useEcommerceStore.getState().setStoredCart({
            [productId]: result.data,
          });
          setIsButtonLoading(false);
          invalidateQuery([QUERY_KEYS.cart]);
          navigate("/cart");
        })
        .catch((error) => {
          showMessage({
            type: TOAST_TYPES.ERROR,
            message: error.message,
            showProgress: false,
          });
          setIsButtonLoading(false);
        });
    }
    // if user is not logged in
    else {
      let data = {
        productId,
        addCount: updatedAddCount,
      };
      useEcommerceStore.getState().setStorageCart({
        data: {
          [productId]: data,
        },
      });
      useEcommerceStore.getState().setStoredCart({
        [productId]: data,
      });
      showMessage({
        type: TOAST_TYPES.SUCCESS,
        message: "Item added successfully",
        showProgress: false,
      });
      setIsButtonLoading(false);
      navigate("/cart");
    }
  };

  if (loading || !hasData(fetchedProduct)) {
    return windowWidth <= 550 ? (
      <ProductMobileSkeleton />
    ) : (
      <ProductWebSkeleton />
    );
  } else {
    return (
      <>
        <Helmet>
          <title>
            {fetchedProduct.name} - Buy {fetchedProduct.name} Online | Dhanika
            Sarees
          </title>
          <meta
            name="description"
            content={`${fetchedProduct.name} is a beautiful handloom saree with intricate Kalamkari designs. Available in multiple colors and sizes. Shop now and enjoy free delivery.`}
          />
          <meta
            name="keywords"
            content={`saree, handloom saree, traditional sarees, buy saree online, Kalamkari saree, handloom sarees from Chennai, hand block printed sarees, authentic handloom sarees, buy traditional saree online`}
          />
        </Helmet>

        {toastContext}

        <div className={`wrapper wrapper-margin-top ${styles.productWrapper}`}>
          <div className={`container ${styles.productContainer}`}>
            <div className={`${styles.card}`}>
              <Preview
                imagesList={[
                  ...fetchedProduct.images.map((item, index) => ({
                    id: index,
                    image: item,
                  })),
                ]}
              />
              {/* ---------- right side info ---------- */}
              <div className={`${styles.rightCard}`}>
                <BreadCrumb
                  data={[
                    { label: "Home", path: "/" },
                    {
                      label: "Collections",
                      path: `/collections/${collectionId}`,
                    },
                    { label: "" },
                  ]}
                  className={styles.breadCrumbContainer}
                />
                <div className={`text-20 weight-400 ${styles.name}`}>
                  {fetchedProduct.name}
                  <span className={`${styles.collectionName}`}>
                    {fetchedProduct.code}
                  </span>
                </div>
                <div className={`${styles.priceContainer}`}>
                  <div
                    className={`text-16 default-font weight-400 ${styles.price} `}
                  >
                    <span
                      className={`${
                        fetchedProduct.discountPrice && styles.textFade
                      }`}
                    >
                      {`₹ ${fetchedProduct.price.toFixed(2)}`}
                    </span>
                    {fetchedProduct.discountPrice ? (
                      <>
                        <span className={`${styles.crossDivider}`}></span>
                      </>
                    ) : null}
                  </div>
                  {fetchedProduct?.discountPrice ? (
                    <div
                      className={`text-16 default-font weight-400 ${styles.price} ${styles.discountPrice}`}
                    >
                      {`₹ ${fetchedProduct.discountPrice.toFixed(2)}`}
                    </div>
                  ) : null}
                </div>
                {fetchedProduct.quantity === 0 && (
                  <>
                    <div className={`text-16 ${styles.soldOut}`}>Sold Out</div>
                  </>
                )}

                <p className={`text-16 ${styles.quantityLable}`}>Quantity</p>
                <QuantityButton
                  addCount={productAddCount}
                  quantity={fetchedProduct.quantity}
                  disabled={!fetchedProduct.quantity}
                  className={`${styles.quantityButton}`}
                  handleIncreaseCount={handleIncreaseCount}
                  handleReduceCount={handleReduceCount}
                />

                <Button
                  disable={fetchedProduct.quantity === 0}
                  loading={isButtonLoading}
                  className={`text-16 weight-400 ${styles.cartButton}`}
                  onClick={() => {
                    ReactGA.event({
                      category: "Product",
                      action: "Click",
                      label: "Add to cart button",
                      value: productId,
                    });
                    onAddToCart();
                  }}
                >
                  Add to Cart
                </Button>

                {/* ---------- details ---------- */}
                <Accordian data={accordianData} />

                {/* ---------- chat ---------- */}
                <a
                  href="mailto:dhanikabysanskriti@gmail.com"
                  className={`${styles.chatContainer}`}
                >
                  <IoChatbubbleEllipsesOutline className={`${styles.icon}`} />
                  <div className={`text-14 ${styles.text}`}>
                    Have questions?
                    <span className={`${styles.link}`}>Contact us</span>
                  </div>
                </a>

                {/* ---------- shipping ---------- */}
                <div
                  className={`${styles.shippingContainer}`}
                  onClick={() => navigate("/shipping-policy")}
                >
                  <LiaShippingFastSolid className={`${styles.icon}`} />
                  <div className={`text-14 ${styles.text}`}>
                    Our Shipping Policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- simillar collections ---------- */}
        {isProductsFetching ? (
          <CollectionSkeleton />
        ) : (
          <div className={`wrapper wrapper-margin `}>
            <div
              className={`container container-margin-top ${styles.collectionsContainer}`}
            >
              {fetchedProducts?.["data"].length > 1 && (
                <h1 className={`text-24 weight-300 ${styles.title}`}>
                  Similar Collections
                </h1>
              )}
              <ProductsSlider data={fetchedProducts["data"]} />
            </div>
          </div>
        )}

        {/* ---------- footer ---------- */}
        <Footer />
      </>
    );
  }
}
