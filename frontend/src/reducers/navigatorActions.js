import { ACTION } from "../utils/consts";

export const updateSearchInput = (payload) => (dispatch) => {
  dispatch({ type: ACTION.UPDATE_SEARCH, payload });
};

export const updateLocation = (payload) => (dispatch) => {
  dispatch({ type: ACTION.UPDATE_LOCATION, payload });
};

export const navigatorReset = (payload) => (dispatch) => {
  dispatch({ type: ACTION.NAVI_RESET, payload });
};
