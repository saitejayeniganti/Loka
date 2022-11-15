import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
const loggerMiddleware = createLogger();
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware))
);
// const store = createStore(
//   reducers,
//   composeWithDevTools(applyMiddleware(thunk))
// );

export default store;
