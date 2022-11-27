import { get, post } from "../utils/serverCall";
import { ACTION } from '../utils/consts';
const store = require('../utils/store');

export const addNewOrder = (items) => {
  return async (dispatch, getState) => {
    try {
      //dispatch(setProductLoading(true));
      let totalPrice = 0;
      for (var x of items) {
        totalPrice += x.priceWithTax;
      }
      // let allItems = items;
      // allItems = store.caculateItemsSalesTax(allItems);
      // var allItemMap = new Map();
      // let totalPrice = 0.0;

      // for (var x of allItems) {
      // if (allItemMap.has(x._id)) {
      //   let item = allItemMap.get(x._id);
      //   item.count = item.count + 1;
      //   item.quantity = item.quantity + 1;
      //   allItemMap.set(x._id, item);
      // } else {
      //   x.count = 1;
      //   x.quantity = 1;
      //   allItemMap.set(x._id, x);
      // }
      // totalPrice += x.priceWithTax;
    // }


      const response = await post(`/order/add`, {
      items,
      totalPrice
    });
    dispatch({
      type: ACTION.CREATE_NEW_ORDER,
      payload: response.order
    });
    dispatch({
      type: ACTION.CLEAR_CART
    })
  } catch (error) {
    console.log(error);
    // handleError(error, dispatch);
  } finally {
    //dispatch(setProductLoading(false));
  }
};
};

export const fetchOrderById = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        // dispatch(setOrderLoading(true));
      }
      const response = await get(`/order/${id}`);
      dispatch({
        type: ACTION.FETCH_ORDER,
        payload: response.order
      });
    } catch (error) {
      console.log(error);
      // handleError(error, dispatch);
    } finally {
      if (withLoading) {
        // dispatch(setOrderLoading(false));
      }
    }
  };
};

export const fetchOrders = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        // dispatch(setOrderLoading(true));
      }
      console.log("fetch ordersxx");
      const response = await get(`/order/me`);

      dispatch({
        type: ACTION.FETCH_ORDERS,
        payload: response.orders
      });
    } catch (error) {
      console.log(error);
      // handleError(error, dispatch);
    } finally {
      if (withLoading) {
        // dispatch(setOrderLoading(false));
      }
    }
  };
};
