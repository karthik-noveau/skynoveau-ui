import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { Card } from "../card";
import { Button } from "@components/button/basic";

import styles from "./modal.module.css";
import { cartService } from "@app/service/service";
import { useEcommerceStore } from "@app/store";
import { useShallow } from "zustand/react/shallow";
import { useInvalidateQuery } from "@utils/react-query";
import { useNavigate } from "react-router-dom";
import { QUERY_KEYS } from "@app/constant.js";

export const CartModal = ({
  soldProducts,
  storedCart,
  showModal,
  setShowModal,
}) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { invalidateQuery } = useInvalidateQuery();
  const navigate = useNavigate();

  const { accountInfo } = useEcommerceStore(
    useShallow((state) => ({
      accountInfo: state.accountInfo,
    }))
  );

  useEffect(() => {
    return () => {
      setShowModal(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal
        title="Below sold out products will be removed from your cart"
        centered
        open={showModal}
        onCancel={() => setShowModal(false)}
        className={styles.cartModal}
        footer={() => {
          return (
            <div className={`${styles.footerButtonContainer}`}>
              <Button
                loading={buttonLoading}
                className={styles.footerButton}
                onClick={() => {
                  setButtonLoading(true);
                  let productIdList = soldProducts.map((item) => item._id);
                  cartService
                    .deleteCartProductsById({
                      userId: accountInfo["userId"],
                      productIdList,
                    })
                    .then((result) => {
                      setButtonLoading(false);
                      invalidateQuery([QUERY_KEYS.cartCount]);
                      useEcommerceStore
                        .getState()
                        .setRemoveFetchedCartProduct(productIdList);

                      soldProducts.length === 1
                        ? navigate("/cart")
                        : navigate("/checkout");
                    })
                    .catch((error) => {
                      invalidateQuery([QUERY_KEYS.cartCount]);
                      setButtonLoading(false);
                      setShowModal(false);
                    });
                }}
              >
                Proceed
              </Button>
            </div>
          );
        }}
        width={1000}
      >
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.container}`}>
            {soldProducts.map((soldProduct, index) => {
              if (!storedCart[soldProduct._id]) return null;
              return (
                <Card
                  key={index}
                  image={soldProduct.images[0]}
                  alt="dhanika-product"
                  title={soldProduct.name}
                  price={soldProduct?.price || soldProduct.discountPrice}
                  productId={soldProduct._id}
                  collectionId={soldProduct.collectionId}
                  addedCount={storedCart[soldProduct._id].addCount}
                  quantity={soldProduct.quantity}
                  isSoldOutModal={true}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};
