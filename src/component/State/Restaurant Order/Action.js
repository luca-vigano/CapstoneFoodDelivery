import { api } from "../../config/Api";
import {
  GET_RESTAURANTS_ORDER_FAILURE,
  GET_RESTAURANTS_ORDER_REQUEST,
  GET_RESTAURANTS_ORDER_SUCCESS,
  UPDATE_ORDER_STATUS_FAILURE,
  UPDATE_ORDER_STATUS_REQUEST,
  UPDATE_ORDER_STATUS_SUCCESS,
} from "./ActionType";

export const updateOrderStatus = ({ orderId, orderStatus, token }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });

      const response = await api.put(
        `/api/admin/order/${orderId}/${orderStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedOrder = response.data;
      console.log("updated order", updatedOrder);
      dispatch({ type: UPDATE_ORDER_STATUS_SUCCESS, payload: updatedOrder });
    } catch (error) {
      dispatch({ type: UPDATE_ORDER_STATUS_FAILURE, payload: error });
    }
  };
};

export const fetchRestaurantsOrder = ({ restaurantId, orderStatus, token }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_RESTAURANTS_ORDER_REQUEST });

      const { data } = await api.get(
        `/api/admin/order/restaurant/${restaurantId}`,
        {
          params: { order_status: orderStatus },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orders = data;
      console.log("restaurant order-------", orders);

      dispatch({ type: GET_RESTAURANTS_ORDER_SUCCESS, payload: orders });
    } catch (error) {
      dispatch({ type: GET_RESTAURANTS_ORDER_FAILURE, payload: error });
    }
  };
};
