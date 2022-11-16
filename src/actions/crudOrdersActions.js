import {
  CREATE_ORDER,
  DELETE_ORDER,
  GET_ORDER,
  GET_ORDERS,
  GET_ORDERS_QUANTITY,
  NEXT_PAGE_ORDER,
  PREVIOUS_PAGE_ORDER,
  SELECT_PAGE_ORDER,
  UPDATE_ORDER,
} from "../types";

export const getOrders = (data) => ({ type: GET_ORDERS, payload: data });

export const nextPageOrders = () => ({ type: NEXT_PAGE_ORDER });

export const previousPageOrders = () => ({ type: PREVIOUS_PAGE_ORDER });

export const selectPageOrders = (number) => ({
  type: SELECT_PAGE_ORDER,
  payload: number,
});

export const getOrdersQuantity = (number) => ({
  type: GET_ORDERS_QUANTITY,
  payload: number,
});
/*
export const getOrder = (id) => ({ type: GET_ORDER, payload: id });

export const createOrder = () => ({ type: CREATE_ORDER });

export const updateOrder = (id) => ({ type: UPDATE_ORDER, payload: id });

export const deleteOrder = (id) => ({ type: DELETE_ORDER, payload: id });*/
