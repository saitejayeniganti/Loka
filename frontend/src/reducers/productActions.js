import { ACTION } from '../utils/consts';
import { get, post } from "../utils/serverCall";
// fetch products api
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
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
// fetch product by ID api
export const fetchProductById = (id) => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
      const response = await get(`/product/` + id);
      console.log(response);
      dispatch({
        type: ACTION.FETCH_PRODUCT,
        payload: response.product
      });
    } catch (error) {
      // handleError(error, dispatch);
    } finally {
      //dispatch(setProductLoading(false));
    }
  };
};

// fetch review by ID api
export const fetchReviewById = (id) => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
      const response = await get(`/review/` + id);
      console.log(response);
      dispatch({
        type: ACTION.FETCH_REVIEWS,
        payload: response.reviews
      });
    } catch (error) {
      // handleError(error, dispatch);
    } finally {
      //dispatch(setProductLoading(false));
    }
  };
};