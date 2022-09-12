import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";

const reducers = combineReducers({
  loginReducer,
  errorReducer,
  messageReducer,
});

export default reducers;