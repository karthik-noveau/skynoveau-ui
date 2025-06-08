import React from "react";
import { useNavigate } from "react-router-dom";

import { useScrollToTop } from "@skynoveau-ui/utils";
import { COMPONENTS_LIST } from "@list/index";

import styles from "./collections.module.css";

export const ComponentCollections = () => {
  const navigate = useNavigate();
  useScrollToTop();

  return (
    <div className={`${styles.collectionsWrapper}`}>
      <div className={`${styles.collectionsContaier}`}>
        <h1 className={`title-24 weight-400 ${styles.title}`}>Components</h1>
        <p className={`text-14 ${styles.description}`}>
          Components use custom variants to allow you to completely customize
          the look and feel of each component.
        </p>
        <div className={`${styles.collectionsCards}`}>
          {COMPONENTS_LIST.map((item) => {
            if (!item.categories) {
              return (
                <div
                  className={`${styles.card}`}
                  onClick={() => {
                    navigate(`/components${item.path}`);
                  }}
                >
                  <p className={`text-14`}>{item.name}</p>
                </div>
              );
            } else {
              return (
                <div className={`${styles.categoryWrapper}`}>
                  <div className={`${styles.categoryContainer}`}>
                    <p className={`text-16 weight-400 ${styles.categoryTitle}`}>
                      {item.name}
                    </p>
                    {item.categories.map((category) => {
                      return (
                        <div
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
    </div>
  );
};
