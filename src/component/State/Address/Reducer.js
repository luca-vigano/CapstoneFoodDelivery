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

const initialState = {
  loading: false,
  addresses: [],
  error: null,
};

export const addressReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_ADDRESS_REQUEST:
    case GET_USER_ADDRESSES_REQUEST:
    case DELETE_ADDRESS_REQUEST:
      return {
        ...state,
        error: null,
      };

    case CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: [...state.addresses, payload],
      };

    case GET_USER_ADDRESSES_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: payload,
      };

    case DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((address) => address.id !== payload),
      };

    case CREATE_ADDRESS_FAILURE:
    case GET_USER_ADDRESSES_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
