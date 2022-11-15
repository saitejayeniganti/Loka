// export const SERVER = {
//     URL: "http://localhost:4000",
//   };

export const REDUCER = {
  SIGNEDIN: "loginRedirect",
  SESSION: "session",
  USER: "user",
  ISLOGGEDIN: "isLoggedIn",
  ISADMIN: "isAdmin",
  ROLE: "role",
  ERR_MSG: "errMsg",
  MESSAGE: "message",
  TOKEN: "token",
  PRODUCTS: "products",
  SEARCHINPUT: "searchInput",
  LOCATION: "location",
};

export const ACTION = {
  CUSTOMER_SIGIN: "CUSTOMER",
  MERCHANT_SIGIN: "MERCHANT",
  ADMIN_SIGIN: "ADMIN",
  RESET: "RESET",
  CLEARSESSION: "CLEAR_SESSION",
  SHOWERROR: "ERROR",
  MESSAGE: "MESSAGE",
  SETSESSION: "SET_SESSION",
  FETCH_PRODUCTS: "FETCH_PRODUCTS",
  FETCH_PRODUCT: "FETCH_PRODUCT",
  FETCH_REVIEWS: "FETCH_REVIEWS",
  FETCH_ORDERS: "FETCH_ORDERS",
  FETCH_ORDER: "FETCH_ORDER",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLOSE_CART: "CLOSE_CART",
  CLEAR_CART: "CLEAR_CART",
  OPEN_CART: "OPEN_CART",
  CREATE_NEW_CART: "CREATE_NEW_CART",
  CREATE_NEW_ORDER: "CREATE_NEW_ORDER",
  DO_SIGNIN: "DO_SIGNIN",
  UPDATE_SEARCH: "updateSearch",
  UPDATE_LOCATION: "updateLocation",
  NAVI_RESET: "naviReset",
};

export const CONSTANTS = {
  DEFAULT_ADDRESS: {
    coordinates: [-121.88, 37.33],
    address: "San José State University, Washington Sq, San Jose",
  },
};
