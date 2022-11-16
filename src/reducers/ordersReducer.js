import {
  GET_ORDERS,
  GET_ORDERS_ORDER_BY,
  GET_ORDERS_ORDER_BY_AD,
  GET_ORDERS_QUANTITY,
  GET_ORDERS_SEARCH_NAME,
  NEXT_PAGE_ORDER,
  PREVIOUS_PAGE_ORDER,
  SELECT_PAGE_ORDER,
} from "../types";

export const ordersInitalState = {
  orders: [],
  currentPage: 1,
  ordersQuantity: 1,
  customerNameSearch: "",
  orderByValues: [
    { db_column: "id", value: "Id" },
    { db_column: "customer", value: "Consumer" },
    { db_column: "order_status", value: "Status" },
    { db_column: "date", value: "Date" },
    { db_column: "total_amount", value: "Total amount" },
  ],
  orderByValue: "id",
  orderByAD: "ASC",
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

    case GET_ORDERS_SEARCH_NAME:
      return { ...state, customerNameSearch: action.payload };

    case GET_ORDERS_ORDER_BY:
      return { ...state, orderByValue: action.payload };

    case GET_ORDERS_ORDER_BY_AD:
      return { ...state, orderByAD: action.payload };

    default:
      return state;
  }
}
