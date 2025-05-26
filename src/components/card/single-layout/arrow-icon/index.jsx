import { Card } from "./card";

import styles from "./style.module.css";

import NewSareeImg from "@skynoveau-ui/assets/card/new-saree-img.png";

export const CardComponent = ({ DATA = FALLBACK_DATA }) => {
  return (
    <div className={`${styles.collectionContainer}`}>
      {DATA.map((item) => {
        return (
          <Card
            image={item.image}
            id={item.id}
            title={item.name}
            path={`collections/product/${item.id}`}
            description={item.price}
            alt="CARD"
          />
        );
      })}
    </div>
  );
};

export const FALLBACK_DATA = [
  {
    id: "designer-wear",
    name: "designer wear",
    image: NewSareeImg,
  },
  {
    id: "evening-wear",
    name: "evening wear",
    image: NewSareeImg,
  },
  {
    id: "festival-wear",
    name: "festival wear",
    image: NewSareeImg,
  },
  {
    id: "casual-wear",
    name: "casual wear",
    image: NewSareeImg,
  },
];
