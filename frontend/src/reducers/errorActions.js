import { ACTION } from "../utils/consts";

export const showError = (payload) => (dispatch) => {
  dispatch({ type: ACTION.SHOWERROR, payload });
};

export const showMessage = (payload) => (dispatch) => {
  dispatch({ type: ACTION.MESSAGE, payload });
};