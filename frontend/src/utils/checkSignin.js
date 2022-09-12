import { REDUCER } from "./consts";

export const getRole = () => localStorage.getItem(REDUCER.ROLE);

export const isAdmin = () => {
  if (isSignedIn() && getRole() === "0") {
    return true;
  }
  return false;
};

export const isCustomer = () => {
  if (isSignedIn() && getRole() === "1") {
    return true;
  }
  return false;
};

export const isMerchant = () => {
  if (isSignedIn() && getRole() === "2") {
    return true;
  }
  return false;
};

export const isSignedIn = () =>
  JSON.parse(localStorage.getItem(REDUCER.SIGNEDIN));