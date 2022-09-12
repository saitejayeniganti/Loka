import store from "../reducers/store";
import { showError, showMessage } from "../reducers/actions";

export const displayMessage = (msg) => {
  store.dispatch(showMessage(msg));
};

export const displayError = (err) => {
  store.dispatch(showError(err));
};