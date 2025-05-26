import React from "react";
import { BsGridFill } from "react-icons/bs";

import { DropDown } from "./dropdown";
import styles from "./header.module.css";
import { Search } from "@components/search";

export const Header = ({
  count,
  sort,
  sortConfig,
  searchValue,
  isLoading,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div className={`${styles.headerWrapper}`}>
      <div className={`${styles.headerContainer}`}>
        <Search value={searchValue} onChange={onSearchChange} />

        <div className={`${styles.rightSection}`}>
          <div className={`${styles.resultCount}`}>
            {!isLoading && (
              <>
                <span className={`text-14 default-font ${styles.count}`}>
                  {count}
                </span>
                <span className={`text-14 ${styles.text}`}>
                  Results <span>found</span>
                </span>
              </>
            )}
          </div>
          <div className={`${styles.dropdownContainer}`}>
            <DropDown
              className={`${styles.suiDropdown}`}
              dataSource={sortConfig.map((item) => ({
                value: item.id,
                label: item.label,
              }))}
              value={sortConfig.find((item) => item.id === sort.id)?.label}
              onChange={onSortChange}
            />
            <div className={`${styles.resizeContainer}`}>
              {/* <BsViewStacked className={`${styles.stackIcon}`} /> */}
              <BsGridFill className={`${styles.gridIcon}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
