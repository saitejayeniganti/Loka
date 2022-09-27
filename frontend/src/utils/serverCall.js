import Axios from "axios";
import { showError } from "../reducers/actions";
import store from "../reducers/store";
import { REDUCER, SERVER } from "./consts";

Axios.defaults.withCredentials = true;
// Axios.defaults.headers = {
//   "Access-Control-Allow-Credentials": true,
//   "Access-Control-Allow-Origin": "*",
// };

const get = (path, data) => {
  Axios.defaults.headers.common.authorization = localStorage.getItem(
    REDUCER.TOKEN
  );
  return Axios.get(process.env.REACT_APP_NODE_SERVER + path, { params: data })
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
  return Axios.post(process.env.REACT_APP_NODE_SERVER + path, data)
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
  return Axios.put(process.env.REACT_APP_NODE_SERVER + path, data)
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
  return Axios.delete(process.env.REACT_APP_NODE_SERVER + path, data)
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

export { get, post, put, remove };
