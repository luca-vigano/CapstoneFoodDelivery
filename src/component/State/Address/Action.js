import { api } from "../../config/Api";
import {
  CREATE_ADDRESS_REQUEST,
  CREATE_ADDRESS_SUCCESS,
  CREATE_ADDRESS_FAILURE,
  GET_USER_ADDRESSES_REQUEST,
  GET_USER_ADDRESSES_SUCCESS,
  GET_USER_ADDRESSES_FAILURE,
  DELETE_ADDRESS_REQUEST,
  DELETE_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
} from "./ActionType";

export const createAddress = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    try {
      const { data } = await api.post(`/api/addresses`, reqData.address, {
        headers: {
          Authorization: `Bearer ${reqData.token}`,
        },
      });
      console.log("Address created", data);
      dispatch({ type: CREATE_ADDRESS_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error creating address", error);
      dispatch({ type: CREATE_ADDRESS_FAILURE, payload: error });
    }
  };
};

export const getUserAddresses = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_ADDRESSES_REQUEST });
    try {
      const { data } = await api.get(`/api/addresses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("User addresses", data);
      dispatch({ type: GET_USER_ADDRESSES_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching user addresses", error);
      dispatch({ type: GET_USER_ADDRESSES_FAILURE, payload: error });
    }
  };
};

export const deleteAddress = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
      await api.delete(`/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Address deleted", id);
      dispatch({ type: DELETE_ADDRESS_SUCCESS, payload: id });
    } catch (error) {
      console.error("Error deleting address", error);
      dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error });
    }
  };
};
