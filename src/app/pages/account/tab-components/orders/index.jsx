/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { Empty, Tooltip } from "antd";

import { Button } from "@components/button/basic";

import { GenerateInvoice } from "@components/pdf-invoice";
import { useFetchOrders } from "@app/service/query";
import { useEcommerceStore } from "@app/store";
import { OrdersSkeleton } from "./skeleton-loader";
import { endApiLoading, formatDbDate, startApiLoading } from "@utils";
import { Image } from "@components/image";
import useWindowWidth from "@hooks";

import styles from "./orders.module.css";

export const Orders = () => {
  const invoiceRef = useRef();
  const [loading, setLoading] = useState(false);
  const windowWidth = useWindowWidth();

  const { accountInfo } = useEcommerceStore((state) => ({
    accountInfo: state.accountInfo,
  }));

  const { data: fetchOrders, isFetching } = useFetchOrders({
    userId: accountInfo["userId"],
  });

  useEffect(() => {
    let startTime = startApiLoading({ setLoading });
    if (isFetching || true) {
      endApiLoading({ startTime, setLoading });
    }
  }, []);

  if (loading) {
    return <OrdersSkeleton />;
  } else if (fetchOrders?.["data"].length === 0) {
    return (
      <div className={`${styles.emptyWrapper}`}>
        <Empty description="You have no orders yet." />
      </div>
    );
  } else if (fetchOrders?.["data"].length > 0) {
    return (
      <div className={`${styles.ordersWrapper}`}>
        {fetchOrders?.["data"]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((order) => {
            const { compactDate } = formatDbDate(order.paymentInfo.paidAt);

            return (
              <div className={`${styles.ordersContainer}`}>
                <div className={`${styles.orderLeftSection}`}>
                  {/* <p className={`text-14 weight-400 ${styles.orderId}`}>
                    Order Id : <span>{order.orderId}</span>
                  </p> */}
                  {order.products.map((product) => {
                    return (
                      <div className={`${styles.productContainer}`}>
                        <Image
                          imageSrc={product.image}
                          className={`${styles.image}`}
                          alt="dhanika-order-item"
                        />
                        <div className={`${styles.productInfo}`}>
                          <p
                            className={`text-14 weight-400 ellipsis-2 ${styles.productName}`}
                          >
                            <Tooltip
                              title={
                                windowWidth < 900
                                  ? ""
                                  : `${product.name} ${product.code}`
                              }
                              placement="right"
                            >
                              {product.name} {product.code}
                            </Tooltip>
                          </p>
                          <p className={`text-14  ${styles.price}`}>
                            {/* ₹ {product.price} */}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={`${styles.productInfoContainer}`}>
                  <div className={`${styles.priceDetails}`}>
                    {/* <p className={`text-14 ${styles.price}`}>Amount</p> */}
                    <p className={`text-14 ${styles.price}`}>
                      <span className={`${styles.symbol}`}>₹</span>
                      {order.paymentInfo.paidAmount}
                    </p>
                  </div>

                  <div className={`${styles.orderRightSection}`}>
                    <p className={`text-14  ${styles.orderTitle}`}>
                      <span className={`${styles.orderStatusIcon}`}></span>
                      <span>Order placed on {compactDate}</span>
                    </p>
                    <Button
                      className={`${styles.downloadButton}`}
                      onClick={() => {
                        if (invoiceRef.current) {
                          invoiceRef.current.downloadInvoice(order);
                        }
                      }}
                    >
                      <BsPrinter className={`text-16 ${styles.icon}`} />
                      <p
                        className={`text-14 weight-300 ${styles.downloadText}`}
                      >
                        Invoice
                      </p>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        <GenerateInvoice ref={invoiceRef} />
      </div>
    );
  }
};
