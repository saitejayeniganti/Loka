import { ACTION } from '../utils/consts';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    default:
      return state;
  }
}
export default cartReducer;
