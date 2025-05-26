export const MENU_LIST = [
  { name: "Home", path: "/" },
  { name: "Story", path: "/story" },
  {
    name: "Collections",
    dropdown: [
      { name: "Shop All", category: "collections", path: "/collections" },
      {
        name: "Collection name",
        id: "collection-name",
        category: "collections",
        path: "/collections",
      },
    ],
  },
  { name: "FAQ's", path: "/faqs" },
  { name: "Connect", path: "/contact" },
];
