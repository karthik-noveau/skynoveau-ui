import { useQuery, QueryClient } from "@tanstack/react-query";

import {
  cartService,
  collectionService,
  orderService,
  productService,
  userService,
} from "./service.js";
import { QUERY_KEYS } from "@app/constant.js";

export const queryClient = new QueryClient();

// ---------- user ----------
export const useFetchUser = (props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.user],
    queryFn: () => userService.fetchUser(props),
    staleTime: Infinity,
    refetchOnReconnect: true,
  });
};

// ---------- collections ----------
export const useFetchCollections = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.collections],
    queryFn: () => collectionService.fetchCollections(),
    staleTime: Infinity,
    refetchOnReconnect: true,
  });
};

// ---------- proudcts ----------
export const useFetchProducts = (props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.products],
    queryFn: () => productService.fetchProducts(props),
    staleTime: 0,
    refetchOnReconnect: true,
    enabled: props.enabled,
  });
};
export const useFetchProductById = (props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.productId],
    queryFn: () => productService.fetchProductById(props),
    staleTime: 0,
    refetchOnReconnect: true,
  });
};
export const useFetchProductByIdList = (props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.productId],
    queryFn: () => productService.fetchProducts(props),
    staleTime: 0,
    refetchOnReconnect: true,
  });
};

// ---------- cart ----------
export const useFetchCartProducts = ({ userId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cartProducts],
    queryFn: () => cartService.fetchCartProducts({ userId }),
    staleTime: 0,
    refetchOnReconnect: true,
  });
};
export const useFetchCartCount = ({ userId, enabled }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.cartCount],
    queryFn: () => cartService.fetchCartCount({ userId }),
    staleTime: Infinity,
    enabled: enabled,
    refetchOnReconnect: true,
  });
};

// ---------- orders ----------
export const useFetchOrders = (props) => {
  return useQuery({
    queryKey: [QUERY_KEYS.orders],
    queryFn: () => orderService.fetchOrder(props),
    staleTime: 0,
    refetchOnReconnect: true,
  });
};
