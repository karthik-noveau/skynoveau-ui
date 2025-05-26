import { serviceRequest as createService } from "@utils/service";

const serviceRequest = createService({
  localhost: "http://localhost:8080/ecommerce",
  production: "https://dhanika-ecommerce-server.vercel.app/ecommerce",
  isProduction: true,
});

const getAccountInfo = () => {
  const appId = "app-e53e62c6-58ef-475f-aece-550e395b417e";
  const workspaceId = "workspace-55f5af36-e8a5-42e8-8319-171cc22b829d";

  return { appId, workspaceId };
};

// ---------- user service ----------
export const userService = {
  login: ({ email, password }) => {
    return serviceRequest.post({
      url: "/users/login",
      payload: { email, password },
    });
  },
  register: ({ firstName, email, password, checkUnique }) => {
    const { workspaceId, appId } = getAccountInfo();
    return serviceRequest.post({
      url: "/users/register",
      payload: { appId, workspaceId, firstName, email, password, checkUnique },
    });
  },
  fetchUser: ({ userId }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({
      url: "/users",
      query: {
        appId,
        userId,
      },
    });
  },
  updateUser: ({
    userId,
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.put({
      url: "/users",
      payload: {
        appId,
        userId,
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      },
    });
  },
};

// ---------- collection ----------
export const collectionService = {
  fetchCollections: () => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({ url: `/collections?appId=${appId}` });
  },
};

// ---------- product ----------
export const productService = {
  fetchProducts: ({
    collectionIdList,
    sortBy,
    sortOrder,
    priceRange,
    inStock,
    lastKey,
    pageSize,
    currentPage,
    search,
  }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({
      url: "/products",
      query: {
        appId,
        collectionIdList,
        sortBy,
        sortOrder,
        priceRange,
        inStock,
        lastKey,
        pageSize,
        currentPage,
        search,
      },
    });
  },
  fetchProductById: ({ productId }) => {
    return serviceRequest.get({
      url: "/products",
      query: {
        productId,
      },
    });
  },
  fetchProductsByIdList: ({ productIdList }) => {
    return serviceRequest.get({
      url: "/products",
      query: {
        productIdList,
      },
    });
  },
};

// ---------- cart ----------
export const cartService = {
  createCartProduct: ({ userId, products, isAddCountMerge }) => {
    const { workspaceId, appId } = getAccountInfo();
    return serviceRequest.post({
      url: "/cart/create",
      payload: { appId, workspaceId, userId, products, isAddCountMerge },
    });
  },
  fetchCartProducts: ({ userId, productId }) => {
    const { appId } = getAccountInfo();
    let url = productId
      ? `/cart?appId=${appId}&userId=${userId}&productId=${productId}`
      : `/cart?appId=${appId}&userId=${userId}`;
    return serviceRequest.get({ url });
  },
  fetchCartCount: ({ userId }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({
      url: "/cart/count",
      query: {
        appId,
        userId,
      },
    });
  },
  updateCartProductById: ({ userId, productId, addCount }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.put({
      url: "/cart",
      payload: { userId, productId, addCount, appId },
    });
  },
  deleteCartProductById: ({ userId, productId }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.delete({
      url: "/cart",
      query: {
        appId,
        userId,
        productId,
      },
    });
  },
  deleteCartProductsById: ({ userId, productIdList }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.delete({
      url: "/cart",
      query: {
        appId,
        userId,
        productIdList,
      },
    });
  },
  validateCoupon: ({ code }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({
      url: "/coupons/validate",
      query: {
        code,
        appId,
      },
    });
  },
};

// ---------- order ----------
export const orderService = {
  fetchOrder: ({ userId }) => {
    const { appId } = getAccountInfo();
    return serviceRequest.get({
      url: "/orders",
      query: {
        appId,
        userId,
      },
    });
  },
  createOrder: ({
    userId,
    products,
    couponInfo,
    deliveryInfo,
    paidAmount,
    cartAmount,
    razorpayPaymentId,
    paymentInfo,
  }) => {
    const { workspaceId, appId } = getAccountInfo();
    const payload = {
      userId,
      products,
      deliveryInfo,
      paidAmount,
      cartAmount,
      razorpayPaymentId,
      appId,
      workspaceId,
    };
    if (couponInfo) payload.couponInfo = couponInfo;
    if (paymentInfo) payload.paymentInfo = paymentInfo;
    if (razorpayPaymentId) payload.razorpayPaymentId = razorpayPaymentId;

    return serviceRequest.post({
      url: "/orders/create",
      payload,
    });
  },
};
