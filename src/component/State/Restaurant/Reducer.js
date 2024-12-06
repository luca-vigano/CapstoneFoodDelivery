import { PlaylistAddOutlined } from "@mui/icons-material";
import {
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_EVENTS_FAILURE,
  CREATE_EVENTS_SUCCESS,
  CREATE_RESTAURANT_FAILURE,
  CREATE_RESTAURANT_REQUEST,
  CREATE_RESTAURANT_SUCCESS,
  DELETE_EVENTS_SUCCESS,
  DELETE_RESTAURANT_FAILURE,
  DELETE_RESTAURANT_REQUEST,
  DELETE_RESTAURANT_SUCCESS,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_RESTAURANT_FAILURE,
  GET_ALL_RESTAURANT_REQUEST,
  GET_ALL_RESTAURANT_SUCCESS,
  GET_RESTAURANT_BY_ID_FAILURE,
  GET_RESTAURANT_BY_ID_REQUEST,
  GET_RESTAURANT_BY_ID_SUCCESS,
  GET_RESTAURANT_BY_USER_ID_SUCCESS,
  GET_RESTAURANT_CATEGORY_FAILURE,
  GET_RESTAURANT_CATEGORY_REQUEST,
  GET_RESTAURANT_CATEGORY_SUCCESS,
  GET_RESTAURANT_EVENTS_SUCCESS,
  UPDATE_RESTAURANT_FAILURE,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_STATUS_SUCCESS,
  UPDATE_RESTAURANT_SUCCESS,
} from "./ActionType";

const initialState = {
  restaurants: [],
  usersRestaurant: null,
  restauant: null,
  loading: false,
  error: null,
  events: [],
  restaurantsEvents: [],
  categories: [],
};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESTAURANT_REQUEST:
    case GET_ALL_RESTAURANT_REQUEST:
    case DELETE_RESTAURANT_REQUEST:
    case UPDATE_RESTAURANT_REQUEST:
    case GET_RESTAURANT_BY_ID_REQUEST:
    case CREATE_CATEGORY_REQUEST:
    case GET_RESTAURANT_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };
    case GET_ALL_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };
    case GET_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurant: action.payload,
      };
    case GET_RESTAURANT_BY_USER_ID_SUCCESS:
    case UPDATE_RESTAURANT_STATUS_SUCCESS:
    case UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        usersRestaurant: action.payload,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        restaurant: state.restaurant.filter(
          (item) => item.id !== action.payload
        ),
        usersRestaurant: state.usersRestaurant.filter(
          (item) => item.id !== action.payload
        ),
      };
    case CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: [...state.events, action.payload],
        restaurantsEvents: [...state.restaurantsEvents, action.payload],
      };
    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case GET_RESTAURANT_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantsEvents: action.payload,
      };
    case DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.filter((item) => item.id !== action.payload),
        restaurantsEvents: state.restaurantsEvents.filter(
          (item) => item.id !== action.payload
        ),
      };
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case GET_RESTAURANT_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case CREATE_RESTAURANT_FAILURE:
    case GET_ALL_RESTAURANT_FAILURE:
    case DELETE_RESTAURANT_FAILURE:
    case UPDATE_RESTAURANT_FAILURE:
    case GET_RESTAURANT_BY_ID_FAILURE:
    case CREATE_EVENTS_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case GET_RESTAURANT_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
