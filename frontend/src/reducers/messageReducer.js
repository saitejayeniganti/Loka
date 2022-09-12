import { ACTION, REDUCER } from "../utils/consts";

const initialState = {
  [REDUCER.MESSAGE]: "",
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.MESSAGE:
      return {
        ...state,
        [REDUCER.MESSAGE]: action.payload,
      };
    default:
      return state;
  }
};

export default messageReducer;