import Axios from "axios";
import { showError } from "../reducers/actions";
import store from "../reducers/store";
import { REDUCER, SERVER } from "./consts";

Axios.defaults.withCredentials = true;
const get = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(
    REDUCER.TOKEN
  );
  return Axios.get(SERVER.URL + path, { params: data })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError("Server Side Error Occured"));
        throw "Server Side Error Occured";
      }
    });
};
const post = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(
    REDUCER.TOKEN
  );
  return Axios.post(SERVER.URL + path, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError("Server Side Error Occured"));
        throw "Server Side Error Occured";
      }
    });
};

const put = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(
    REDUCER.TOKEN
  );
  return Axios.put(SERVER.URL + path, data)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data.err) {
        store.dispatch(showError(error.response.data.err));
        throw error.response.data.err;
      } else {
        store.dispatch(showError("Server Side Error Occured"));
        throw "Server Side Error Occured";
      }
    });
};

const remove = (path, data) => {
    Axios.defaults.headers.common.authorization = localStorage.getItem(
      REDUCER.TOKEN
    );
    return Axios.delete(SERVER.URL + path, data)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response && error.response.data.err) {
          store.dispatch(showError(error.response.data.err));
          throw error.response.data.err;
        } else {
          store.dispatch(showError("Server Side Error Occured"));
          throw "Server Side Error Occured";
        }
      });
  };

export { get, post, put,remove};