import { ACTION, REDUCER } from '../utils/consts';
const initialState = {
  order_id: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.CREATE_NEW_ORDER:
      return {
        ...state,
        order_id: action.payload
      };
    default:
      return state;
  }
}
export default orderReducer;