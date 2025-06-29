import React, { useMemo, useState } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
// import { useScrollToTop } from "@skynoveau-ui/utils";
import { COMPONENTS_LIST } from "@list/index";

import { VariantRenderer } from "../variant-renderer";

import styles from "./component.module.css";

export const ComponentRenderer = () => {
  const [baseVariant, setBaseVariant] = useState(null);
  const { componentId } = useParams();
  const navigate = useNavigate();
  // useScrollToTop();

  const componentInfo = useMemo(() => {
    let data = null;

    Object.values(COMPONENTS_LIST).forEach((item) => {
      if (!data) {
        if (item.path === `/${componentId}`) {
          data = item;
          setBaseVariant(null);
        }
        if (item?.categories) {
          let info = item.categories.find((category) => {
            let path = `/${componentId}`;
            setBaseVariant(item.name);
            return category.path === path;
          });
          data = info;
        }
      }
    });

    return {
      ...data,
      variantsCount: data?.variants ? data.variants.length : 1,
    };
  }, [componentId]);
  return (
    <React.Fragment>
      {componentInfo ? (
        <div className={`${styles.componentRenderContainer}`}>
          <div className={`${styles.titleContainer}`}>
            <h1 className={`text-24 weight-400 ${styles.title}`}>
              {baseVariant && (
                <>
                  <span
                    className={`ellipsis ${styles.navigateBack}`}
                    onClick={() => navigate("/components")}
                  >
                    {baseVariant}
                  </span>
                  <MdArrowBackIos className={`${styles.icon}`} />
                </>
              )}

              <span className={`ellipsis `}> {componentInfo.name}</span>
            </h1>
            <p className={`text-16 ${styles.description}`}>
              This component features
              {componentInfo.variantsCount && (
                <span className={`text-14 ${styles.count}`}>
                  {componentInfo.variantsCount}
                </span>
              )}
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
