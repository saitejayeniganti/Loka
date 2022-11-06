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
      dispatch({
        type: ACTION.CLEAR_CART
      })
    } catch (error) {
      console.log(error);
      // handleError(error, dispatch);
    } finally {
      //dispatch(setProductLoading(false));
    }
  };
};

export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        // dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`/api/order/${id}`);

      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};

