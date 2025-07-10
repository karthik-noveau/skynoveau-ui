import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";

import { getComponentName, getPath } from "../utils";

export default function Preview() {
  const { componentId } = useParams();
  const { variantId } = useParams();

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

    return data.variants.find(({ label }) => getPath(label) === variantId);
  }, [componentId, variantId]);

  return <componentInfo.Component />;
}
