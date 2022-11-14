import { ACTION } from '../utils/consts';
import { get, post, put } from "../utils/serverCall";
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

export const addProduct = async (productData) => {
  try {
    const addProductResult = await post(`/product/add/`, productData)
    return addProductResult
  } catch (e) {
    throw e
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const updatedProductResult = await put(`/product/` + id, productData)
    return updatedProductResult
  } catch (e) {
    throw e
  }
}

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