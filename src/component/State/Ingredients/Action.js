import { api } from "../../config/Api";
import {
  CREATE_INGREDIENT_CATEGORY_FAILURE,
  CREATE_INGREDIENT_CATEGORY_REQUEST,
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_FAILURE,
  CREATE_INGREDIENT_REQUEST,
  CREATE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_FAILURE,
  GET_INGREDIENT_CATEGORY_REQUEST,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";

export const getIngredientsOfRestaurant = ({ id, token }) => {
  return async (dispatch) => {
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("get all ingredients", response.data);
      dispatch({ type: GET_INGREDIENTS, payload: response.data });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};

export const createIngredient = ({ data, token }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("created ingredients", response.data);
      dispatch({ type: CREATE_INGREDIENT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log("ERROR", error);
      dispatch({ type: CREATE_INGREDIENT_FAILURE, payload: error });
    }
  };
};

export const createIngredientCategory = ({ data, token }) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("create ingredients category", response.data);
      dispatch({
        type: CREATE_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("ERROR", error);
      dispatch({ type: CREATE_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const getIngredientCategory = ({ id, token }) => {
  return async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_CATEGORY_REQUEST });
    try {
      const response = await api.get(
        `/api/admin/ingredients/restaurant/${id}/category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("get ingredients category", response.data);
      dispatch({
        type: GET_INGREDIENT_CATEGORY_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log("ERROR", error);
      dispatch({ type: GET_INGREDIENT_CATEGORY_FAILURE, payload: error });
    }
  };
};

export const updateStockOfIngredient = ({ id, token }) => {
  return async (dispatch) => {
    try {
      const { data } = await api.put(
        `/api/admin/ingredients/${id}/stock`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("update ingredient stock", data);
      dispatch({
        type: UPDATE_STOCK,
        payload: data,
      });
    } catch (error) {
      console.log("ERROR", error);
    }
  };
};
