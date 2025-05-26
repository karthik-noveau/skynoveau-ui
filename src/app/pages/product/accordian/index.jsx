import React, { useState } from "react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { HiMinusSm } from "react-icons/hi";

import styles from "./accordian.module.css";

export const Accordian = ({ data }) => {
  const [selectedList, setSelectedList] = useState(["Product details"]);

  const onMenuClick = (selectedData) => {
    if (selectedList.length) {
      setSelectedList((prev) => {
        if (prev.includes(selectedData.title)) {
          return prev.filter((item) => item !== selectedData.title);
        } else {
          return [...prev, selectedData.title];
        }
      });
    } else {
      let list = [selectedData.title];
      setSelectedList(list);
    }
  };

  return (
    <div className={`${styles.accordianWrapper}`}>
      {data.map((item) => {
        return (
          <div className={`${styles.accordianContainer}`}>
            {/* ---------- accordian title with icon ---------- */}
            <div
              className={`${styles.titleSection} ${
                selectedList.includes(item.title) && styles.active
              }`}
              onClick={() => onMenuClick(item)}
            >
              <p className={`weight-400 text-16 ${styles.title}`}>
                {item.title}
              </p>
              <HiOutlinePlusSmall
                className={`${styles.icon} ${styles.plusIcon} ${
                  selectedList.includes(item.title) && styles.active
                }`}
              />
              <HiMinusSm
                className={`${styles.icon}  ${styles.minusIcon} ${
                  selectedList.includes(item.title) && styles.active
                }`}
              />
            </div>
            {/* ---------- dropdown ---------- */}
            <div
              className={`text-16 ${styles.dropdown} ${
                selectedList.includes(item.title) && styles.showDropdown
              }`}
            >
              <span className={`text-16 line-2 ${styles.description}`}>
                {item.description}
              </span>
              {item.pairData.map((info) => {
                return (
                  <div className={`${styles.infoRow}`}>
                    <div className={`${styles.leftInfo}`}>
                      {Object.keys(info)[0]} :
                    </div>
                    <div className={`${styles.rightInfo}`}>
                      {Object.values(info)[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
