import {
  ADD_ONE_TO_ORDER,
  ADD_TO_ORDER,
  CLEAR_ORDER,
  REMOVE_FROM_ORDER,
  REMOVE__ONE_FROM_ORDER,
  GET_PRODUCTS,
} from "../types";

export const orderInitialState = {
  products: [],
  currentOrder: [],
};

export function orderReducer(state = orderInitialState, action) {
  switch (action.type) {
    case ADD_TO_ORDER: {
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );

      let itemInOrder = state.currentOrder.find(
        (product) => product.id === newItem.id
      );
      console.log(state.currentOrder);
      return itemInOrder
        ? state
        : {
            ...state,
            currentOrder: [...state.currentOrder, { ...newItem, quantity: 1 }],
          };
    }
    case REMOVE_FROM_ORDER: {
      return {
        ...state,
        currentOrder: state.currentOrder.filter(
          (item) => item.id !== action.payload
        ),
      };
    }
    case ADD_ONE_TO_ORDER: {
      console.log(state.currentOrder);
      return {
        ...state,
        currentOrder: state.currentOrder.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }
    case REMOVE__ONE_FROM_ORDER: {
      return {
        ...state,
        currentOrder: state.currentOrder.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }
    case CLEAR_ORDER: {
      return orderInitialState;
    }
    case GET_PRODUCTS: {
      return { ...state, products: action.payload };
    }
    default:
      return state;
  }
}
