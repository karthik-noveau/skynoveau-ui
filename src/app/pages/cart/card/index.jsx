import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";

import styles from "./card.module.css";
import { useNavigate } from "react-router-dom";
import { QuantityButton } from "@app/pages/product/button";
import { Image } from "@components/image";

export const Card = ({
  productId,
  collectionId,
  image,
  quantity,
  addedCount,
  buttonLoading,
  title,
  price,
  hideBottomBorder = false,
  handleReduceCount,
  handleIncreaseCount,
  onDelete,
  isSoldOutModal = false,
}) => {
  const totalPirce = price;

  const navigate = useNavigate();

  return (
    <div
      className={`${styles.container} ${hideBottomBorder && styles.borderNone}`}
      id={`sui-aos`}
    >
      <div
        className={`${styles.imageContainer} ${
          quantity === 0 && styles.disabled
        }`}
      >
        <Image
          imageSrc={image}
          alt={title}
          hoverEffect={true}
          cursorPointer={true}
          onClick={() => {
            navigate(`/collections/${collectionId}/products/${productId}`);
          }}
          borderRadius="8px"
          className={`${styles.productImage}`}
        />
        {quantity === 0 && (
          <p className={`text-14 ${styles.soldOutText}`}>Sold</p>
        )}
      </div>
      <div
        className={`${styles.leftSection} ${
          isSoldOutModal && styles.hideDeleteButton
        }`}
      >
        <div className={`text-16 weight-300 ${styles.nameSection}`}>
          <div className={`${styles.nameContainer}`}>
            <p className={`weight-400 ${styles.title}`}>{title}</p>
            <p
              className={`default-font ${styles.price}`}
            >{`₹ ${totalPirce.toLocaleString()}`}</p>
          </div>
        </div>
        <div className={`${styles.actionSection}`}>
          <div className={`${styles.actionLeft}`}>
            <QuantityButton
              quantity={quantity}
              addCount={addedCount}
              disabled={isSoldOutModal || !quantity}
              loading={buttonLoading}
              className={`${styles.quantityButton}`}
              handleIncreaseCount={handleIncreaseCount}
              handleReduceCount={handleReduceCount}
            />
            {!isSoldOutModal && (
              <div className={`${styles.deleteButton}`} onClick={onDelete}>
                <MdOutlineDeleteOutline className={`${styles.icon}`} />
                <p className={`text-16 ${styles.text}`}>Delete</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
