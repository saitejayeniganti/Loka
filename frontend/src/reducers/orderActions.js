import { get, post } from "../utils/serverCall";
import { ACTION } from '../utils/consts';
export const addNewOrder = (items) => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
      let totalPrice = 0;
      for (var x of items) {
        totalPrice += x.price;
      }
      const response = await post(`/order/add`, {
        items,
        totalPrice
      });
      dispatch({
        type: ACTION.CREATE_NEW_ORDER,
        payload: response.order
      });
    } catch (error) {
      console.log(error);
      // handleError(error, dispatch);
    } finally {
      //dispatch(setProductLoading(false));
    }
  };
};