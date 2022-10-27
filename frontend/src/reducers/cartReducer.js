import { ACTION } from '../utils/consts';

let items = localStorage.getItem('items');
const initialState = {
  items: items ? JSON.parse(items) : [],
  cartOpen: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.ADD_TO_CART:
      const temp = {
        ...state,
        items: [...state.items, action.product],
      };
      localStorage.setItem('items', JSON.stringify(temp.items));
      return temp;
    case ACTION.OPEN_CART:
      return {
        ...state,
        cartOpen: true,
      }
    case ACTION.CLOSE_CART:
      return {
        ...state,
        cartOpen: false,
      }
    default:
      return state;
  }
}
export default cartReducer;
