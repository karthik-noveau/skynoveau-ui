import { useLocation, useNavigate } from "react-router-dom";
import { RxSlash } from "react-icons/rx";

import styles from "./breadcrumb.module.css";

export const BreadCrumb = ({ pathList = DATA, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`${styles.container} ${className}`}>
      {pathList.map((item, index) => {
        let allowSeperator = pathList.length > 1;
        let isLastIndex = pathList.length - 1 === index;
        return (
          <p
            onClick={() => navigate(item.path)}
            className={`text-16 ${styles.menu} ${
              location.pathname === item.path && styles.active
            }`}
          >
            {item.name}{" "}
            {allowSeperator && !isLastIndex && (
              <span className={`${styles.icon}`}>
                <RxSlash />
              </span>
            )}
          </p>
        );
      })}
    </div>
  );
};

const DATA = [
  { name: "Cart", path: "/cart" },
  { name: "Checkout", path: "/checkout" },
];
