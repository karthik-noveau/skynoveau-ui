import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";
import { useScrollToTop } from "@skynoveau-ui/core";

import { getComponentName, getLabel } from "../utils";
import { VariantRenderer } from "../variant-renderer";

import styles from "./component.module.css";

export const ComponentRenderer = () => {
  const { componentId } = useParams();
  const navigate = useNavigate();
  useScrollToTop({ dep: [componentId] });

  const componentInfo = useMemo(() => {
    let data;
    let componentName = getComponentName(componentId);
    if (COMPONENTS_LIST?.[componentName]) {
      data = COMPONENTS_LIST[componentName];
    } else {
      Object.keys(COMPONENTS_LIST).forEach((key) => {
        let { subComponents } = COMPONENTS_LIST[key];
        if (!data) data = subComponents?.[componentName];
      });
    }

    return data;
  }, [componentId]);

  return (
    <React.Fragment>
      {componentInfo ? (
        <div className={`${styles.componentRenderContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <h1 className={`text-20 weight-400 ${styles.title}`}>
              <>
                <span
                  className={`ellipsis ${styles.navigateBack}`}
                  onClick={() => navigate("/components")}
                >
                  {getLabel(componentId)}
                </span>
              </>

              <span className={`ellipsis `}> {componentInfo.name}</span>
            </h1>
            <p className={`text-14 ${styles.description}`}>
              This component features
              <span className={`text-12 ${styles.count}`}>
                {componentInfo.variants.length}
              </span>
              variants , with options to expand for greater customization.
            </p>
          </div>
          <div className={`${styles.variantsContainer}`}>
            {componentInfo.variants.map((data, index) => {
              return <VariantRenderer key={index} data={data} />;
            })}
          </div>
        </div>
      ) : (
        <div className={`${styles.notFound}`}>Not Found</div>
      )}
    </React.Fragment>
  );
};
