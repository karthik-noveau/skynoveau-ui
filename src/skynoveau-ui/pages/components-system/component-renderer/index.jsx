import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIos } from "react-icons/md";

import { VariantRenderer } from "./variant-renderer";
import { useScrollToTop } from "@common/hooks/index.jsx";
import { COMPONENTS_LIST } from "@skynoveau-ui/components-list";

import styles from "./render.module.css";

export const ComponentRenderer = () => {
  const [baseVariant, setBaseVariant] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useScrollToTop();

  const componentInfo = useMemo(() => {
    let data = null;

    COMPONENTS_LIST.forEach((item) => {
      if (!data) {
        if (item.path === `/${id}`) {
          data = item;
          setBaseVariant(null);
        }
        if (item?.categories) {
          let info = item.categories.find((category) => {
            let path = `/${id}`;
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
  }, [id]);
  return (
    <React.Fragment>
      {componentInfo ? (
        <div className={`${styles.componentRenderWrapper}`}>
          <div className={`${styles.componentRenderContainer}`}>
            <div className={`${styles.titleContainer}`}>
              <h1 className={`title-26 weight-400 ${styles.title}`}>
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
              <p className={`text-14 ${styles.description}`}>
                This component features
                {componentInfo.variantsCount && (
                  <span className={`${styles.count}`}>
                    {componentInfo.variantsCount}
                  </span>
                )}
                variants , with options to expand for greater customization.
              </p>
            </div>
            <div className={`${styles.variantsContainer}`}>
              {componentInfo.variants.map((data) => {
                return <VariantRenderer data={data} />;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${styles.notFound}`}>Not Found</div>
      )}
    </React.Fragment>
  );
};
