import {
  GET_ORDERS,
  GET_ORDERS_QUANTITY,
  NEXT_PAGE_ORDER,
  PREVIOUS_PAGE_ORDER,
  SELECT_PAGE_ORDER,
} from "../types";

export const ordersInitalState = {
  orders: [],
  currentPage: 1,
  ordersQuantity: 1,
};

export function ordersPagination(state = ordersInitalState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.payload };

    case NEXT_PAGE_ORDER:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREVIOUS_PAGE_ORDER:
      return { ...state, currentPage: state.currentPage - 1 };

    case SELECT_PAGE_ORDER:
      return { ...state, currentPage: action.payload };

    case GET_ORDERS_QUANTITY:
      return { ...state, ordersQuantity: action.payload };

    default:
      return state;
  }
}
