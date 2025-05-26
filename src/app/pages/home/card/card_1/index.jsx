import React from "react";
import { Link } from "react-router-dom";

import { useStore } from "store/store";

import styles from "./style.module.css";
import { useShallow } from "zustand/react/shallow";

export const Card1 = ({ image, alt, title, id }) => {
  const { filter } = useStore(
    useShallow((state) => ({ filter: state.filter }))
  );

  return (
    <Link
      className={`${styles.cardContainer}`}
      to="/collections"
      onClick={() => {
        useStore.getState().setFilter({ collections: [id] });
      }}
    >
      <img src={image} alt={alt} />
      <p className={`text-18 weight-200`}>{title}</p>
    </Link>
  );
};
