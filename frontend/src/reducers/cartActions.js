import { ACTION } from "../utils/consts";

export const addToCart = (product) => (dispatch) => {
  dispatch({ type: ACTION.ADD_TO_CART, product });
};
export const openCart = () => (dispatch) => {
  dispatch({ type: ACTION.OPEN_CART});
};
export const closeCart = () => (dispatch) => {
  dispatch({ type: ACTION.CLOSE_CART });
};
