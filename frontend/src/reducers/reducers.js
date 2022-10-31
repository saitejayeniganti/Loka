import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import sessionReducer from "./sessionReducer";
import orderReducer from "./orderReducer";

const reducers = combineReducers({
  loginReducer,
  errorReducer,
  messageReducer,
  productReducer,
  cartReducer,
  sessionReducer,
  orderReducer,
});

export default reducers;
