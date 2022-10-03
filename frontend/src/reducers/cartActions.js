import { ACTION } from "../utils/consts";

export const addToCart = (product) => (dispatch) => {
  dispatch({ type: ACTION.ADD_TO_CART, product });
};
