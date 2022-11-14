import {
  ADD_ONE_TO_ORDER,
  ADD_TO_ORDER,
  CLEAR_ORDER,
  REMOVE_FROM_ORDER,
  REMOVE__ONE_FROM_ORDER,
  GET_PRODUCTS,
} from "../types";

export const addToOrder = (id) => ({ type: ADD_TO_ORDER, payload: id });
export const removeFromOrder = (id) => ({
  type: REMOVE_FROM_ORDER,
  payload: id,
});
export const addOneToOrder = (id) => ({ type: ADD_ONE_TO_ORDER, payload: id });
export const removeOneFromOrder = (id) => ({
  type: REMOVE__ONE_FROM_ORDER,
  payload: id,
});
export const clearOrder = () => ({ type: CLEAR_ORDER });

export const getProducts = (data) => ({ type: GET_PRODUCTS, payload: data });
