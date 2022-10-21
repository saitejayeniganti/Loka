import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import sessionReducer from "./sessionReducer";

const reducers = combineReducers({
  loginReducer,
  errorReducer,
  messageReducer,
  productReducer,
  cartReducer,
  sessionReducer,
});

export default reducers;
