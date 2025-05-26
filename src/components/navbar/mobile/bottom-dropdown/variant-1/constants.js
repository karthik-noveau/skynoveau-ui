export const MENU_LIST = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  {
    name: "Collections",
    dropdown: [
      { name: "collection 1", path: "/collection1" },
      { name: "collection 1", path: "/collection2" },
    ],
  },
  {
    name: "Products",
    dropdown: [
      { name: "saree", path: "/saree" },
      { name: "lower", path: "/lower" },
    ],
  },
];
