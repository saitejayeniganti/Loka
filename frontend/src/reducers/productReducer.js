import { ACTION, REDUCER } from '../utils/consts';

const initialState = {
  products: [],
  product: null,
  reviews: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ACTION.FETCH_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case ACTION.FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      };
    default:
      return state;
  }
}
export default productReducer;
