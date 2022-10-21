import { ACTION, REDUCER } from "../utils/consts";

const initialState = {
  [REDUCER.USER]: null,
  [REDUCER.ISLOGGEDIN]: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SETSESSION:
      console.log("session reducer", action.payload);
      return {
        ...state,
        [REDUCER.USER]: action.payload.user,
        [REDUCER.ISLOGGEDIN]: action.payload.isLoggedIn,
      };
    case ACTION.CLEARSESSION:
      return { ...initialState };
    default:
      return state;
  }
};

export default sessionReducer;
