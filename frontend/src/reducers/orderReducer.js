import { ACTION, REDUCER } from '../utils/consts';
const initialState = {
  order_id: null,
  orders: [],
  order: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CREATE_NEW_ORDER:
      return {
        ...state,
        order_id: action.payload
      };
    case ACTION.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case ACTION.FETCH_ORDER:
      return {
        ...state,
        order: action.payload
      };
    default:
      return state;
  }
}
export default orderReducer;