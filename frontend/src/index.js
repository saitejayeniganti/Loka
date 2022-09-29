import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./reducers/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>;
  </React.StrictMode>
);

// const app = (
//   <Provider store={store}>
//     <BrowserRouter basename='/'>
//       <App />
//     </BrowserRouter >
//   </Provider>
// );
// ReactDOM.render(app, document.getElementById('root'));

