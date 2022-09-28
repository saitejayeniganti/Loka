import { ACTION } from '../utils/consts';
import { get, post } from "../utils/serverCall";
// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
      console.log("Here");
      const response = await get(`/product`);
      console.log(response);
      dispatch({
        type: ACTION.FETCH_PRODUCTS,
        payload: response.products
      });
    } catch (error) {
      // handleError(error, dispatch);
    } finally {
      //dispatch(setProductLoading(false));
    }
  };
};