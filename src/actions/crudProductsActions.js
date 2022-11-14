import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../types";

export const getProducts = (data) => ({ type: GET_PRODUCTS, payload: data });

export const getProduct = (id) => ({ type: GET_PRODUCT, payload: id });

export const createProduct = () => ({ type: CREATE_PRODUCT });

export const updateProduct = (id) => ({ type: UPDATE_PRODUCT, payload: id });

export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, payload: id });
