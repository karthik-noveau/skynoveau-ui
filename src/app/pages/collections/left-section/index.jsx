import React from "react";

import { Filter } from "./filter";
import { MobileFilter } from "./mobile-filter";

import styles from "./left.module.css";

export const LeftSection = ({ filter, filterConfig, onFilterChange }) => {
  const onCollectionChange = ({ id }) => {
    onFilterChange({ collectionId: id });
  };
  const onPriceChange = (value) => {
    onFilterChange({ priceRange: value });
  };
  const onStockChange = (flag) => {
    onFilterChange({ inStock: flag });
  };

  return (
    <>
      {/* ---------- web filter ---------- */}
      <div className={`${styles.desktopFilter}`}>
        <div className={`${styles.header}`}>
          <p className={`text-16 weight-400 ${styles.filterTitle}`}>FILTERS</p>
        </div>
        <Filter
          filter={filter}
          filterConfig={filterConfig}
          onCollectionChange={onCollectionChange}
          onPriceChange={onPriceChange}
          onStockChange={onStockChange}
          className={`${styles.filter}`}
        />
      </div>

      {/* ---------- mobile filter ---------- */}
      <div className={`${styles.mobileFilter}`}>
        <MobileFilter
          filter={filter}
          filterConfig={filterConfig}
          onCollectionChange={onCollectionChange}
          onPriceChange={onPriceChange}
          onStockChange={onStockChange}
        />
      </div>
    </>
  );
};
