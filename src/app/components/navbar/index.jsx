import React from "react";

import { NavbarWeb } from "./web";
import { NavbarMobile } from "./mobile";
import { useEcommerceStore } from "@app/store";

import styles from "./navbar.style.module.css";

export const Navbar = () => {
  const { storedCollections } = useEcommerceStore((state) => ({
    storedCollections: state.storedCollections,
  }));

  const getCollectionsMenu = () => {
    let data = [{ name: "Shop All", path: "/collections" }];

    let collectionList = storedCollections.data.map((item) => {
      return {
        name: item.name,
        path: `/collections/${item.id}`,
      };
    });
    data = [...data, ...collectionList];
    return data;
  };
  const HEADER_MENUS = [
    { name: "Home", path: "/" },
    { name: "Story", path: "/story" },
    {
      name: "Collections",
      dropdown: getCollectionsMenu(),
    },
    { name: "FAQ's", path: "/faqs" },
    { name: "Contact us", path: "/contact" },
  ];

  return (
    <React.Fragment>
      {/* ---------- web ---------- */}
      <div className={styles.deskHeader}>
        <NavbarWeb headerMenuList={HEADER_MENUS} />
      </div>

      {/* ---------- mobile ---------- */}
      <div className={styles.mobileHeader}>
        <NavbarMobile headerMenuList={HEADER_MENUS} />
      </div>
    </React.Fragment>
  );
};
