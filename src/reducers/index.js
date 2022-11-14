import { combineReducers } from "redux";
import { orderReducer } from "./ordersReducer";

const reducer = combineReducers({
  order: orderReducer,
});

export default reducer;
