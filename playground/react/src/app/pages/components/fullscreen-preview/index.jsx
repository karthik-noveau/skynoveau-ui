import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";
import { useScrollToTop } from "@skynoveau-ui/core";

import { getPath } from "../utils";

export default function Preview() {
  const { componentId, componentTypeId, variantId } = useParams();

  useScrollToTop({ dep: [componentId] });

  const componentInfo = useMemo(() => {
    let variants = COMPONENTS_LIST?.[componentId]?.variants;

    if (componentTypeId) {
      variants =
        COMPONENTS_LIST[componentId]["subComponents"][componentTypeId].variants;
    }

    const matchedVarinat = variants?.find(
      (variant) => getPath(variant.label) === variantId
    );

    return matchedVarinat;
  }, [componentId, componentTypeId, variantId]);

  return <componentInfo.Component />;
}
