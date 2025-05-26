import React, { useState } from "react";
import { VscListFilter } from "react-icons/vsc";

import { Modal } from "../bottom-modal";
import { Filter } from "../filter";

import styles from "./filter.module.css";

export const MobileFilter = ({
  filter,
  filterConfig,
  onCollectionChange,
  onPriceChange,
  onStockChange,
}) => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <Modal open={isOpen}>
        <div className={`${styles.filterWrapper}`}>
          <p className={`text-20 weight-400 ${styles.filterTitle}`}>
            Apply Filter
          </p>
          <Filter
            filter={filter}
            filterConfig={filterConfig}
            onCollectionChange={onCollectionChange}
            onPriceChange={onPriceChange}
            onStockChange={onStockChange}
            className={`${styles.filter}`}
          />
          <div
            className={`text-16 ${styles.closeButton}`}
            onClick={() => setisOpen(false)}
          >
            Close
          </div>
        </div>
      </Modal>

      <div
        className={`text-18 ${styles.filterButton}`}
        onClick={() => setisOpen(true)}
      >
        <VscListFilter className={`${styles.icon}`} /> Filter
      </div>
    </>
  );
};
