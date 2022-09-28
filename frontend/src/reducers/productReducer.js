import { ACTION, REDUCER } from '../utils/consts';

const initialState = {
  products: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
     };
     default:
      return state;
  }
}    
export default productReducer;
