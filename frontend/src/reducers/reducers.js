import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import productReducer from "./productReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
  loginReducer,
  errorReducer,
  messageReducer,
  productReducer,
});

export default reducers;