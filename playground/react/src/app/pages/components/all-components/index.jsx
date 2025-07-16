import React from "react";
import { useNavigate } from "react-router-dom";
// import { useScrollToTop } from "@skynoveau-ui/utils";
import { COMPONENTS_LIST } from "@list/index";

import { getLabel, getPath } from "../utils";

import styles from "./collections.module.css";

export const ComponentCollections = () => {
  const navigate = useNavigate();
  // useScrollToTop();

  return (
    <div className={`${styles.collectionsContaier}`}>
      <h1 className={`text-24 weight-400 ${styles.title}`}>
        Components overview
      </h1>
      <p className={`text-16 ${styles.description}`}>
        Components use custom variants to allow you to completely customize the
        look and feel of each component.
      </p>
      <div className={`${styles.collectionsCards}`}>
        {Object.keys(COMPONENTS_LIST).map((componentName, index) => {
          let { subComponents } = COMPONENTS_LIST[componentName];

          return (
            <>
              {!subComponents && (
                <div
                  className={`${styles.card}`}
                  onClick={() => {
                    navigate(`/components/${getPath(componentName)}`);
                  }}
                  key={index}
                >
                  <p className={`text-14`}>{getLabel(componentName)}</p>
                </div>
              )}

              {subComponents && (
                <>
                  {/* <div key={index} className={`${styles.subCardWrapper}`}>
                    <div key={index} className={`${styles.subCardContainer}`}> */}
                  <p className={`text-14 ${styles.subCardTitle}`}>
                    {getLabel(componentName)}
                  </p>

                  {Object.keys(subComponents).map((subComponentName, index) => {
                    return (
                      <div key={index} className={`${styles.card}`}>
                        <p className={`text-14 ${styles.categoryTitle}`}>
                          {getLabel(subComponentName)}
                        </p>
                      </div>
                    );
                  })}
                  {/* </div>
                  </div> */}
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
