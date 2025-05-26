import React, { useMemo } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineSlash } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";

import styles from "./pagination.module.css";

export const Pagination = ({
  currentPage,
  pageSize,
  total,
  loadingRef,
  onChange = () => {},
}) => {
  const onPaginationChange = ({ currentPage, pageSize }) => {
    if (!loadingRef?.current?.loading) {
      loadingRef.current.loading = true;
      onChange({ currentPage, pageSize });
    }
  };

  const totalPages = useMemo(() => {
    let count = total / pageSize;
    return Math.ceil(count);
  }, [total, pageSize]);

  return (
    <>
      <div className={`${styles.paginationWrapper}`}>
        <div
          className={`${styles.previousSection} ${
            currentPage === 1 && styles.disabled
          }`}
        >
          <div className={`${styles.goToInitial}`}>
            <div className={`${styles.icons}`}>
              <IoIosArrowBack className={`${styles.icon}`} />
              <IoIosArrowBack className={`${styles.icon}`} />
            </div>
            <p
              onClick={() => {
                currentPage > 1 &&
                  onPaginationChange({ currentPage: 1, pageSize });
              }}
              className={`text-14 ${styles.text}`}
            >
              Page 1
            </p>
          </div>
          <div
            onClick={() => {
              currentPage > 1 &&
                onPaginationChange({ currentPage: currentPage - 1, pageSize });
            }}
            className={`${styles.navigateBox}`}
          >
            <IoIosArrowBack className={`text-14 ${styles.icon}`} />
            <p className={`text-14 weight-300 ${styles.text}`}>Previous</p>
          </div>
        </div>

        <div className={`text-16 ${styles.centerSection}`}>
          {currentPage}{" "}
          <HiOutlineSlash className={`text-18 ${styles.slashIcon}`} />{" "}
          {totalPages}
        </div>

        <div
          onClick={() => {
            currentPage < totalPages &&
              onPaginationChange({ currentPage: currentPage + 1, pageSize });
          }}
          className={`${styles.nextSection} ${
            currentPage === totalPages && styles.disabled
          }`}
        >
          <div className={`${styles.navigateBox}`}>
            <p className={`text-14 weight-300 ${styles.text}`}>Next</p>
            <IoIosArrowForward className={`text-14 ${styles.icon}`} />
          </div>
        </div>
      </div>
    </>
  );
};
