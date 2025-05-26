import { create } from "zustand";

import { STORAGE_KEYS } from "@app/config.js";

const initialState = {
  storedCollections: {
    data: [],
  },
  storedCart: JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_CART)) || {},
  storedCouponCode: "",
  accountInfo:
    JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_ACCOUNT)) || {},
  storageCart: JSON.parse(localStorage.getItem(STORAGE_KEYS.SHOP_CART)) || {},
  checkoutInfo: {},

  pageLoading: false,
  apiLoading: false,
};

export const useEcommerceStore = create((setState, getState) => ({
  ...initialState,
  setPageLoading: (data) => {
    setState((state) => {
      return { pageLoading: data };
    });
  },
  setApiLoading: (data) => {
    setState((state) => {
      return { apiLoading: data };
    });
  },

  // ---------- auth ----------
  setAccountInfo: (data) => {
    localStorage.setItem(STORAGE_KEYS.SHOP_ACCOUNT, JSON.stringify(data));
    setState((state) => {
      return { accountInfo: data };
    });
  },
  setLogout: () => {
    setState((state) => {
      localStorage.removeItem(STORAGE_KEYS.SHOP_ACCOUNT);
      localStorage.removeItem(STORAGE_KEYS.SHOP_CART);
      return {
        accountInfo: {},
        storageCart: {},
        storedCart: {},
        storedCouponCode: {},
        checkoutInfo: {},
      };
    });
  },

  // ---------- collecion ----------
  setStoredCollections: (data) => {
    setState((state) => {
      return { storedCollections: { ...state.storedCollections, ...data } };
    });
  },

  // ---------- collection page filter ----------
  setCollectionPageFilter: (data) => {
    setState((state) => {
      return {
        collectionPageFilter: { ...state.collectionPageFilter, ...data },
      };
    });
  },

  // ---------- product ----------
  setFetchedProducts: (data) => {
    setState((state) => {
      return { fetchedProducts: { ...state.fetchedProducts, ...data } };
    });
  },

  // ---------- cart ----------
  setStorageCart: ({ data, isEmpty }) => {
    setState((state) => {
      if (isEmpty) {
        localStorage.removeItem(STORAGE_KEYS.SHOP_CART);
        return { storageCart: {} };
      } else {
        localStorage.setItem(
          STORAGE_KEYS.SHOP_CART,
          JSON.stringify({ ...state.storageCart, ...data })
        );
        return { storageCart: { ...state.storageCart, ...data } };
      }
    });
  },
  setStoredCart: (data) => {
    setState((state) => {
      return { storedCart: { ...state.storedCart, ...data } };
    });
  },
  setRemoveFetchedCartProduct: (productsId) => {
    setState((state) => {
      let storedCart = {};
      let storageCart = {};

      Object.keys(state.storedCart).forEach((item) => {
        if (!productsId.includes(state.storedCart[item].productId)) {
          storedCart[item] = state.storedCart[item];
        }
      });

      if (!state.accountInfo?.userId) {
        Object.keys(state.storageCart).forEach((item) => {
          if (!productsId.includes(state.storageCart[item].productId)) {
            storageCart[item] = state.storageCart[item];
          }
          localStorage.setItem(
            STORAGE_KEYS.SHOP_CART,
            JSON.stringify({ ...storageCart })
          );
        });
      }

      return { storedCart, storageCart };
    });
  },
  setStoredCouponCode: (data) => {
    setState((state) => {
      return { storedCouponCode: data };
    });
  },

  // ---------- orders ----------
  setCheckoutInfo: (data) => {
    setState((state) => {
      return { checkoutInfo: data };
    });
  },
  setFetchedOrders: (data) => {
    setState((state) => {
      return { fetchedOrders: { ...state.fetchedOrders, ...data } };
    });
  },
}));
