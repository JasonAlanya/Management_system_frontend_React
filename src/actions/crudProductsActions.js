import {
  GET_PRODUCTS_QUANTITY,
  GET_SOME_PRODUCTS,
  NEXT_PAGE_PRODUCT,
  PREVIOUS_PAGE_PRODUCT,
  SELECT_PAGE_PRODUCT,
} from "../types";

export const getProducts = (data) => ({
  type: GET_SOME_PRODUCTS,
  payload: data,
});

export const nextPageProducts = () => ({ type: NEXT_PAGE_PRODUCT });

export const previousPageProducts = () => ({ type: PREVIOUS_PAGE_PRODUCT });

export const selectPageProducts = (number) => ({
  type: SELECT_PAGE_PRODUCT,
  payload: number,
});

export const getProductsQuantity = (number) => ({
  type: GET_PRODUCTS_QUANTITY,
  payload: number,
});
/*
export const getProduct = (id) => ({ type: GET_PRODUCT, payload: id });

export const createProduct = () => ({ type: CREATE_PRODUCT });

export const updateProduct = (id) => ({ type: UPDATE_PRODUCT, payload: id });

export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, payload: id });*/
