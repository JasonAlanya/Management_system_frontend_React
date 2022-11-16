import {
  GET_PRODUCTS_QUANTITY,
  GET_PRODUCT_ORDER_BY,
  GET_PRODUCT_ORDER_BY_AD,
  GET_PRODUCT_SEARCH_NAME,
  GET_SOME_PRODUCTS,
  NEXT_PAGE_PRODUCT,
  PREVIOUS_PAGE_PRODUCT,
  SELECT_PAGE_PRODUCT,
} from "../types";

export const productsInitalState = {
  products: [],
  currentPage: 1,
  productsQuantity: 1,
  productNameSearch: "",
  orderByValues: [
    { db_column: "id", value: "Id" },
    { db_column: "name", value: "Name" },
    { db_column: "category", value: "Category" },
    { db_column: "price", value: "Price" },
    { db_column: "product_state", value: "Status" },
  ],
  orderByValue: "id",
  orderByAD: "ASC",
};

export function productsPagination(state = productsInitalState, action) {
  switch (action.type) {
    case GET_SOME_PRODUCTS:
      return { ...state, products: action.payload };

    case NEXT_PAGE_PRODUCT:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREVIOUS_PAGE_PRODUCT:
      return { ...state, currentPage: state.currentPage - 1 };

    case SELECT_PAGE_PRODUCT:
      return { ...state, currentPage: action.payload };

    case GET_PRODUCTS_QUANTITY:
      return { ...state, productsQuantity: action.payload };

    case GET_PRODUCT_SEARCH_NAME:
      return { ...state, productNameSearch: action.payload };

    case GET_PRODUCT_ORDER_BY:
      return { ...state, orderByValue: action.payload };

    case GET_PRODUCT_ORDER_BY_AD:
      return { ...state, orderByAD: action.payload };

    default:
      return state;
  }
}
