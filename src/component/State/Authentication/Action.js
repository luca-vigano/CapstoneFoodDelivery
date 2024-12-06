import axios from "axios";
import {
  ADD_TO_FAVORITE_FAILURE,
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionType";
import { api, API_URL } from "../../config/Api";

export const registerUser = (reqData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await api.post(
      `${API_URL}/auth/register`,
      reqData.userData
    );
    console.log("RISPOSTA DEL SERVER", data);
    if (data.token) localStorage.setItem("token", data.token);
    if (data.role === "RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: data.token, user: data.user },
    });
    console.log("register success", data);
  } catch (error) {
    dispatch({ type: REGISTER_FAILURE, payload: error });
    console.log("error", error);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await api.post(`${API_URL}/auth/login`, reqData.userData);
    if (data.token) localStorage.setItem("jwt", data.token);
    console.log("jwt salvato login", data.token);
    if (data.role === "RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    console.log("login success", data);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error });

    console.log("error", error);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await api.get(`/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data });
    console.log("user profile", data);
  } catch (error) {
    dispatch({ type: GET_USER_FAILURE, payload: error });

    console.log("error", error);
  }
};

export const addToFavorite = (jwt, restaurantId) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    const { data } = await api.put(
      `/api/restaurants/${restaurantId}/add-favorite`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data });
    console.log("added to favorite", data);
  } catch (error) {
    dispatch({ type: ADD_TO_FAVORITE_FAILURE, payload: error });

    console.log("error", error);
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log("logout success");
  } catch (error) {
    console.log("error", error);
  }
};
