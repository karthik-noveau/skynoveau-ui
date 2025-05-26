import React, { useEffect, useState } from "react";
import { Table as TableComponent } from "antd";
import { createStyles } from "antd-style";

import { Skeleton } from "@components/image/placeholder/skeleton";

import styles from "./table.override.module.css";
import { endApiLoading, startApiLoading } from "@utils";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});
const SKELETON_HEADER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Table = ({
  loading,
  columns,
  dataSource,
  currentPage,
  pageSize,
  count,
  onPaginationChange,
  allowOnClick = false,
  skeletonHeight,
  skeletonRows = 10,
  className,
}) => {
  const SKELETON_ROWS = Array.from(
    { length: skeletonRows },
    (item, index) => index + 1
  );
  const { styles: antStyles } = useStyle();
  const [showLoading, setShowLoading] = useState(false);

  // Handle pagination structure
  const pagination =
    currentPage && pageSize && count
      ? {
          current: currentPage,
          pageSize: pageSize,
          total: count,
        }
      : false;

  useEffect(() => {
    let startTime = startApiLoading({ setLoading: setShowLoading });

    if (!loading) {
      endApiLoading({ startTime, setLoading: setShowLoading, delay: 0.3 });
    }
  }, [loading]);

  // Render the skeleton table while loading
  const renderSkeletonTable = ({ height }) => {
    return (
      <div style={{ height: height }} className={styles.skeletonTable}>
        <div className={styles.skeletonHeaderWrapper}>
          <div className={styles.skeletonHeaderContainer}>
            {SKELETON_HEADER.map((col, index) => (
              <Skeleton
                key={index}
                minWidth="120px"
                height="12px"
                margin="10px 0"
                borderRadius="4px"
              />
            ))}
          </div>
        </div>
        <div className={styles.skeletonBody}>
          {SKELETON_ROWS.map((_, index) => (
            <div
              key={index}
              className={`${styles.skeletonRow} ${
                SKELETON_ROWS.length - 1 === index && styles.skeletonLastRow
              }`}
            >
              {SKELETON_HEADER.map((col, colIndex) => (
                <Skeleton
                  key={colIndex}
                  minWidth="120px"
                  height="12px"
                  margin="10px 0"
                  borderRadius="4px"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${styles.antTable} ${
        allowOnClick && styles.allowOnClick
      } ${className}`}
    >
      {showLoading ? (
        renderSkeletonTable({ height: skeletonHeight })
      ) : (
        <TableComponent
          loading={false}
          className={antStyles.customTable}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          onChange={(pagination, filters, sorter) => {
            onPaginationChange(pagination);
          }}
          scroll={{
            y: "calc(100vh - 342px)",
          }}
        />
      )}
    </div>
  );
};
