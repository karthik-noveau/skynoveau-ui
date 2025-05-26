/* eslint-disable default-case */
import React from "react";
import { Empty } from "antd";

import { Loader } from "@components/loader/basic/compact";
import { ProductCard } from "./card";

import styles from "./right.module.css";
import { Pagination } from "@components/pagination";
import { Header } from "./header";

export const RightSection = ({
  productData = [],
  searchValue,
  sort,
  currentPage,
  pageSize,
  count,
  isLoading,
  sortConfig,
  loadingRef,
  onPaginationChange,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div>
      <Header
        count={count}
        searchValue={searchValue}
        sort={sort}
        sortConfig={sortConfig}
        isLoading={isLoading}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
      />
      <ListRender
        count={count}
        onPaginationChange={onPaginationChange}
        productData={productData}
        currentPage={currentPage}
        pageSize={pageSize}
        isLoading={isLoading}
        loadingRef={loadingRef}
      />
    </div>
  );
};

const ListRender = ({
  count,
  onPaginationChange,
  productData,
  currentPage,
  pageSize,
  isLoading,
  loadingRef,
}) => {
  if (isLoading) {
    return <Loader showText={false} className={styles.loader} />;
  } else if (productData.length === 0) {
    return (
      <div className={`${styles.emptyWrapper}`}>
        <Empty />
      </div>
    );
  } else {
    return (
      <div className={`${styles.productsWrapper}`}>
        <div className={`${styles.productsContainer}`}>
          {productData.map((item) => {
            return (
              <ProductCard
                key={item._id}
                imageSrc={item.images[0]}
                alt={item.name}
                path={`/collections/${item.collectionId}/products/${item._id}`}
                title={item.name}
                price={item.price}
                discountPrice={item.discountPrice}
                className={`${styles.allCollectinsCard}`}
                id={item._id}
                quantity={item.quantity}
              />
            );
          })}
        </div>
        <Pagination
          total={count}
          currentPage={currentPage}
          pageSize={pageSize}
          onChange={onPaginationChange}
          loadingRef={loadingRef}
        />
      </div>
    );
  }
};
