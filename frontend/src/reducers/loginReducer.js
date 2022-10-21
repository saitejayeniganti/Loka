import { ACTION, REDUCER } from "../utils/consts";

const initialState = {
  [REDUCER.SIGNEDIN]: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.DO_SIGNIN:
      console.log("login reducer");
      return {
        ...state,
        [REDUCER.SIGNEDIN]: action.payload,
      };
    case ACTION.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default loginReducer;
