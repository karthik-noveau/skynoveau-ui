import React from "react";
import { useNavigate } from "react-router-dom";

// import { useScrollToTop } from "@skynoveau-ui/utils";
import { COMPONENTS_LIST } from "@list/index";

import styles from "./collections.module.css";

export const ComponentCollections = () => {
  const navigate = useNavigate();
  // useScrollToTop();

  return (
    <div className={`${styles.collectionsContaier}`}>
      <h1 className={`text-24 weight-400 ${styles.title}`}>Components overview</h1>
      <p className={`text-16 ${styles.description}`}>
        Components use custom variants to allow you to completely customize the
        look and feel of each component.
      </p>
      <div className={`${styles.collectionsCards}`}>
        {COMPONENTS_LIST.map((item, index) => {
          if (!item.categories) {
            return (
              <div
                className={`${styles.card}`}
                onClick={() => {
                  navigate(`/components${item.path}`);
                }}
                key={index}
              >
                <p className={`text-16`}>{item.name}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className={`${styles.categoryWrapper}`}>
                <div className={`${styles.categoryContainer}`}>
                  <p className={`text-16 weight-400 ${styles.categoryTitle}`}>
                    {item.name}
                  </p>
                  {item.categories.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.card}`}
                        onClick={() => {
                          navigate(`/components${category.path}`);
                        }}
                      >
                        <p className={`text-14`}>{category.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
