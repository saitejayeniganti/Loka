import { ACTION, CONSTANTS, REDUCER } from "../utils/consts";

const initialState = {
  [REDUCER.SEARCHINPUT]: "",
  [REDUCER.LOCATION]: CONSTANTS.DEFAULT_ADDRESS,
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
        [REDUCER.LOCATION]: action.payload,
      };
    case ACTION.NAVI_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export default navigatorReducer;
