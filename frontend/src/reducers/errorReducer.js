import { ACTION, REDUCER } from '../utils/consts';

const initialState = {
  [REDUCER.ERR_MSG]: '',
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SHOWERROR:
      return {
        ...state,
        [REDUCER.ERR_MSG]: action.payload,
      };
    default:
      return state;
  }
};

export default errorReducer;