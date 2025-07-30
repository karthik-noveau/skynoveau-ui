import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";
import { Loader, useScrollToTop } from "@skynoveau-ui/core";

import { getLabel, getPath } from "../utils";
import { VariantRenderer } from "../variant-renderer";

import styles from "./component.module.css";

export const ComponentRenderer = () => {
  const { componentId, componentTypeId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  useScrollToTop({ dep: [componentId] });

  const { variants, subComponents } = useMemo(() => {
    let variants = COMPONENTS_LIST?.[componentId]?.variants;
    let subComponents = null;

    try {
      if (componentTypeId) {
        subComponents = COMPONENTS_LIST[componentId]["subComponents"];
        variants =
          COMPONENTS_LIST[componentId]["subComponents"][componentTypeId]
            .variants;
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      subComponents = null;
      variants = null;
    }

    return { variants, subComponents };
  }, [componentId, componentTypeId]);

  return (
    <React.Fragment>
      {variants ? (
        <div className={`${styles.componentRenderContainer}`}>
          {componentTypeId && (
            <div className={`${styles.componentsTypesContainer}`}>
              <h1 className={`text-26 weight-500 ${styles.rootComopnentTitle}`}>
                <>
                  <span
                    className={`ellipsis ${styles.navigateBack}`}
                    onClick={() => navigate("/components")}
                  >
                    {getLabel(componentId)}
                  </span>
                </>
              </h1>

              <div className={`${styles.subCardsContainer}`}>
                {Object.keys(subComponents).map((subComponentName) => {
                  return (
                    <p
                      key={subComponentName}
                      className={`text-16 ${styles.card} ${
                        componentTypeId === getPath(subComponentName) &&
                        styles.active
                      }`}
                      onClick={() => {
                        setIsLoading(true);

                        navigate(
                          `/components/${componentId}/${getPath(
                            subComponentName
                          )}`
                        );

                        setTimeout(() => {
                          setIsLoading(false);
                        }, 500);
                      }}
                    >
                      {getLabel(subComponentName)}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------- variants ---------- */}

          {isLoading ? (
            <div className={`${styles.loaderContainer}`}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={`${styles.titleContainer}`}>
                <h1 className={`text-20 weight-400 ${styles.title}`}>
                  <>
                    <span
                      className={`ellipsis ${styles.navigateBack}`}
                      onClick={() => navigate("/components")}
                    >
                      {componentTypeId
                        ? `${getLabel(componentId)} > ${getLabel(
                            componentTypeId
                          )}`
                        : getLabel(componentId)}
                    </span>
                  </>
                </h1>
                <p className={`text-14 ${styles.description}`}>
                  Contains{" "}
                  <span className={`text-12 ${styles.count}`}>
                    {variants.length}
                  </span>{" "}
                  variant{variants.length > 1 ? "s" : ""}, designed for specific
                  use cases and seamless workflow integration.
                </p>
              </div>

              <div className={`${styles.variantsContainer}`}>
                {variants.map((data, index) => {
                  return <VariantRenderer key={index} data={data} />;
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className={`text-18 ${styles.notFound}`}>Component Not Found</div>
      )}
    </React.Fragment>
  );
};
