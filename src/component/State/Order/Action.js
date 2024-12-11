import { api } from "../../config/Api";
import {
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  GET_USERS_ORDER_FAILURE,
  GET_USERS_ORDER_REQUEST,
  GET_USERS_ORDER_SUCCESS,
} from "./ActionType";

export const createOrder = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
      const { data } = await api.post(`/api/order`, reqData.order, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      // if (data.payment_url) {
      //   window.location.href = data.payment_url;
      // }
      console.log("create order data", data);
      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
    }
  };
};

export const getUsersOrders = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USERS_ORDER_REQUEST });
    try {
      const { data } = await api.get(`/api/order/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("user order", data);
      dispatch({ type: GET_USERS_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USERS_ORDER_FAILURE, payload: error });
    }
  };
};
