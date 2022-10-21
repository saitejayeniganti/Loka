import { ACTION } from "../utils/consts";

export const setSession = (payload) => (dispatch) => {
  dispatch({ type: ACTION.SETSESSION, payload });
};

export const clearSession = (payload) => (dispatch) => {
  dispatch({ type: ACTION.CLEARSESSION, payload });
};
