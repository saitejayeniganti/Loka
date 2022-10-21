import { ACTION } from "../utils/consts";

// export const customerLogin = (payload) => (dispatch) => {
//   dispatch({ type: ACTION.CUSTOMER_SIGIN, payload });
// };

// export const merchantLogin = (payload) => (dispatch) => {
//   dispatch({ type: ACTION.MERCHANT_SIGIN, payload });
// };

// export const adminLogin = (payload) => (dispatch) => {
//   dispatch({ type: ACTION.ADMIN_SIGIN, payload });
// };

export const doSignIn = (payload) => (dispatch) => {
  console.log("login action");
  dispatch({ type: ACTION.DO_SIGNIN, payload });
};

export const logout = (payload) => (dispatch) => {
  dispatch({ type: ACTION.RESET, payload });
};
