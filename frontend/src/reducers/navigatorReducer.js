import { ACTION, REDUCER } from "../utils/consts";

const initialState = {
  [REDUCER.SEARCHINPUT]: "",
  [REDUCER.LOCATION]: "",
};

const navigatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.UPDATE_SEARCH:
      return {
        ...state,
        [REDUCER.SEARCHINPUT]: action.payload,
      };
    case ACTION.UPDATE_LOCATION:
      return {
        ...state,
        [REDUCER.SEARCHINPUT]: action.payload,
      };
    case ACTION.RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default navigatorReducer;
