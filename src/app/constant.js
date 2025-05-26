export const QUERY_KEYS = {
  products: "products",
  productId: "productId",
  productsId: "productsId",
  productsById: "productsById",
  productById: "productById",
  productsCount: "productsCount",
  collections: "collections",
  cartProducts: "cartProducts",
  cartCount: "cartCount",
  user: "user",
  orders: "orders",
  allOrders: "allOrders",
  ordersCount: "ordersCount",
  bills: "bills",
};

export const SORT = {
  CreatedAt: { id: "createdAt", label: "Created At" },
  UpdatedAt: { id: "updatedAt", label: "Updated At" },
  Name: { id: "name", label: "Name" },
  Price: { id: "price", label: "Price" },
  NameAsc: { id: "nameAsc", label: "Alphabetically A - Z" },
  NameDesc: { id: "nameDesc", label: "Alphabetically Z - A" },
  PriceAsc: { id: "priceAsc", label: "Price low to high" },
  PriceDesc: { id: "priceDesc", label: "Price high to low" },
};

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};

export const FILTER = {
  InStock: {
    id: "inStock",
    label: "In Stock",
  },
  PriceRange: [0, 5000],
};
