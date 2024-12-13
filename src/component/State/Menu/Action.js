import { api } from "../../config/Api";
import {
  CREATE_MENU_ITEM_FAILURE,
  CREATE_MENU_ITEM_REQUEST,
  CREATE_MENU_ITEM_SUCCESS,
  DELETE_MENU_ITEM_FAILURE,
  DELETE_MENU_ITEM_REQUEST,
  DELETE_MENU_ITEM_SUCCESS,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
  GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
  SEARCH_MENU_ITEM_FAILURE,
  SEARCH_MENU_ITEM_REQUEST,
  SEARCH_MENU_ITEM_SUCCESS,
  UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
  UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
  UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
} from "./ActionType";

export const createMenuItem = ({ menu, token }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.post(`/api/admin/food`, menu, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Created Menu!", data);
      dispatch({ type: CREATE_MENU_ITEM_SUCCESS, payload: data });
    } catch (error) {
      console.log("Created Menu!", error);
      dispatch({ type: CREATE_MENU_ITEM_FAILURE, payload: error });
    }
  };
};

export const getMenuItemsByRestaurantId = (reqData) => {
  return async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
      const params = new URLSearchParams();
      params.append("vegetarian", reqData.vegetarian ?? "");
      params.append("nonvegetarian", reqData.nonvegetarian ?? "");
      params.append("food_category", reqData.foodCategory ?? "");

      const { data } = await api.get(
        `/api/food/restaurant/${reqData.restaurantId}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${reqData.token}`,
          },
        }
      );
      console.log("menu item by restaurant", data);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log("menu item by restaurant error", error);
      dispatch({
        type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
        payload: error,
      });
    }
  };
};

export const searchMenuItem = ({ keyword, token }) => {
  return async (dispatch) => {
    dispatch({ type: SEARCH_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.get(`/api/food/search?name=${keyword}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: SEARCH_MENU_ITEM_SUCCESS,
        payload: data,
      });
      console.log("search from db", data);
    } catch (error) {
      dispatch({
        type: SEARCH_MENU_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};

export const updateMenuItemsAvailability = ({ foodId, token }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST });
    try {
      const { data } = await api.put(
        `/api/admin/food/${foodId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteFoodAction = ({ foodId, token }) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
      const { data } = await api.delete(`/api/admin/food/${foodId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: DELETE_MENU_ITEM_SUCCESS,
        payload: foodId,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MENU_ITEM_FAILURE,
        payload: error,
      });
    }
  };
};
