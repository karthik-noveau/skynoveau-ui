import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { COMPONENTS_LIST } from "@list/index";

export default function Preview() {
  const { componentId } = useParams();
  const { variantId } = useParams();

  const componentInfo = useMemo(() => {
    let data = null;

    Object.values(COMPONENTS_LIST).forEach((item) => {
      if (!data) {
        if (item.path === `/${componentId}`) data = item;
        if (item?.categories) {
          data = item.categories.find((category) => {
            let path = `/${componentId}`;
            return category.path === path;
          });
        }
      }
    });

    data = data.variants.find((item) => {
      let constructPath = `${data.path}${item.path}`;
      return constructPath === `/${componentId}/${variantId}`;
    });

    return data;
  }, [componentId, variantId]);

  return <componentInfo.Component />;
}
