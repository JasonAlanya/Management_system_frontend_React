import {
  GET_PRODUCTS_QUANTITY,
  GET_SOME_PRODUCTS,
  NEXT_PAGE_PRODUCT,
  PREVIOUS_PAGE_PRODUCT,
  SELECT_PAGE_PRODUCT,
} from "../types";

export const productsInitalState = {
  products: [],
  currentPage: 1,
  productsQuantity: 1,
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

    default:
      return state;
  }
}
