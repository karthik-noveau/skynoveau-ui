import React from "react";

import styles from "./filter.module.css";
import { CheckBox } from "./checkbox";
import { RangeSlider } from "./range-slider";

export const Filter = ({
  filter,
  filterConfig,
  onCollectionChange,
  onPriceChange,
  onStockChange,
  className,
}) => {
  return (
    <>
      {filter && (
        <div className={`${styles.filterContainer} ${className}`}>
          {filterConfig.collections && (
            <Section title="Collections">
              <div className={`${styles.body}`}>
                {filterConfig.collections.map((item) => {
                  return (
                    <CheckBox
                      checked={filter.collectionIdList.includes(item.id)}
                      readOnly={item?.readOnly}
                      onChange={() => onCollectionChange(item)}
                    >
                      <p
                        className={`text-14 mb-text-16 ${styles.checkboxText}`}
                        id="sui-ff"
                      >
                        {item.label}
                      </p>
                    </CheckBox>
                  );
                })}
              </div>
            </Section>
          )}
          <Section title="Price" className={`${styles.priceSection}`}>
            <div className={`${styles.body}`}>
              <RangeSlider
                data={filterConfig.priceRange}
                value={filter.priceRange || filterConfig.priceRange}
                onChange={onPriceChange}
              />
            </div>
          </Section>
          <Section title="Availability" allowDivider={false}>
            <div className={`${styles.body}`}>
              <CheckBox
                checked={filter.inStock}
                onChange={() => onStockChange(true)}
              >
                <p
                  className={`text-14 mb-text-16 ${styles.checkboxText}`}
                  id="sui-ff"
                >
                  {filterConfig.inStock.label}
                </p>
              </CheckBox>
            </div>
          </Section>
        </div>
      )}
    </>
  );
};

const Section = ({ children, title, allowDivider = true, className }) => {
  return (
    <>
      <div className={`${allowDivider && styles.divider} ${className}`}>
        <p className={`text-16 mb-text-18 weight-400 ${styles.title}`}>
          {title}
        </p>
        {children}
      </div>
    </>
  );
};
