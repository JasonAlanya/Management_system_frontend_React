import { combineReducers } from "redux";
import { orderReducer } from "./newOrderReducer";
import { ordersPagination } from "./ordersReducer";
import { productsPagination } from "./productsReducer";

const reducer = combineReducers({
  order: orderReducer,
  gettingProducts: productsPagination,
  gettingOrders: ordersPagination,
});

export default reducer;
