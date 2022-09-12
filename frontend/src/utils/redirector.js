import { REDUCER } from "./consts";

export const redirectHome = () => {
  const role = localStorage.getItem(REDUCER.ROLE);
  if (role === undefined || role === null) {
    return "/signin";
  }
  if (role === "0") {
    return "/customerHome";
  }
  if (role === "1") {
    return "/merchantHome";
  }
  if (role === "2") {
    return "/adminHome";
  }
};