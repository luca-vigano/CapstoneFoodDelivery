import {
  CREATE_INGREDIENT_CATEGORY_SUCCESS,
  CREATE_INGREDIENT_SUCCESS,
  DELETE_INGREDIENT_CATEGORY_SUCCESS,
  DELETE_INGREDIENT_SUCCESS,
  GET_INGREDIENT_CATEGORY_SUCCESS,
  GET_INGREDIENTS,
  UPDATE_STOCK,
} from "./ActionType";

const initialState = {
  ingredients: [],
  update: null,
  category: [],
};

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      if (
        JSON.stringify(state.ingredients) === JSON.stringify(action.payload)
      ) {
        return state; // Evita aggiornamenti inutili
      }
      return { ...state, ingredients: action.payload };
    case GET_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    case CREATE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    case CREATE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case UPDATE_STOCK:
      return {
        ...state,
        update: action.payload,
        ingredients: state.ingredients.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case DELETE_INGREDIENT_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.filter(
          (category) => category.id !== action.payload
        ),
      };
    case DELETE_INGREDIENT_SUCCESS:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
